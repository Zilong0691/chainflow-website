import { ArrowLeft } from "lucide-react";
import { demoPages, type ToolSlug } from "@/lib/content";

type ToolDemoPageProps = {
  slug: ToolSlug;
};

export function ToolDemoPage({ slug }: ToolDemoPageProps) {
  const demo = demoPages[slug];
  const liveDemo = liveDemos[slug];

  return (
    <main className="h-svh bg-graphite text-rice flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-rice/10 bg-graphite/90 shrink-0">
        <a href="/#skills" className="inline-flex items-center gap-1.5 text-xs text-rice/60 transition hover:text-gold">
          <ArrowLeft size={14} />返回
        </a>
        <span className="text-xs text-gold/50">推荐电脑打开，体验更完整</span>
      </div>
      <iframe
        src={liveDemo.src}
        title={`${demo.name} demo`}
        className="flex-1 w-full bg-white border-0"
        sandbox="allow-scripts allow-same-origin allow-popups"
        loading="lazy"
      />
    </main>
  );
}

const liveDemos: Record<
  ToolSlug,
  {
    src: string;
    promise: string;
    contextTitle: string;
    context: string;
    highlights: { label: string; value: string }[];
    title: string;
    description: string;
    browserLabel: string;
  }
> = {
  routeflow: {
    src: "/demos/routeflow/",
    promise: "不用上传文件也能先体验：下面展示脱敏调度工作台，用户可以直接查看地图、车辆路线、司机任务表、作业甘特图、异常处置建议和结果面板。",
    contextTitle: "脱敏业务场景",
    context:
      "一个本地配送团队拿到 801 个订单、多个车型和凌晨配送窗口，需要快速判断怎么排车、怎么排序、哪里可能超容或超时，以及哪些路线需要人工复核。",
    highlights: [
      { label: "输入", value: "801 单 / 车型 / 时窗" },
      { label: "过程", value: "VRP 排线与异常判断" },
      { label: "输出", value: "司机表 / 地图 / 甘特图" }
    ],
    title: "像使用一个真实调度工作台一样体验 RouteFlow",
    description:
      "这不是截图。你可以在嵌入页面里拖动地图、筛选车型和路线、查看司机任务表、调整作业参数，并阅读异常处置建议，理解一张杂乱订单表如何变成可执行排线初稿。",
    browserLabel: "RouteFlow 脱敏调度工作台"
  },
  networkflow: {
    src: "/demos/networkflow/",
    promise: "不用先理解模型，也能先体验：下面保留原版选址评估网页，用户可以直接查看候选仓、服务范围、成本拆解和方案对比。",
    contextTitle: "模拟业务场景",
    context:
      "一个区域经营团队想扩展仓网，但需求城市、候选点、成本和服务半径都不够精确，需要先做一版可讨论的布局判断。",
    highlights: [
      { label: "输入", value: "需求城市 / 候选仓" },
      { label: "过程", value: "成本与覆盖评估" },
      { label: "输出", value: "仓网方案对比" }
    ],
    title: "像使用一个真实选址工具一样体验 NetworkFlow",
    description:
      "这不是静态展示。你可以在嵌入页面里查看地图、切换参数和阅读结果表，理解一组粗糙业务数据如何变成仓网评估方案。",
    browserLabel: "NetworkFlow 原版演示网页"
  }
};

