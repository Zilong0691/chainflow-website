-- ChainFlow RC 修复
-- 修复触发器 + RPC + RLS（一次性执行）

-- 1. 修复新用户触发器
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. 重写 charge_trial_run
create or replace function public.charge_trial_run(
  p_user_id uuid,
  p_module_id text,
  p_run_id text
) returns jsonb
language plpgsql
security definer
as $$
declare
  v_used int;
  v_total int;
  v_charged bool;
begin
  -- 幂等检查
  select trial_charged into v_charged from public.module_runs where run_id = p_run_id;
  if found and v_charged then
    return jsonb_build_object('charged', false, 'remaining', -1, 'reason', 'already_charged');
  end if;

  -- 检查是否有付费权益（有则不限次数）
  if exists (select 1 from public.module_entitlements where user_id = p_user_id and module_id = p_module_id and status = 'active') then
    return jsonb_build_object('charged', false, 'remaining', -1, 'reason', 'entitled_user');
  end if;

  -- 确保试用记录存在
  insert into public.trial_usage (user_id, module_id) values (p_user_id, p_module_id) on conflict do nothing;

  -- 锁定行读当前次数
  select successful_runs_used, total_free_runs into v_used, v_total
  from public.trial_usage
  where user_id = p_user_id and module_id = p_module_id
  for update;

  if v_used >= v_total then
    return jsonb_build_object('charged', false, 'remaining', 0, 'reason', 'no_remaining');
  end if;

  -- 扣次
  update public.trial_usage
  set successful_runs_used = v_used + 1
  where user_id = p_user_id and module_id = p_module_id;

  -- 标记run
  update public.module_runs
  set trial_charged = true
  where run_id = p_run_id;

  return jsonb_build_object('charged', true, 'remaining', v_total - v_used - 1);
end;
$$;

-- 3. 补全RLS
alter table public.profiles enable row level security;
drop policy if exists "own_profile" on public.profiles;
create policy "own_profile" on public.profiles for all using (auth.uid() = id);

alter table public.workspaces enable row level security;
drop policy if exists "own_workspace" on public.workspaces;
create policy "own_workspace" on public.workspaces for all using (auth.uid() = owner_user_id);

alter table public.trial_usage enable row level security;
drop policy if exists "own_trial" on public.trial_usage;
create policy "own_trial" on public.trial_usage for select using (auth.uid() = user_id);

alter table public.module_runs enable row level security;
drop policy if exists "own_runs" on public.module_runs;
create policy "own_runs" on public.module_runs for all using (auth.uid() = user_id);

alter table public.module_entitlements enable row level security;
drop policy if exists "own_entitlement" on public.module_entitlements;
create policy "own_entitlement" on public.module_entitlements for select using (auth.uid() = user_id);

alter table public.share_links enable row level security;
drop policy if exists "own_share" on public.share_links;
create policy "own_share" on public.share_links for all using (auth.uid() = created_by_user_id);

alter table public.audit_logs enable row level security;
drop policy if exists "own_audit" on public.audit_logs;
create policy "own_audit" on public.audit_logs for select using (auth.uid() = user_id);

-- 4. 索引
create index if not exists runs_user_idx on public.module_runs(user_id);
create index if not exists trial_user_idx on public.trial_usage(user_id);
create index if not exists share_user_idx on public.share_links(created_by_user_id);
