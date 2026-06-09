-- ChainFlow Core Schema V0.5
-- 基于 Supabase Auth 的认证体系，统一 user_id 贯穿所有表

-- ═══════════════════════════════════════
-- 1. 用户扩展信息
-- ═══════════════════════════════════════
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
  status text default 'active' check (status in ('active','suspended','deleted')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 新用户注册时自动创建 profile
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ═══════════════════════════════════════
-- 2. Workspace
-- ═══════════════════════════════════════
create table if not exists public.workspaces (
  id uuid default gen_random_uuid() primary key,
  owner_user_id uuid references auth.users on delete cascade not null,
  name text not null,
  organization_name text,
  schema_version text default '0.1',
  status text default 'active' check (status in ('active','archived')),
  enabled_modules text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index workspaces_owner_idx on public.workspaces(owner_user_id);

-- ═══════════════════════════════════════
-- 3. 模块权益
-- ═══════════════════════════════════════
create table if not exists public.module_entitlements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  module_id text not null check (module_id in ('routeflow','networkflow','demandflow')),
  entitlement_type text default 'standard' check (entitlement_type in ('trial','standard','enterprise')),
  status text default 'active' check (status in ('active','expired','revoked')),
  starts_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index ent_user_module_idx on public.module_entitlements(user_id, module_id);

-- ═══════════════════════════════════════
-- 4. 试用次数
-- ═══════════════════════════════════════
create table if not exists public.trial_usage (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  module_id text not null check (module_id in ('routeflow','networkflow','demandflow')),
  total_free_runs int default 3,
  successful_runs_used int default 0,
  remaining_runs int generated always as (total_free_runs - successful_runs_used) stored,
  updated_at timestamptz default now(),
  unique(user_id, module_id)
);

create index trial_user_idx on public.trial_usage(user_id);

-- 首次使用某模块时自动创建试用记录
create or replace function public.ensure_trial_record(p_user_id uuid, p_module_id text)
returns void as $$
begin
  insert into public.trial_usage (user_id, module_id)
  values (p_user_id, p_module_id)
  on conflict (user_id, module_id) do nothing;
end;
$$ language plpgsql;

-- ═══════════════════════════════════════
-- 5. 模块运行记录
-- ═══════════════════════════════════════
create table if not exists public.module_runs (
  id uuid default gen_random_uuid() primary key,
  run_id text not null,
  user_id uuid references auth.users on delete cascade not null,
  workspace_id uuid references public.workspaces on delete set null,
  module_id text not null check (module_id in ('routeflow','networkflow','demandflow')),
  module_version text,
  idempotency_key text,
  run_status text default 'pending' check (run_status in ('pending','running','success','partial','error','cancelled')),
  input_summary jsonb,
  config_summary jsonb,
  result_ref text,
  result_data jsonb,
  error_code text,
  trial_charged boolean default false,
  created_at timestamptz default now(),
  completed_at timestamptz
);

create index runs_user_idx on public.module_runs(user_id, module_id);
create index runs_workspace_idx on public.module_runs(workspace_id);
create unique index runs_idempotency_idx on public.module_runs(idempotency_key) where idempotency_key is not null;

-- ═══════════════════════════════════════
-- 6. 分享链接
-- ═══════════════════════════════════════
create table if not exists public.share_links (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references public.workspaces on delete cascade,
  module_run_id uuid references public.module_runs on delete cascade,
  share_type text default 'driver' check (share_type in ('driver','report','readonly')),
  resource_scope jsonb,
  token_hash text not null,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_by_user_id uuid references auth.users on delete cascade not null,
  created_at timestamptz default now()
);

create index share_token_idx on public.share_links(token_hash);
create index share_user_idx on public.share_links(created_by_user_id);

-- ═══════════════════════════════════════
-- 7. 审计日志
-- ═══════════════════════════════════════
create table if not exists public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete set null,
  action text not null,
  target_type text,
  target_id uuid,
  metadata jsonb,
  created_at timestamptz default now()
);

create index audit_user_idx on public.audit_logs(user_id);
create index audit_action_idx on public.audit_logs(action);

-- ═══════════════════════════════════════
-- 8. RPC 函数：安全扣减试用次数
-- ═══════════════════════════════════════
create or replace function public.charge_trial_run(
  p_user_id uuid,
  p_module_id text,
  p_run_id text
) returns jsonb as $$
declare
  v_trial record;
  v_existing record;
begin
  -- 确保试用记录存在
  perform public.ensure_trial_record(p_user_id, p_module_id);

  -- 查当前次数
  select * into v_trial
  from public.trial_usage
  where user_id = p_user_id and module_id = p_module_id
  for update;

  -- 检查是否已扣过（同一 run_id）
  select trial_charged into v_existing
  from public.module_runs
  where run_id = p_run_id and user_id = p_user_id;

  if found and v_existing.trial_charged then
    return jsonb_build_object('charged', false, 'remaining', v_trial.remaining_runs, 'reason', 'already_charged');
  end if;

  -- 检查剩余次数
  if v_trial.remaining_runs <= 0 then
    return jsonb_build_object('charged', false, 'remaining', 0, 'reason', 'no_remaining');
  end if;

  -- 扣减
  update public.trial_usage
  set successful_runs_used = successful_runs_used + 1,
      updated_at = now()
  where user_id = p_user_id and module_id = p_module_id;

  -- 标记 run
  update public.module_runs
  set trial_charged = true
  where run_id = p_run_id and user_id = p_user_id;

  return jsonb_build_object('charged', true, 'remaining', v_trial.remaining_runs - 1);
end;
$$ language plpgsql security definer;

-- ═══════════════════════════════════════
-- 9. Row Level Security
-- ═══════════════════════════════════════
alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.module_entitlements enable row level security;
alter table public.trial_usage enable row level security;
alter table public.module_runs enable row level security;
alter table public.share_links enable row level security;
alter table public.audit_logs enable row level security;

-- 用户只能读写自己的数据
create policy "own_profile" on public.profiles for all using (auth.uid() = id);
create policy "own_workspace" on public.workspaces for all using (auth.uid() = owner_user_id);
create policy "own_entitlement" on public.module_entitlements for select using (auth.uid() = user_id);
create policy "own_trial" on public.trial_usage for select using (auth.uid() = user_id);
create policy "own_runs" on public.module_runs for all using (auth.uid() = user_id);
create policy "own_share" on public.share_links for all using (auth.uid() = created_by_user_id);
create policy "own_audit" on public.audit_logs for select using (auth.uid() = user_id);

-- 服务端可写入（用于 API 路由）
create policy "service_insert_trial" on public.trial_usage for insert with check (true);
create policy "service_update_trial" on public.trial_usage for update using (true);
create policy "service_insert_run" on public.module_runs for insert with check (true);
create policy "service_update_run" on public.module_runs for update using (true);
create policy "service_insert_audit" on public.audit_logs for insert with check (true);
create policy "service_insert_entitlement" on public.module_entitlements for insert with check (true);
create policy "service_insert_share" on public.share_links for insert with check (true);
create policy "service_update_share" on public.share_links for update using (true);
