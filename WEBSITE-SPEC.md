# 3we 网站设计规范文档

> 本文档为设计师提供 3we.org 网站的完整页面结构、功能描述和内容规划。
> 网站定位：AI-First 开源机器人平台的官方网站，面向 AI 研究者、机器人学生、RL 从业者和硬件创客。

---

## 目录

1. [品牌定位与设计方向](#1-品牌定位与设计方向)
2. [全局设计系统](#2-全局设计系统)
3. [页面清单总览](#3-页面清单总览)
4. [首页 Landing Page](#4-首页-landing-page)
5. [产品页 Product](#5-产品页-product)
6. [硬件页 Hardware](#6-硬件页-hardware)
7. [文档中心 Docs](#7-文档中心-docs)
8. [博客 Blog](#8-博客-blog)
9. [社区 Community](#9-社区-community)
10. [研究论文 Paper](#10-研究论文-paper)
11. [基准测试 & 排行榜 Benchmarks](#11-基准测试--排行榜-benchmarks)
12. [定价/SKU Pricing](#12-定价sku-pricing)
13. [关于我们 About](#13-关于我们-about)
14. [全局组件说明](#14-全局组件说明)
15. [响应式与国际化](#15-响应式与国际化)
16. [交互与动效指引](#16-交互与动效指引)

---

## 1. 品牌定位与设计方向

### 1.1 品牌核心信息

| 维度 | 内容 |
|------|------|
| 品牌名 | 3we (Three-We) |
| Slogan | AI-First Open Infrastructure for Embodied Robotics |
| 副标题 | 同一份 Python 代码，从仿真无缝运行到真实硬件。<$500 可复现开源硬件。 |
| 目标用户 | AI/ML 研究者、机器人专业学生、RL 从业者、硬件创客 |
| 竞争定位 | 唯一同时做到"完全开源硬件 + 可扩展到工业级部署"的平台 |

### 1.2 品牌三大支柱

1. **可及性 (Accessibility)** — AI 研究者不需要学 ROS2，5 行代码启动机器人
2. **可负担 (Affordability)** — <$500 开源硬件，BOM 完全公开
3. **可复现 (Reproducibility)** — 后端抽象保证 Sim2Real 零代码修改

### 1.3 设计调性

- **技术精密感**：适合研究基础设施的"实验室"美学
- **温暖但专业**：琥珀色/暖金色主色调，传递开放和可亲近感
- **极简但信息密度高**：技术受众不喜欢花哨动效，但需要一目了然的架构信息
- **代码即 Hero**：代码片段是最有力的说服元素，应作为视觉主角

### 1.4 参考色板

| Token | 色值 | 用途 |
|-------|------|------|
| Primary | #e8a020 | 主强调色、CTA 按钮、高亮 |
| Primary Light | #f5c54a | Hover 状态、渐变终点 |
| Background Dark | #0d0d0b | 深色模式背景 |
| Text Primary | #f5f5f3 | 深色模式正文 |
| Text Secondary | #a0a098 | 深色模式辅助文本 |
| Code Background | #1a1a18 | 代码块底色 |
| Success | #4ade80 | 状态指示、对比表格中的优势项 |

### 1.5 字体方案

| 用途 | 字体 | 备选 |
|------|------|------|
| 标题/Display | Outfit (300-900) | Inter |
| 正文 | DM Sans | Inter |
| 代码 | JetBrains Mono | Fira Code |
| 中文 | 思源黑体 (Noto Sans SC) | — |

---

## 2. 全局设计系统

### 2.1 导航栏 (Header)

- 固定顶部，滚动时添加背景模糊效果
- 左侧：3we Logo + 文字标识
- 中间：主导航链接（Product / Hardware / Docs / Blog / Community / Pricing）
- 右侧：语言切换 (EN/中文) + GitHub Star 计数 + 主 CTA "Get Started"
- 移动端：汉堡菜单 + 展开式全屏导航

### 2.2 页脚 (Footer)

多列布局：
- **Product**：Features / Backends / SDK / Benchmarks
- **Hardware**：BOM / Assembly / Firmware / PCB Design
- **Resources**：Docs / Blog / Paper / Examples
- **Community**：GitHub / Discussions / Contributing / Monthly Calls
- **Enterprise**：ERP / SRM / WMS / HCM (外部链接)
- **Legal**：License / Privacy / Terms

底部：版权信息 + 社交链接 (GitHub / Twitter/X / Discord)

### 2.3 全局 CTA 策略

| 优先级 | CTA | 链接目标 |
|--------|-----|----------|
| P0 | Get Started | /docs/getting-started/installation |
| P1 | View on GitHub | GitHub 仓库 |
| P2 | Read the Paper | /paper |
| P3 | Join Community | /community |

---

## 3. 页面清单总览

| 页面 | 路径 | 功能概述 |
|------|------|----------|
| 首页 | `/` | 产品总览、价值主张、快速体验 |
| 产品 | `/product` | 平台能力详解、后端架构、API |
| 硬件 | `/hardware` | 硬件规格、3D 渲染、SKU 对比 |
| 文档中心 | `/docs/*` | 完整技术文档（Starlight） |
| 博客 | `/blog` | 技术博文、开发日志 |
| 社区 | `/community` | 社区入口、贡献指南 |
| 论文 | `/paper` | 学术论文展示、引用 |
| 排行榜 | `/benchmarks` | 基准测试结果、提交入口 |
| 定价 | `/pricing` | 三个 SKU 对比 |
| 关于 | `/about` | 团队、使命、许可证 |

---

## 4. 首页 Landing Page

### 4.1 页面目标

30 秒内让访客理解"3we 是什么"并产生行动意愿。

### 4.2 Section 结构

#### Section 1: Hero

| 元素 | 描述 |
|------|------|
| 标题 | "AI-First Open Platform for Embodied Robotics" |
| 副标题 | "同一份 Python 代码，从仿真无缝运行到真实硬件。5 行代码启动你的第一个机器人。" |
| 代码窗口 | 左侧展示 5 行 Python 代码，右侧展示机器人导航动画/GIF |
| 主 CTA | "Get Started in 30 Seconds" → /docs/getting-started |
| 次 CTA | "View on GitHub" → GitHub 仓库 |
| 背景 | 深色渐变 + 细微网格线（暗示坐标系/仿真环境） |

**代码窗口内容示例：**
```python
from threewe import Robot

async with Robot(backend="gazebo") as robot:
    image = robot.get_camera_image()
    await robot.move_to(x=2.0, y=1.0)
```

#### Section 2: 核心指标条 (Metrics Bar)

4 个关键数字，水平排列：

| 指标 | 数值 | 说明 |
|------|------|------|
| 硬件成本 | <$500 | 完整 BOM 可复现 |
| 上手门槛 | 5 行代码 | 安装到运行 |
| 仿真后端 | 4 种 | Mock / Gazebo / Isaac / Real |
| 代码精简 | 12x | 相比原生 ROS2 |

#### Section 3: 后端架构可视化

- 中央展示架构图：上层 Python API → 中层后端抽象 → 下层四种后端
- 四个后端用卡片/图标表示，点击可切换代码示例
- 强调"零代码修改"切换后端的核心卖点
- 交互：Tab 切换不同后端时，代码片段保持不变，仅 `backend="xxx"` 参数高亮变化

#### Section 4: 功能特性网格 (Features Grid)

2x3 或 3x2 网格，每个卡片包含：图标 + 标题 + 一句话描述

| 特性 | 描述 |
|------|------|
| Sim2Real 零修改 | 同一 API 跨 Mock、Gazebo、Isaac Sim 和真实硬件 |
| AI-First API | 5 行代码完成导航，无需 ROS2 知识 |
| 开源硬件 <$500 | 完整 BOM、KiCad PCB、CERN-OHL-P 许可证 |
| Gymnasium 环境 | 标准 RL 接口，4 种难度，开箱即用 |
| VLM/VLA 集成 | 原生支持 GPT-4o、Qwen-VL 等视觉语言模型 |
| 标准化基准 | 3 类任务、8 种场景、公开排行榜 |

#### Section 5: 30 秒快速上手

- 左侧：3 步流程（Install → Connect → Navigate）
- 右侧：对应代码块，带语法高亮和复制按钮
- 底部 CTA："See Full Tutorial" → /docs/getting-started/first-robot

#### Section 6: 竞品对比表

表格对比 3we vs TurtleBot 4 vs Linorobot2 vs ROSbot XL vs JetBot：

| 维度 | 列 |
|------|-----|
| Python API (无需 ROS) | ✅/❌ |
| Sim2Real 零修改 | ✅/❌ |
| 开源 PCB + BOM | ✅/⚠/❌ |
| Gymnasium 接口 | ✅/❌ |
| VLM/VLA 集成 | ✅/❌ |
| 硬件成本 | 具体价格 |
| 安全等级 (E-stop) | ISO 13850 / 软件 / 无 |

#### Section 7: 受众分流入口

4 列卡片，按用户类型分流：

| 受众 | 标题 | 描述 | CTA |
|------|------|------|-----|
| AI 研究者 | "5 分钟跑通 VLM 导航" | Gymnasium 环境 + VLM 集成 | Start AI Guide |
| 学生 | "从零搭建你的机器人" | 嵌入式到 AI 全栈学习 | Assembly Guide |
| RL 从业者 | "PPO 训练开箱即用" | 标准 Gym 接口 + 公开排行榜 | RL Examples |
| 硬件创客 | "Fork 并定制你的设计" | 开源 PCB + BOM + CAD | Hardware Files |

#### Section 8: 社区与生态

- GitHub Star / Fork / Contributor 统计
- 最近的社区活动（月度 Call）
- 底部 CTA："Join the Community" → /community

---

## 5. 产品页 Product

### 5.1 页面目标

深入展示平台的技术能力，让技术决策者理解架构优势。

### 5.2 Section 结构

#### Section 1: Product Hero

- 标题："One API. Four Backends. Zero Compromise."
- 副标题：深入解释后端抽象的意义
- 全宽架构示意图（分层：Application → SDK → Backend Abstraction → Sim/Real）

#### Section 2: 后端详解 (Tabs)

四个 Tab，每个后端独立页面：

**Mock Backend**
- 零依赖，纯 NumPy 2D 运动学仿真
- 用途：单元测试、CI/CD、算法原型验证
- 性能：即时启动，无 GPU 需求
- 代码示例

**Gazebo Backend**
- Gazebo Harmonic + Nav2 + SLAM
- 用途：物理仿真、传感器模拟、路径规划验证
- 性能：CPU 即可运行，CI 友好
- 截图/视频：Gazebo 环境中的机器人导航

**Isaac Sim Backend**
- NVIDIA Isaac Sim GPU 加速
- 用途：并行 RL 训练、域随机化、大规模仿真
- 性能：1000+ 并行环境
- 截图/视频：Isaac Sim 多环境并行训练

**Real Hardware Backend**
- Raspberry Pi 5 + ESP32-S3 + ROS2 Jazzy
- 用途：真实部署、Demo、数据采集
- 性能：50Hz 控制循环，2ms 端到端延迟
- 照片：真实机器人在办公场景导航

#### Section 3: Python SDK 亮点

- 左右分栏布局
- 左侧：SDK 核心 API 分类展示（感知 / 导航 / AI / 数据）
- 右侧：交互式代码展示，点击 API 分类切换对应代码
- 对比：3we SDK (5行) vs 原生 ROS2 (60行) 完成相同任务

#### Section 4: AI 集成能力

- VLM 导航：一行代码调用 GPT-4o 控制机器人
- VLA 部署：从 HuggingFace 加载预训练策略
- Gymnasium 环境：标准 RL 训练接口
- 轨迹录制：LeRobot 格式，一键上传 HuggingFace Hub
- 每项配对应代码片段

#### Section 5: 安全与可靠性

- ISO 13850 急停按钮
- 三级看门狗系统（500ms / 1s / 1.6s）
- DTLS 加密通信
- ECDSA 签名 OTA 固件更新
- 可视化：安全链路图

#### Section 6: 与生态集成

Logo 墙 + 集成说明：
- ROS2 Jazzy
- Gymnasium / Stable Baselines3
- HuggingFace Hub
- NVIDIA Isaac Sim
- Open3D
- LeRobot

---

## 6. 硬件页 Hardware

### 6.1 页面目标

展示硬件设计的开放性和可复现性，建立"可自己搭建"的信心。

### 6.2 Section 结构

#### Section 1: Hardware Hero

- 标题："Open Hardware You Can Build, Audit, and Fork"
- 3D 渲染/高质量照片：机器人 45° 俯视图，标注各部件
- 关键规格一览：4WD 麦克纳姆轮 / LiDAR / Camera / Hailo-8L / E-stop

#### Section 2: 爆炸图/分层展示

交互式分层展示（或动画）：
- 第 1 层：底盘 + 电机 + 轮子
- 第 2 层：PCB 主板 + ESP32-S3
- 第 3 层：Raspberry Pi 5 + Hailo-8L
- 第 4 层：传感器（LiDAR + Camera + IMU）
- 第 5 层：外壳 + 安全系统

#### Section 3: 详细规格表

| 参数 | 数值 |
|------|------|
| 驱动 | 4 轮麦克纳姆轮 (65mm)，全向移动 |
| 主控 | Raspberry Pi 5 (8GB) |
| 微控制器 | ESP32-S3 (双核 240MHz) |
| AI 加速器 | Hailo-8L M.2 (13 TOPS) |
| 激光雷达 | LD06 360° (12m 量程) |
| 摄像头 | USB 鱼眼 170° FoV |
| IMU | BNO055 9 轴 |
| 最大速度 | 0.5 m/s 线速 / 1.0 rad/s 角速 |
| 电池 | 7.4V Li-ion，~2h 续航 |
| 安全 | ISO 13850 E-stop + 3 级看门狗 |
| 通信 | WiFi 6 + BLE 5.0 + DTLS |
| 扩展 | PBC-34 热插拔载荷总线 |

#### Section 4: PBC-34 载荷总线

- 专门介绍 3we 独创的 PBC-34 接口
- 图示：标准化接口定义、引脚分配
- 已有扩展模块示例
- 自定义开发指南入口

#### Section 5: SKU 三选对比

| | Basic | Standard | Industrial |
|--|-------|----------|------------|
| 价格 | ~$120 | ~$300 | ~$800+ |
| 定位 | 课堂教学 | 研究标配 | 工业原型 |
| 主控 | ESP32-S3 only | Pi 5 + ESP32 | Pi 5 + Jetson |
| AI 加速 | — | Hailo-8L | Hailo-8L / Jetson |
| 防护 | — | — | IP54 |
| 通信 | WiFi | WiFi + BLE | 5G + CAN |

#### Section 6: 文件下载区

- KiCad 工程文件 (PCB 原理图 + Layout)
- STEP/CAD 3D 模型
- BOM 表格 (CSV + 可视化)
- 组装视频链接
- CTA："Start Building" → /docs/hardware/assembly

---

## 7. 文档中心 Docs

### 7.1 页面目标

为不同技术水平的用户提供清晰的学习路径和完整的 API 参考。

### 7.2 文档架构

使用 Starlight 文档框架，左侧树状导航：

```
Getting Started
├── Installation              # pip install, 环境要求
├── Your First Robot          # 30 秒 Hello World
├── Choose Your Backend       # 4 种后端对比与切换
└── Quick Start by Role       # AI研究者 / 学生 / RL / 硬件

Python API Reference
├── Robot Class               # 核心类，构造函数，连接
├── Perception                # 相机、LiDAR、IMU、点云
├── Navigation                # 运动控制、路径规划
├── AI Integration            # VLM、VLA、策略推理
├── Gymnasium Environments    # 环境注册、标准接口
└── Data Collection           # 轨迹录制、LeRobot 格式

Hardware
├── Bill of Materials         # 完整物料清单 + 采购链接
├── Assembly Guide            # 分步组装 + 接线图
├── Firmware Flashing         # ESP32 固件烧录
├── PCB Design Files          # KiCad 工程说明
└── PBC-34 Payload Guide      # 扩展接口开发

Guides
├── Sim-to-Real Transfer      # 域随机化、验证协议
├── VLM Navigation            # 视觉语言模型控制
├── RL Training               # PPO/SAC 训练流程
├── Multi-Robot               # 多机协作
├── Fleet OTA Updates         # 固件更新策略
└── Benchmarking              # 评测流程与提交

Tutorials (Jupyter)
├── Hello World               # 最简示例
├── SLAM Mapping              # 自主建图
├── Waypoint Navigation       # 多点导航
├── RL Training               # PPO 训练
└── Data Collection           # 数据采集 Pipeline

Changelog
└── Release Notes             # 版本历史
```

### 7.3 文档页面设计要素

- **搜索栏**：全文搜索（Pagefind），支持代码内搜索
- **面包屑导航**：当前位置指示
- **Table of Contents**：右侧目录浮动
- **代码块**：语法高亮 + 复制按钮 + 文件名标签 + 行号
- **版本切换**：未来支持多版本文档
- **"Edit on GitHub"** 链接
- **上一页/下一页** 导航
- **反馈按钮**："Was this helpful?"

---

## 8. 博客 Blog

### 8.1 页面目标

展示技术深度，建立社区信任，吸引 SEO 流量。

### 8.2 页面结构

#### 博客首页 `/blog`

- Featured Post：置顶文章大卡片（图片 + 标题 + 摘要）
- 文章网格：3 列卡片布局
- 每张卡片：封面图 + 标题 + 日期 + 标签 + 阅读时长
- 标签筛选栏：Engineering / Tutorial / Research / Community
- 分页或无限滚动

#### 博客文章页 `/blog/[slug]`

- 顶部：标题 + 日期 + 作者 + 标签 + 预计阅读时长
- 正文：Markdown 渲染，支持代码块、图片、表格、LaTeX
- 侧边：Table of Contents (浮动)
- 底部：相关文章推荐 + 分享按钮

### 8.3 已规划文章

| 文章 | 主题 | 标签 |
|------|------|------|
| Dev Log #1 | ESP32 选型、麦克纳姆轮、PBC-34 设计决策 | Engineering |
| Sim2Real in Practice | 后端抽象层设计与 CI 验证 | Engineering |
| Build a $300 Robot | 完整组装教程 | Tutorial |
| VLM Robot Control | 30 行 Python 用 GPT-4o 控制机器人 | Tutorial / AI |
| Platform Paper | 学术论文导读 | Research |

---

## 9. 社区 Community

### 9.1 页面目标

降低参与门槛，引导用户从"使用"走向"贡献"。

### 9.2 Section 结构

#### Section 1: Community Hero

- 标题："Built by Researchers, for Researchers"
- 副标题：开源社区的价值观宣言
- 统计数字：Contributors / Stars / Forks / Countries

#### Section 2: 参与渠道 (3 列卡片)

| 渠道 | 描述 | 链接 |
|------|------|------|
| GitHub Discussions | 提问、分享想法、技术讨论 | github.com/.../discussions |
| Discord | 实时聊天、日常交流、快速问答 | discord.gg/3we |
| Monthly Community Call | 每月第 1 个周四，展示进展 & 讨论方向 | Calendar 链接 |

#### Section 3: 贡献方式 (4 列网格)

| 方式 | 图标 | 描述 |
|------|------|------|
| 报告 Bug | 🐛 | 在 GitHub Issues 提交问题 |
| 分享作品 | 🎉 | 在 Show & Tell 展示你的机器人 |
| 提交基准 | 📊 | 向排行榜提交你的评测结果 |
| 代码贡献 | 💻 | Fork → PR，查看 Good First Issues |

#### Section 4: 贡献指南摘要

- 简化版 CONTRIBUTING.md 关键流程
- CTA："Read Full Contributing Guide" → GitHub CONTRIBUTING.md

#### Section 5: 社区展示墙

- 精选社区项目/改造/应用的图片+链接
- "Submit Your Build" 入口

---

## 10. 研究论文 Paper

### 10.1 页面目标

为学术引用提供正式入口，建立科研可信度。

### 10.2 Section 结构

#### Section 1: Paper Hero

- 论文标题："3we: An Open Platform for Sim-to-Real Embodied AI Research"
- 作者列表 + 机构
- 下载按钮：PDF (English) / PDF (中文)
- arXiv 链接（若有）

#### Section 2: 摘要 (Abstract)

- 完整论文摘要（中英双语切换）
- 关键贡献要点列表

#### Section 3: 主要贡献图

- 论文中的关键 Figure（架构图、实验结果图）
- 带说明文字

#### Section 4: 引用 (Citation)

- BibTeX 格式，带一键复制按钮
- CITATION.cff 链接

#### Section 5: 复现代码

- 论文实验对应的代码仓库链接
- 关键实验的一行运行命令

---

## 11. 基准测试 & 排行榜 Benchmarks

### 11.1 页面目标

建立标准化评测框架，激励社区参与，展示平台能力。

### 11.2 Section 结构

#### Section 1: Benchmarks Hero

- 标题："Standardized Benchmarks for Embodied AI"
- 副标题：3 类任务 × 8 种场景 × 公开排行榜
- CTA："Submit Your Results"

#### Section 2: 任务说明 (3 个 Tab)

| 任务 | 描述 | 指标 |
|------|------|------|
| PointNav | 点到点导航 | Success Rate (SR) + SPL |
| ObjectNav | 语义目标物导航 | SR + SPL + 发现距离 |
| Exploration | 自主探索覆盖 | 覆盖率 + 效率 |

每个 Tab 包含：
- 任务示意图/动画
- 评测协议说明
- Baseline 结果
- 运行命令

#### Section 3: 排行榜表格

- 可排序表格
- 列：排名 / 方法名 / 作者 / SR / SPL / 后端 / 日期 / 代码链接
- 筛选：按任务 / 按后端 (Sim/Real)
- "Submit Entry" CTA

#### Section 4: 如何提交

- 提交格式说明
- CLI 命令：`threewe benchmark run --task pointnav --episodes 100`
- 结果验证流程
- GitHub PR 提交模板链接

---

## 12. 定价/SKU Pricing

### 12.1 页面目标

清晰展示三种硬件配置的差异，引导用户选择或自行搭建。

### 12.2 Section 结构

#### Section 1: Pricing Hero

- 标题："Choose Your Starting Point"
- 副标题："All configurations are 100% open-source. Build it yourself or order pre-assembled."

#### Section 2: 三列对比卡片

| | Basic | Standard (推荐) | Industrial |
|--|-------|----------|------------|
| 价格 | ~$120 | ~$300 | ~$800+ |
| 标语 | "Learn the Stack" | "Research Ready" | "Deploy Anywhere" |
| 主控 | ESP32-S3 | Pi 5 + ESP32-S3 | Pi 5 + Jetson |
| AI | — | Hailo-8L (13 TOPS) | Hailo/Jetson |
| LiDAR | — | LD06 360° | Industrial Grade |
| Camera | — | 170° Fisheye | Stereo + Depth |
| 防护 | 无 | 室内使用 | IP54 |
| 驱动 | 2WD 差速 | 4WD 麦克纳姆 | 4WD 麦克纳姆 |
| 通信 | WiFi | WiFi + BLE | 5G + CAN |
| E-Stop | — | ✅ ISO 13850 | ✅ ISO 13850 |
| 适用 | 教学/入门 | 科研/开发 | 工业原型 |
| CTA | View BOM | View BOM | Contact Us |

#### Section 3: DIY vs Pre-built

- 对比：自己搭建（更便宜、学习价值）vs 预组装（即开即用）
- 两种路径的 CTA

#### Section 4: FAQ

- "Can I mix components from different SKUs?"
- "Where do I buy parts?"
- "Do you ship internationally?"
- "What's the lead time for pre-assembled?"

---

## 13. 关于我们 About

### 13.1 Section 结构

#### Section 1: 使命宣言

- "Democratizing Embodied AI Research"
- 阐述为什么创建 3we：成本壁垒、复杂性壁垒、Sim2Real 鸿沟

#### Section 2: 团队/贡献者

- 核心维护者头像 + 简介 + GitHub 链接
- "And X contributors from Y countries"

#### Section 3: 开源许可

| 组件 | 许可证 | 说明 |
|------|--------|------|
| 固件 & 软件 | Apache 2.0 | 商用友好 |
| 硬件设计 | CERN-OHL-P v2 | 开放硬件 |
| 文档 | CC BY-SA 4.0 | 署名分享 |

#### Section 4: 联系方式

- 邮箱
- GitHub
- Discord
- Twitter/X

---

## 14. 全局组件说明

### 14.1 代码展示组件 (Code Block)

- 深色背景 + 语法高亮
- 左上角：文件名/语言标签
- 右上角：复制按钮
- 支持行号显示
- 支持代码 diff 高亮（绿色/红色）
- 支持多 Tab 切换（显示不同后端的同一操作）

### 14.2 对比表格组件

- ✅ 绿色勾 / ❌ 红色叉 / ⚠ 黄色警告
- 第一列固定，水平滚动（移动端）
- 当前产品列高亮

### 14.3 特性卡片组件

- 图标（建议使用线条图标，如 Phosphor Icons）
- 标题（一行）
- 描述（2-3 行）
- 可选：底部链接 "Learn more →"
- Hover 效果：微微上浮 + 阴影

### 14.4 统计数字组件 (Metrics)

- 大号数字 + 单位
- 下方小字说明
- 可选：增长动画（进入视口时数字滚动）

### 14.5 Tab 组件

- 水平 Tab 切换
- 切换时内容区域平滑过渡
- 当前 Tab 底部高亮条

### 14.6 通知条 (Banner)

- 页面顶部全宽
- 用于：新版本发布 / 活动通知 / 重要公告
- 可关闭

---

## 15. 响应式与国际化

### 15.1 断点设计

| 断点 | 宽度 | 布局策略 |
|------|------|----------|
| Mobile | < 768px | 单列，汉堡菜单，代码块水平滚动 |
| Tablet | 768-1024px | 双列，侧边栏可折叠 |
| Desktop | 1024-1440px | 完整多列布局 |
| Wide | > 1440px | 内容区最大宽度 1280px 居中 |

### 15.2 移动端特殊处理

- 代码块：水平滚动 + 全屏查看按钮
- 对比表格：横向滚动，首列固定
- 导航：全屏覆盖式菜单
- CTA 按钮：底部固定浮动（仅在移动端）
- 触摸目标：最小 44px

### 15.3 国际化 (i18n)

- **支持语言**：English (默认) / 简体中文
- **路由策略**：`/` (英文) / `/zh-cn/` (中文)
- **切换方式**：Header 中的语言选择器
- **内容要求**：所有页面需提供中英双语版本
- **日期/数字格式**：跟随 locale

---

## 16. 交互与动效指引

### 16.1 动效原则

- **克制**：技术用户不喜欢干扰性动画
- **功能性**：动效应传递信息（状态变化、空间关系）
- **性能**：优先使用 CSS transform/opacity，避免 layout 抖动

### 16.2 推荐动效

| 场景 | 动效 | 时长 |
|------|------|------|
| 页面进入 | 内容从下方淡入 | 300ms ease-out |
| Tab 切换 | 内容交叉淡化 | 200ms |
| Hover 卡片 | translateY(-2px) + 阴影加深 | 150ms |
| 代码块后端切换 | 仅高亮参数闪烁 | 400ms |
| 数字指标 | 进入视口时计数器滚动 | 800ms |
| 架构图 | Scroll 触发分层展开 | 600ms stagger |
| 导航菜单展开 | 从顶部滑入 | 250ms |

### 16.3 不推荐的动效

- 全页 Loading 动画（静态站点不需要）
- 视差滚动（分散注意力）
- 自动轮播（用户无法控制节奏）
- 文字逐字打字机效果（技术用户会不耐烦）

---

## 附录 A: 关键视觉素材清单

设计师需要准备或获取的素材：

| 素材 | 类型 | 用于 |
|------|------|------|
| 3we Logo | SVG (亮/暗版本) | Header / Favicon |
| 机器人 3D 渲染 | PNG / WebP | Hardware 页 Hero |
| 机器人爆炸图 | 分层 SVG 或动画 | Hardware 页 |
| 导航 Demo GIF | GIF / WebM | 首页 Hero |
| 架构图 | SVG | 首页 / Product 页 |
| 后端图标 ×4 | SVG | 首页 / Product 页 |
| 特性图标 ×6 | SVG | 首页 Features Grid |
| 团队头像 | JPG 方形裁切 | About 页 |
| 博客封面图 ×5 | 16:9 JPG | Blog 列表 |
| 社区活动照片 | JPG | Community 页 |
| PCB 照片 | JPG | Hardware 页 |
| 实际部署场景照片 | JPG | Product 页 / 首页 |

---

## 附录 B: SEO 关键词规划

| 页面 | 目标关键词 |
|------|-----------|
| 首页 | open source robot platform, embodied AI, sim to real robot |
| Product | robot python API, gymnasium robot, VLM robot control |
| Hardware | open source robot hardware, cheap robot platform, robot BOM |
| Docs | robot tutorial, python robot programming, ROS2 alternative |
| Benchmarks | embodied AI benchmark, robot navigation benchmark |
| Blog | build robot from scratch, sim2real transfer, VLM navigation |

---

## 附录 C: 技术实现建议

| 项目 | 建议 |
|------|------|
| 框架 | Astro 6 (SSG) + Starlight (文档) |
| 部署 | Cloudflare Pages |
| 样式 | Tailwind CSS 4 + CSS Variables |
| 代码高亮 | Shiki (Astro 内置) |
| 搜索 | Pagefind (静态全文搜索) |
| 分析 | Cloudflare Web Analytics (隐私友好) |
| 图片 | Astro Image 优化 + WebP |
| 字体 | 自托管 (woff2) |

---

*文档版本: v1.0*
*最后更新: 2026-05-17*
*状态: 待设计师审阅*
