# 来源清单 V2 — ChainFlow MLCC 001

编制日期：2026-06-11

---

## 一级来源

| 编号 | 标题 | 发布机构 | 年份 | 链接 | 支持页面 | 支持事实 | 可信度 | 局限性 |
|---|---|---|---|---|---|---|---|---|
| SRC-001 | EIA-198-1-F Ceramic Dielectric Capacitor Standard | ECIA | 2002 (现行) | https://store.accuristech.com/standards/ecia-eia-198-1-f | 04 | F003,F004,F005 | 高 | 需付费获取全文；编码规则已从公开资料确认 |
| SRC-002 | DC Bias Characteristic FAQ | Murata | accessed 2026 | https://www.murata.com/en-us/support/faqs/capacitor/ceramiccapacitor/char/0005 | 04,09 | F006 | 高 | 定性说明；具体降额曲线需按型号查询 |
| SRC-005 | Aging Characteristic FAQ | Murata | accessed 2026 | https://www.murata.com/en-us/support/faqs/capacitor/ceramiccapacitor/char/0017 | 04 | F007 | 高 | 定性说明；具体老化率需按型号查询 |
| SRC-008 | AEC-Q200 Rev E Base Document | AEC (Automotive Electronics Council) | 2023 | http://aecouncil.com/Documents/AEC_Q200_Rev_E_Base_Document.pdf | 07,08,09 | F015 | 高 | 标准全文可公开获取；具体测试条件需按元件类型查阅 |
| SRC-009 | Murata Unveils World's Smallest MLCC | Murata (via iconnect007) | 2024 | https://iconnect007.com/article/142360/ | 02,08 | F017 | 高 | 新闻稿，非技术论文；尺寸数据来自官方发布 |

## 二级来源

| 编号 | 标题 | 发布机构 | 年份 | 链接 | 支持页面 | 支持事实 | 可信度 | 局限性 |
|---|---|---|---|---|---|---|---|---|
| SRC-003 | Ceramic capacitor | Wikipedia | accessed 2026 | https://en.wikipedia.org/wiki/Ceramic_capacitor | 03,04,05,06 | F001,F009,F010,F013,F014 | 中 | 技术综述，非一手研究；需用厂商资料和标准复核 |
| SRC-004 | Capacitance | Wikipedia | accessed 2026 | https://en.wikipedia.org/wiki/Capacitance | 03,04 | F002 | 高 | 物理学基础，置信度无需怀疑 |
| SRC-006 | Barium titanate | Wikipedia | accessed 2026 | https://en.wikipedia.org/wiki/Barium_titanate | 05 | F008 | 中 | 材料综述；配方细节不在公开资料中 |

## 产业研究报告（谨慎引用）

| 编号 | 标题 | 发布机构 | 年份 | 支持页面 | 支持事实 | 可信度 | 局限性 |
|---|---|---|---|---|---|---|---|
| SRC-007 | MLCC 用陶瓷材料行业分析 | 产业研究机构 | 2025 | 05,07 | F012 | 中 | 份额为估算范围（"约""估算"），非企业官方数据；不同报告口径差异大 |

## ChainFlow 综合判断

| 编号 | 类型 | 说明 |
|---|---|---|
| SRC-CHAINFLOW | 编辑判断 | 综合多来源的供应链分析、数学推导和产业逻辑判断。不是单一来源原文。标注为 ChainFlow 分析。 |

---

## 待第二阶段补强的一级来源

- 村田/TDK/三星电机/太阳诱电/国巨 产品目录和应用指南（结构图、DC Bias 曲线、ESL 数据）
- 堺化学/国瓷材料/Ferro 官方资料（粉体产能和产品线确认）
- 风华高科/三环集团 年报（国产产能和产品等级信息）
- AI 服务器供电架构与 MLCC 用量——需补 NVIDIA/AMD 参考设计或服务器 OEM 资料
- 新能源汽车域控制器 MLCC 用量——需补 Tier1 或车企电子架构公开资料

---

## 使用规则

1. 一级来源优先。二级来源仅用于补充和线索
2. 每条可溯源定量数据必须绑定至少一个一级来源
3. Wikipedia 不能作为唯一来源
4. 厂商资料（产品目录/应用指南/FAQ/新闻稿）属于一级来源
5. 行业标准属于一级来源
6. 产业研究报告为二级来源，份额数字必须标注"约""估算"
7. ChainFlow 综合判断不属于来源，是编辑立场
8. 所有来源标注访问日期或发布年份
