/**
 * ChainFlow 身份 Provider 配置
 * 集中管理所有第三方登录方式的状态
 */

export type AuthProvider = "email" | "wechat" | "dingtalk" | "feishu" | "github" | "alipay";

export interface ProviderInfo {
  id: AuthProvider;
  name: string;
  icon: string;
  enabled: boolean;
  reason?: string;
}

export function getAvailableProviders(): ProviderInfo[] {
  return [
    {
      id: "email",
      name: "邮箱验证码",
      icon: "📧",
      enabled: true,
    },
    {
      id: "wechat",
      name: "微信登录",
      icon: "💬",
      enabled: !!process.env.NEXT_PUBLIC_WECHAT_ENABLED,
      reason: process.env.NEXT_PUBLIC_WECHAT_ENABLED ? undefined : "需要微信开放平台网站应用 App ID 和 App Secret",
    },
    {
      id: "dingtalk",
      name: "钉钉登录",
      icon: "📌",
      enabled: !!process.env.NEXT_PUBLIC_DINGTALK_ENABLED,
      reason: process.env.NEXT_PUBLIC_DINGTALK_ENABLED ? undefined : "需要钉钉开放平台企业内部应用 Client ID 和 Client Secret",
    },
    {
      id: "github",
      name: "GitHub 登录",
      icon: "🐙",
      enabled: true, // Supabase 内置，默认可用
    },
    {
      id: "feishu",
      name: "飞书登录",
      icon: "🐦",
      enabled: false,
      reason: "V1.0 正式上线",
    },
    {
      id: "alipay",
      name: "支付宝登录",
      icon: "💳",
      enabled: false,
      reason: "后续按需求上线",
    },
  ];
}

// 微信登录需要准备的资料清单
export const WECHAT_REQUIREMENTS = [
  "微信开放平台账号（需企业资质认证，¥300/年）",
  "已通过认证的网站应用（获取 App ID 和 App Secret）",
  "在微信开放平台配置 OAuth 回调域名",
  "如需在微信内置浏览器使用，还需已认证的微信公众号",
];

// 钉钉登录需要准备的资料清单
export const DINGTALK_REQUIREMENTS = [
  "钉钉开放平台账号",
  "创建企业内部应用（获取 Client ID 和 Client Secret）",
  "配置回调域名",
  "开通通讯录权限（获取用户信息）",
];
