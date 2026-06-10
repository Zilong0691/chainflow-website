# 开源方案评估与许可证记录

访问日期：2026-06-10

## 总原则

本阶段不安装、不复制、不改写这些开源项目代码；只借鉴研究与图形工作流。未确认许可证或许可证不清晰的项目，一律按“只读方法参考”处理。

## 1. K-Dense-AI/scientific-agent-skills

- 仓库：https://github.com/K-Dense-AI/scientific-agent-skills
- 当前状态：GitHub main 分支，README 展示一组科学研究 Agent Skills。
- 许可证：GitHub 页面显示 MIT License。
- 与本任务相关能力：scientific visualization、schematics、literature/research lookup、peer review、citation verification、report generation 等。
- 可借鉴机制：结构化研究问题、事实和引用绑定、专业示意图、同行审查门槛、交付前 QA。
- 使用方式：只借鉴方法，不复制代码、Skill 内容或模板。

## 2. Weizhena/Deep-Research-skills

- 仓库：https://github.com/Weizhena/Deep-Research-skills
- 当前状态：GitHub main/master 可访问，项目围绕 Deep Research Skill。
- 许可证名称记录：未确认；访问到的 README/GitHub 摘要中未稳定确认显式 LICENSE，按未授权代码处理。
- 可借鉴机制：先形成研究提纲和问题树，再进入深入检索，防止资料堆积。
- 改造为本期流程：第一阶段输出 research-outline.md 和页面脚本；第二阶段再按确认后的页面结构补一级来源和数据。
- 使用方式：只借鉴两阶段研究方法。

## 3. llmsresearch/paperbanana

- 仓库：https://github.com/llmsresearch/paperbanana
- 当前状态：GitHub main 分支，项目强调论文/图形生成工作流。
- 许可证名称记录：未确认；访问页面未稳定确认显式 LICENSE，按只读参考处理。
- 可借鉴机制：Retriever、Planner、Stylist、Visualizer、Critic 的图形生产流水线。
- 本期改造：Retriever 找厂商与技术结构；Planner 设计一页一问题；Stylist 固定 ChainFlow token；Visualizer 用 SVG/HTML 绘制；Critic 做事实、同行、视觉审核。
- 使用限制：不让图像模型直接生成含中文、参数、单位和企业名称的整页最终图。

## 4. anthropics/financial-services

- 仓库：https://github.com/anthropics/financial-services
- 当前状态：Anthropic 金融服务示例仓库，其中 market researcher 插件/Skill 对行业研究结构有参考价值。
- 许可证名称记录：未确认；本轮未稳定提取到明确许可证名称，按只读方法参考处理，不复制代码。
- 可借鉴机制：行业定义、竞争格局、同行比较、研究工作底稿、结论审查。
- 使用限制：不输出荐股、评级、目标价、资本市场炒作或缺乏技术基础的受益公司名单。

## 对 ChainFlow 的方法提取

1. 研究问题先行：每页一个问题，一个结论。
2. 来源分级：一级来源优先；二级来源只能补充或作为线索。
3. 事实绑定：fact-table.json 绑定来源、口径、使用页面。
4. 图形流程：结构检索 -> 信息规划 -> 统一视觉 -> SVG 绘制 -> Critic 审核。
5. 竞争格局不做简单排行榜，转为能力维度矩阵。
