"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!loading && !user) router.push("/auth/login?redirect=/settings"); }, [user, loading, router]);
  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#080b09] px-4 py-8">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-rice">设置</h1>
          <a href="/tools/routeflow" className="text-xs text-rice/40 hover:text-gold">← 返回工具</a>
        </div>

        <Card className="border-rice/10 bg-[#0b100d]">
          <CardHeader>
            <CardTitle className="text-rice text-sm">账号信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-rice/40">邮箱</span>
              <span className="text-rice/70 font-mono">{user.email}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-rice/40">用户 ID</span>
              <span className="text-rice/30 font-mono">{user.id.slice(0, 16)}…</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-rice/10 bg-[#0b100d]">
          <CardHeader>
            <CardTitle className="text-rice text-sm">模块权益</CardTitle>
            <CardDescription className="text-rice/30 text-xs">每个工具独立购买</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: "routeflow", name: "短途配送排线助手 RouteFlow" },
              { id: "networkflow", name: "仓网选址评估助手 NetworkFlow" },
            ].map(m => (
              <div key={m.id} className="flex items-center justify-between rounded-lg border border-rice/10 bg-[#080b09] px-3 py-2.5">
                <span className="text-rice/60 text-xs">{m.name}</span>
                <Badge variant="outline" className="text-gold/60 border-gold/20 text-xs">免费试用中</Badge>
              </div>
            ))}

            <Separator className="bg-rice/5" />

            <div className="rounded-lg border border-gold/10 bg-gold/[0.03] p-3">
              <p className="text-gold/70 text-xs font-medium mb-1">升级标准版 ¥399/工具</p>
              <p className="text-rice/30 text-xs leading-relaxed mb-3">
                购买后可无限次使用、保存所有运行记录、创建分享链接。
              </p>
              <div className="flex gap-3 text-xs text-rice/40">
                <span>📧 icebear0153@163.com</span>
                <span>💬 微信号: icebear0153</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-rice/10 bg-[#0b100d]">
          <CardHeader>
            <CardTitle className="text-rice text-sm">数据与隐私</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-rice/30 text-xs leading-relaxed">
              ChainFlow 不收集、不存储你的订单数据、客户信息和业务文件。
              所有工具输入和结果仅在浏览器本地处理。
              LLM API 调用通过你配置的 Key 或演示 Key 完成。
              你可以随时删除运行记录。
            </p>
          </CardContent>
        </Card>

        <Button variant="outline" className="w-full border-rice/10 text-rice/40 hover:text-ember text-xs"
          onClick={() => router.push("/tools/routeflow")}>
          返回工具
        </Button>
      </div>
    </main>
  );
}
