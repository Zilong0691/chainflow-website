"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

/* 设置页 — 权益管理、账号绑定、API Key */

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login?redirect=/settings");
  }, [user, loading, router]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-graphite text-rice px-4 py-6">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold">ChainFlow 设置</h1>
          <a href="/tools/routeflow" className="text-rice/30 hover:text-gold text-xs">← 返回工具</a>
        </div>

        {/* 账号信息 */}
        <Section title="账号信息">
          <Row label="邮箱" value={user.email || "未设置"} />
          <Row label="用户 ID" value={user.id.slice(0, 12) + "…"} />
        </Section>

        {/* 模块权益 */}
        <Section title="模块权益">
          <div className="space-y-2">
            {["routeflow", "networkflow"].map(mid => (
              <div key={mid} className="flex items-center justify-between rounded border border-rice/10 bg-rice/[0.02] px-3 py-2.5 text-xs">
                <span className="text-rice/60">{mid === "routeflow" ? "短途配送排线助手 RouteFlow" : "仓网选址评估助手 NetworkFlow"}</span>
                <span className="text-rice/30">免费试用中</span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-gold/20 bg-gold/[0.04] px-3 py-2 text-xs">
            <p className="text-gold/70 mb-1">升级标准版 ¥399/工具</p>
            <p className="text-rice/40 leading-relaxed">
              购买后可无限次使用、保存所有运行记录、创建分享链接。请联系我们开通：
            </p>
            <div className="flex gap-3 mt-2">
              <a href="mailto:icebear0153@163.com" className="text-gold/50 hover:text-gold">📧 邮件</a>
              <span className="text-rice/30">微信号: icebear0153</span>
            </div>
          </div>
        </Section>

        {/* 隐私 */}
        <Section title="数据与隐私">
          <p className="text-rice/30 text-xs leading-relaxed">
            ChainFlow 不收集、不存储你的订单数据、客户信息和业务文件。所有工具输入和结果仅在浏览器本地处理。
            LLM API 调用通过你配置的 Key 或我们提供的演示 Key 完成。
            你可以随时删除你的运行记录。
          </p>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="text-rice/60 text-xs font-medium mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded border border-rice/5 px-3 py-2 text-xs mb-1">
      <span className="text-rice/40">{label}</span>
      <span className="text-rice/70 font-mono">{value}</span>
    </div>
  );
}
