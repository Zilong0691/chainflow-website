import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { hashToken } from "@/lib/share";

// POST /api/auth/shares — 创建分享链接
export async function POST(request: Request) {
  try {
    const { userId, workspaceId, moduleRunId, shareType, resourceScope, expiresInDays } = await request.json();
    if (!userId || !moduleRunId) {
      return NextResponse.json({ error: "缺少参数" }, { status: 400 });
    }

    const token = crypto.randomUUID();
    const tokenHash = await hashToken(token);
    const expiresAt = expiresInDays
      ? new Date(Date.now() + expiresInDays * 86400000).toISOString()
      : new Date(Date.now() + 7 * 86400000).toISOString(); // 默认7天

    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("share_links").insert({
      workspace_id: workspaceId || null,
      module_run_id: moduleRunId,
      share_type: shareType || "driver",
      resource_scope: resourceScope || {},
      token_hash: tokenHash,
      expires_at: expiresAt,
      created_by_user_id: userId,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ token, expiresAt, url: `/share/${token}` });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// GET /api/auth/shares?user_id=X
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    if (!userId) return NextResponse.json({ error: "缺少 user_id" }, { status: 400 });

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("share_links")
      .select("id, share_type, resource_scope, expires_at, revoked_at, created_at")
      .eq("created_by_user_id", userId)
      .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // 不返回 token_hash，只返回元数据
    return NextResponse.json(data || []);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE /api/auth/shares — 撤销分享
export async function DELETE(request: Request) {
  try {
    const { shareId, userId } = await request.json();
    if (!shareId || !userId) return NextResponse.json({ error: "缺少参数" }, { status: 400 });

    const supabase = createSupabaseAdmin();
    const { error } = await supabase
      .from("share_links")
      .update({ revoked_at: new Date().toISOString() })
      .eq("id", shareId)
      .eq("created_by_user_id", userId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
