# PRD｜What's in My Bag 个人作品集网站

# PRD｜What's in My Bag 个人作品集网站

<aside>
📌

**文档状态：** 草稿 v1.0｜2026-04-13

**作者：** Zhu Keyao × Notion AI

**技术栈：** React + Vite · Vercel · AI Studio + Copilot

**语言：** 英文主体 + CN/EN 切换按钮

</aside>

---

## 一、产品概述

### 1.1 项目定位

这不是一份传统简历页，而是一件**可被体验的个人作品**。以「透明包」为首页容器，用包内真实物件作为导航入口，点击进入各自独立世界的二级页面，以极简动效与高留白呈现审美力与结构化思维能力。

> **一句话定义：** 一个低饱和灰蓝色调的交互式作品集，外壳是「What's in my bag」，内核是「审美 + 内容策略能力的沉浸式展示」。
> 

### 1.2 核心优先级

| **优先级** | **维度** | **说明** |
| --- | --- | --- |
| P0 | 体验感 | 用户感受到「在逛一件作品」而非「在看简历」 |
| P1 | 审美 | 视觉克制、有质感，不堆砌 |
| P2 | 结构清晰 | 信息可被快速扫读，不迷失 |
| P3 | 信息完整性 | 关键经历全覆盖，但不追求穷举 |

### 1.3 目标用户 & 使用场景

- **主要场景：** 外企 HR / 面试官在电脑大屏端审阅（深度体验）
- **次要场景：** 面试前快速扫读、手机端初步浏览
- **目标感受：** "这个人有审美、有结构、能做复杂项目，而且很有自己的风格"

---

## 二、信息架构

```
[首页 · Home — Transparent Bag]
        |
        |── 💻 MacBook         →  Page 2: Work Experience
        |── 📓 Notebook        →  Page 3: Education + Internship
        |── 📷 Film Camera     →  Page 4: GAP / Life Map
        |── 🧷 咕卡挂件         →  Page 5: About Me
        |
        └── 🔗 全局悬浮入口     →  Contact + Resume Download
```

### 路由规划

| **路由** | **页面名** | **对应物件** |
| --- | --- | --- |
| `/` | Home · Bag | 透明包主页 |
| `/work` | Mac · Work | 💻 MacBook |
| `/edu` | Notebook · Edu | 📓 笔记本 |
| `/life` | Camera · Life | 📷 胶片相机 |
| `/about` | Card · About | 🧷 咕卡挂件 |

---

## 三、页面详细规格

### Page 1｜Home · Transparent Bag

#### 3.1.1 视觉构成

- **背景：** 极浅灰蓝（接近白，约 `#F5F7FA`），大面积留白
- **主体：** 透明 PVC 质感包，居中，约占画面高度 65%
    - 材质感：磨砂玻璃 / glassmorphism，`backdrop-filter: blur(2px)`，轻微折射感
    - 包型参考：方形托特包轮廓，有提手，金属扣件细节
- **包内物件（4个，有层次感）：**

| **物件** | **风格** | **位置** | **链接目标** |
| --- | --- | --- | --- |
| 💻 MacBook（银色，俯视30°） | 写实渲染，Apple logo 可见 | 包内居中偏左 | `/work` |
| 📓 Notebook（米白，轻微纸纹） | 写实，略微斜放，有回形针 | 包内右下角，压在Mac下 | `/edu` |
| 📷 Fujifilm 胶片相机（黑银） | 写实，复古质感，有贴纸 | 包内右上区域 | `/life` |
| 🧷 咕卡卡套（挂在包外侧D扣） | 透明卡套，有咕卡贴纸装饰 | 包左侧外挂，悬垂 | `/about` |
- **光源规则：** 统一左上方光源，阴影轻而统一，不过饱和
- **顶部导航：** 极简文字 `Work · Edu · Life · About`，字间距宽，字号小，颜色 `#8A9BB0`
- **底部：** 极小字 `KEYAO · BAG`，居中，letter-spacing 宽

#### 3.1.2 交互规格

| **触发** | **效果** | **动效参数** |
| --- | --- | --- |
| Hover 物件 | 物件 scale 1→1.04，阴影轻微增强，label 贴纸渐显（opacity 0→1） | `transition: 0.3s ease` |
| 移开鼠标 | 还原，label 消失 | `transition: 0.2s ease` |
| Click 物件 | 物件 zoom-in 放大至全屏 → 背景模糊 → 跳转二级页面（zoom-in transition） | 炫技唯一点：`scale + blur + fade, 0.5s` |
| 手机 Tap（一次） | 显示 label 贴纸（替代 hover） | - |
| 手机 Tap（二次） | 跳转二级页面 | - |

**Label 贴纸样式：**

- 背景：`rgba(255,255,255,0.75)`，`border-radius: 6px`，轻微阴影
- 字号：12px，颜色 `#5A7A9A`，letter-spacing: 0.05em
- 内容示例：`WORK EXPERIENCE` / `EDU & INTERN` / `LIFE & GAP` / `ABOUT ME`

#### 3.1.3 全局悬浮入口

- 右下角固定悬浮按钮：`Contact ↗`
- 点击展开：邮箱 + 手机 + Resume PDF（新标签页预览）
- 样式：极简圆角胶囊，灰蓝描边，白底

---

### Page 2｜Mac · Work Experience

#### 3.2.1 视觉构成

- **背景：** 仿 macOS 渐变桌面（极浅灰蓝渐变，不用真实壁纸）
- **顶部菜单栏：** 仿 Mac menubar，显示时钟 + `KEYAO.BAG` 字样
- **底部 Dock：** 4 个项目 icon，hover 时 scale 放大（Mac Dock 经典效果）
- **左上角：** `← BACK` 返回首页

#### 3.2.2 4个项目 Icon

| **Icon 名称（文件名风格）** | **对应经历** | **图标建议** |
| --- | --- | --- |
| `Content_System` | 阿里巴巴淘天集团 · 短视频传播体系 | 🗂 文件夹蓝色 |
| `Growth_Engine` | 四川日报 · 多平台增长 | 📈 图表绿色 |
| `PR_Strategy` | 四川日报 · 三星堆整合营销 | 🏛 建筑暖色 |
| `Global_Comms` | 昆士兰就业中心 · 国际传播 | 🌐 地球蓝色 |

#### 3.2.3 项目弹窗（Mac Window）

- 样式：Mac 风格浮层，红黄绿交通灯，可叠放，白底轻阴影
- 点击 icon → window 从 icon 位置 scale-up 展开（`transform-origin: icon位置`）
- 窗口结构：

```
[窗口标题栏] ● ● ●  CONTENT_SYSTEM.exe
──────────────────────────────
[一句话标题]  Built a short-video ecosystem from zero
[Context]    Background: ...
[What I did] · Built vendor evaluation system
             · Standardized content delivery workflow
             · Managed 10+ agencies
[Key Move]   Turned fragmented content into a scalable system
[Result]     75% trending rate · 70% vendor renewal · CPM optimized
```

- 窗口可拖动（选做，加分项）
- 多窗口可叠放，点击置顶

#### 3.2.4 四个项目内容规格

**① Content_System · 阿里巴巴淘天集团**

- **One-liner:** Built a short-video ecosystem from zero
- **Context:** Taobao & Tmall needed a structured short-video distribution system post-spinoff
- **What I did:**
    - Built vendor evaluation system & talent resource pool from scratch (TikTok / Kwai / WeChat Channels)
    - Standardized monthly delivery for 20+ projects across 10+ agencies
    - Managed 8-figure annual budget; established public opinion tiering mechanism
- **Key Move:** Turned fragmented agency chaos into a replicable system adopted cross-BU
- **Result:** 75% trending rate · 70% core vendor renewal · CPM/CPE outperformed market average

**② Growth_Engine · 四川日报社**

- **One-liner:** Scaled multi-platform content growth at a traditional media group
- **Context:** Legacy media adapting to social-first content strategy
- **What I did:**
    - Led full-platform content strategy & video team as Editor-in-Chief
    - Built repeatable viral content production model
    - 30+ Weibo trending #1, 50+ WeChat articles 100K+ reads, 10+ Douyin videos 100M+ plays
- **Key Move:** Youngest winner of Group's Annual Top 10 Editor award
- **Result:** TikTok 3M → 10M · Weibo 8M → 12M · Bilibili 10x growth

**③ PR_Strategy · 三星堆考古大发现**

- **One-liner:** Designed a cultural IP campaign that went national
- **Context:** Sanxingdui archaeological discovery — an opportunity to make ancient culture viral
- **What I did:**
    - Orchestrated cross-dept + cross-institution integrated campaign
    - Matrix: documentary + animated MV + NFT + UGC challenge + museum collabs + KOL co-creation
- **Key Move:** Connected content × culture × commerce into a full IP operation
- **Result:** ~5 billion total views · Single-post 1B impressions · China News Award 2nd Prize

**④ Global_Comms · UQ Student Employability Centre**

- **One-liner:** Built international communication presence from zero
- **Context:** UQ needed a structured overseas social media presence
- **What I did:**
    - Launched official Instagram from 0; established content tone standards
    - Led 6 YouTube video productions; revamped Facebook content strategy
- **Key Move:** Segmented framework across 6 audience groups, aligned 3 admin teams
- **Result:** Instagram +6,000 followers in 4 months · YouTube +800% views · Facebook engagement +200%

---

### Page 3｜Notebook · Education & Internship

<aside>
✨

**设计巧思：翻开笔记本内页**

页面底色换成米白横线纸质感，内容像被「逐行写上去」一样依次出现（opacity + translateY 入场）。左侧时间轴点击高亮，右侧内容区以 monospace 字体呈现，有行距感，像真的记在本子里。无 3D 翻页，无 post-it。

</aside>

#### 3.3.1 视觉构成

- **背景：** 米白 `#FAF9F6`（只有此页换底色，模拟笔记本内页质感）
- **极细横线纹理：** `repeating-linear-gradient` 模拟横线纸，线条颜色极浅（`rgba(107,140,174,0.08)`）
- **布局：** 左侧竖向时间条目（点击高亮）+ 右侧内容区
- **内容字体：** 偏 monospace（如 `JetBrains Mono` 或 `Courier New`），字号小，行距宽
- **进场动效：** 内容逐行出现，`opacity 0→1 + translateY 8px→0`，staggered delay
- **背景水印：** 大字 `EDUCATION`（极浅）
- **左上角：** `← BACK`

#### 3.3.2 时间轴内容（倒序）

| **年份** | **机构** | **身份** | **标签色** |
| --- | --- | --- | --- |
| 2019 | UQ Student Employability Centre | Digital Media Intern | 蓝色 |
| 2018–2019 | The University of Queensland | Master of Communication | 灰蓝 |
| 2017 | Weber Shandwick Shanghai | PR Intern | 粉色 |
| 2014–2018 | East China Normal University | Bachelor of Public Relations | 绿色 |

#### 3.3.3 便签卡内容结构

每个条目点击后，左侧便签内容切换，结构：

```
[机构名]  University of Queensland
[时间]    Jul 2018 – Dec 2019
[身份]    Master of Communication · QS Global Top 40
──────────────────────
[Highlight 1]  GPA 6.4/7.0 · Academic Excellence Award
[Highlight 2]  AUD 15,000 cumulative scholarships
```

```
[机构名]  Weber Shandwick · Shanghai
[时间]    May – Sep 2017
[身份]    PR Intern · Consumer Practice
──────────────────────
[Highlight 1]  Tourism Australia "China-Australia Tourism Year" campaign
[Highlight 2]  Celebrity itinerary management + media analytics
```

---

### Page 4｜Camera · Life & GAP

<aside>
✨

**设计巧思：极简脚印地图**

页面只有两种元素：动态脚印轨迹 + 城市名称，漂浮于大面积留白中。无地图底图、无虚线、无坐标轴。脚印走过本身就是叙事。PC hover / Mobile tap 弹出 gallery 浮层，不跳转新页面。

</aside>

#### 3.4.1 视觉构成

- **背景：** 极浅灰蓝（`#F5F7FA`），**大面积留白，无任何底图**
- **页面元素只有两种：**
    1. **脚印** 👣 — 沿时间顺序动态依次出现，左右脚交替，连接各城市
    2. **城市名称** — 极简文字，散落漂浮在留白中，位置对应脚印落点
- **无地图轮廓、无虚线、无坐标点圆圈**，只有脚印本身的轨迹
- **背景水印：** 大字 `LIFE`（极浅，`rgba(107,140,174,0.06)`）
- **左上角：** `← BACK`

#### 3.4.2 脚印动效规格

```css
/* 脚印沿路径依次出现，左右脚交替，轻微摆动 */
@keyframes footstep {
  0%   { opacity: 0; transform: scale(0.6) rotate(-5deg); }
  20%  { opacity: 1; transform: scale(1) rotate(0deg); }
  80%  { opacity: 1; }
  100% { opacity: 0.3; }
}

.footprint {
  font-size: 10px;
  animation: footstep 1.2s ease forwards;
  animation-delay: calc(var(--i) * 0.15s);
}
```

- 脚印颜色：`#8A9BB0`
- 脚印大小：`10–12px`
- 路径顺序：上海 → Brisbane → 成都 → 杭州 → Santiago
- 循环：走完全程后脚印渐隐，重新从起点开始

#### 3.4.3 城市点位规划（TBD 可扩展）

| **城市** | **时间** | **叙事关键词** | **Gallery 内容** |
| --- | --- | --- | --- |
| 🇨🇳 上海 | 2014–2018 | 华东师大，起点；万博宣伟，第一份PR | 校园/工作照片 |
| 🇦🇺 Brisbane | 2018–2019 | 昆士兰，徒步+摄影 | 自然/徒步照（已有素材） |
| 🇨🇳 成都 | 2020–2023 | 四川日报，媒体岁月 | 城市/工作日常照片 |
| 🇨🇳 杭州 | 2023–2026 | 阿里巴巴，互联网切片 | 城市/工作日常照片 |
| 🇪🇸 Santiago | Mar 2026 | Camino，800km，TBD | 旅行照片（已有素材） |
| （更多点位 TBD） | - | - | - |

#### 3.4.4 交互规格

- **PC Hover 城市名称：** 文字轻微放大 + 脚印在该点位短暂停留发亮
- **PC Hover / Mobile Tap → 触发 Gallery 浮层**（页面内弹窗，不跳转新页面）
- **Gallery 浮层样式：** 深色半透明遮罩 + 居中横向滑动照片组，每张配 1–2 行 caption
- **关闭：** 点击浮层外区域 / 点击关闭按钮收回

---

### Page 5｜Card · About Me

<aside>
✨

**设计巧思：咕卡挂件 → 风铃 + 线条开花**

咕卡卡套本身就是悬挂在包上的挂件——About 页将这个形态放大：多个挂件悬垂于页面顶部如风铃，轻微摇摆；横向滑动浏览；点击某个挂件后，其下方线条向下延伸并开出花，花内展示详情。物件隐喻自洽，动效本身就是叙事，大面积留白。

</aside>

#### 3.5.1 视觉构成

- **背景：** 纯白或极浅灰蓝，**大面积留白**
- **主体：** 多个包挂小挂件悬垂于页面顶部细线上，居中展开，可横向滑动
- **悬垂线：** 极细灰色线（`1px, #C0CEDD`），从页面顶部垂下
- **背景水印：** 大字 `ABOUT`（极浅）
- **左上角：** `← BACK`

#### 3.5.2 包挂条目规划

| **包挂** | **内容** | **开花详情** |
| --- | --- | --- |
| 包挂 ①（主一） | `Keyao Zhu` 姓名卡 | Tagline（TBD）+ 身份 `Content-led Brand Strategist` |
| 包挂 ② | `INTJ` 标签 | MBTI 简短介绍一句话 |
| 包挂 ③ | `New Media × PR × Brand` | 核心能力展开：6年经历一句话 |
| 包挂 ④ | `Stay Real` | 个人价値观/态度一句话 |
| 包挂 ⑤ | 联系方式图标 | 邮箱 + 电话，点击可复制 |

#### 3.5.3 交互规格

| **状态** | **效果** | **动效参数** |
| --- | --- | --- |
| 页面进场 | 包挂从上方依次杠入，开始轻微摇摆 | `translateY(-80px)→0, staggered 0.1s, ease-out` |
| idle 状态 | 包挂持续轻微摇摆（风铃感） | `rotate ±2°, period 3–4s, ease-in-out, 每个包挂随机延迟` |
| 横向滑动 | 包挂随手违横向滑动，查看更多 | `smooth scroll, overflow-x` |
| Hover 包挂 | 包挂轻微放大 + 悬垂线变炱 | `scale(1.05), 0.2s` |
| Click 包挂 | 其下方线条向下延伸→ 末端开出花→ 花内展示详情内容 | `line height 0→100%, 0.6s ease; flower scale 0→1, 0.4s` |
| 关闭 | 点击花外区域，花收回，线条缩短 | 逆播进场动效 |

#### 3.5.4 花形设计规范

- **花形风格：** 极简杆状花，参考 reference 的几何化花形（不写实，偏设计感）
- **花芒颜色：** 每个包挂对应不同花色，整体色调和网站灰蓝调和谐（迟鸽蓝/粉蓝/淡紫）
- **花内内容：** 简短文案 + 必要时配 1 个按钮（如复制邮箱）
- **大小：** 花内内容卡片 `200×160px` 左右，不占满屏，保留大量留白

---

## 四、视觉设计规范（Design Tokens）

### 4.1 色彩系统

| **Token** | **色值** | **用途** |
| --- | --- | --- |
| `--bg-primary` | `#F5F7FA` | 主背景（接近白的灰蓝） |
| `--bg-secondary` | `#EBF0F7` | 卡片背景、便签底色 |
| `--accent-blue` | `#6B8CAE` | 主强调色（低饱和灰蓝） |
| `--accent-light` | `#A8C4DC` | 辅助蓝、时间轴色 |
| `--text-primary` | `#2C3E50` | 正文主色 |
| `--text-secondary` | `#8A9BB0` | 次要文字、导航、label |
| `--text-watermark` | `rgba(107,140,174,0.08)` | 背景大字水印 |
| `--shadow-soft` | `0 4px 20px rgba(107,140,174,0.12)` | 卡片、物件阴影 |

**禁止事项：** 不用纯黑、不用强对比色、不用发光效果、不用高饱和跳色

### 4.4 子页自然主题方向（各页 TBD，进入子页视觉设计时细化）

每个子页有独立的「自然元素」作为视觉暗线，以**抽象色调 + 质感**呈现，**不使用真实照片/写实场景**。整体保持现代、简洁、留白、有设计美学。

| **页面** | **自然元素** | **气质对应** | **视觉方向（抽象）** |
| --- | --- | --- | --- |
| 💻 Work | 🌊 海洋 | 系统与深度 | 深海色调渐变，沉静蓝绿，非写实海景 |
| 📓 Edu | 🪵 木质 | 积累与成长 | 暖木色系，木纹质感，非照片纹理 |
| 📷 Life | 🌤 天空 | 自由与流动 | 极浅蓝白渐变，开阔留白，非真实天空图 |
| 🧷 About | 🌸 花开 | 个性与真实 | 花系配色（桃/藕/嫩绿），已有花动效呼应 |

**设计原则：** 自然元素只体现在色调、质感、动效气息上，不引入写实摄影、插画或图标化自然物。

### 4.2 字体系统

| **层级** | **字体** | **字号** | **字重** |
| --- | --- | --- | --- |
| 大标题 / 水印 | Inter / DM Sans | 80–120px | 700 |
| 项目标题 | Inter | 18–22px | 600 |
| 正文 | Inter | 14–15px | 400 |
| 导航 / label | Inter | 11–13px | 400–500，letter-spacing: 0.1em |
- 中文内容（CN 模式下）：`Noto Sans SC` 或系统默认
- Google Fonts 引入：`Inter` + `Noto Sans SC`

### 4.3 圆角 & 间距

- 卡片圆角：`12px`
- 按钮圆角：`8px`（胶囊型用 `999px`）
- 基础间距单位：`8px`（4/8/16/24/32/48）

---

## 五、交互 & 动效规范

### 5.1 动效分级

| **级别** | **动效** | **参数** | **必须/选做** |
| --- | --- | --- | --- |
| L1 必须 | 物件 hover scale | `scale(1.04), 0.3s ease` | ✅ 必须 |
| L1 必须 | Label 贴纸渐显 | `opacity 0→1, 0.25s` | ✅ 必须 |
| L1 必须 | 页面切换 fade | `opacity 0→1, 0.4s` | ✅ 必须 |
| L2 加分 | Mac 窗口弹出动画 | `scale(0.95)→1 + opacity, 0.3s` | ⭐ 加分 |
| L2 加分 | 胶片条横向滑动 | `smooth scroll` | ⭐ 加分 |
| L2 加分 | Dock 图标 scale | Mac 原生 dock 效果模拟 | ⭐ 加分 |
| L3 炫技唯一 | 点击物件进入二级页：zoom-in + blur | `scale + backdrop-filter, 0.5s cubic-bezier` | 🎯 只做这一个炫技 |

**动效禁止事项：** 不用 bounce 弹跳、不用强发光、不用超过 0.6s 的动画、不堆砌

---

## 六、技术规格

### 6.1 技术栈

| **层级** | **技术选型** | **说明** |
| --- | --- | --- |
| 框架 | React + Vite | 快速热更新，AI Studio 生成质量最佳 |
| 路由 | React Router v6 | 5个页面路由 |
| 样式 | Tailwind CSS + CSS Modules | 快速布局 + 组件隔离 |
| 动效 | Framer Motion | 页面切换 + 物件交互动效 |
| 图片 | 本地 `/public/visuals/` 目录 | 物件渲染图 + 照片素材 |
| 语言切换 | `i18next`  • `react-i18next` | EN/CN 全站文案切换 |
| 部署 | Vercel | GitHub 推送自动部署 |
| 编码工具 | Google AI Studio + GitHub Copilot | AI Studio 生成主结构，Copilot 细节补全 |

### 6.2 项目文件结构

```jsx
src/
├── pages/
│   ├── Home.jsx          # 透明包首页
│   ├── Work.jsx          # Mac 桌面工作经历
│   ├── Edu.jsx           # Notebook 教育+实习
│   ├── Life.jsx          # Camera 地图+胶片
│   └── About.jsx         # 咕卡 About Me
├── components/
│   ├── BagItem.jsx       # 包内物件组件（含hover状态）
│   ├── MacWindow.jsx     # Mac 弹窗组件
│   ├── FilmStrip.jsx     # 胶片条组件
│   ├── StickerLabel.jsx  # 标签贴纸组件
│   ├── FloatContact.jsx  # 全局悬浮联系按钮
│   └── LangToggle.jsx    # CN/EN 切换按钮
├── locales/
│   ├── en.json           # 英文文案
│   └── zh.json           # 中文文案
├── visuals/              # 物件图片、照片素材
└── App.jsx               # 路由入口
```

### 6.3 环境搭建步骤（完整）

1. 确认 Node.js 已安装：终端运行 `node -v`
2. 创建项目：`npm create vite@latest keyao-bag -- --template react`
3. 进入目录：`cd keyao-bag`
4. 安装依赖：`npm install react-router-dom framer-motion i18next react-i18next`
5. 安装 Tailwind：`npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`
6. 本地启动：`npm run dev`
7. 连接 GitHub → 推送 → Vercel 导入仓库自动部署

---

## 七、响应式方案

| **断点** | **策略** |
| --- | --- |
| Desktop ≥1024px | 完整交互体验，hover 全生效 |
| Tablet 768–1023px | 包缩小至80%，物件布局微调 |
| Mobile ＜768px | Tap ×1 显示 label，Tap ×2 进入子页；包等比缩放；Mac 窗口全屏展示 |
- 手机端调试工具：Chrome DevTools → Command+Option+I → 📱 手机模拟器图标，**优先在本地实时预览，不要等 push 到 Vercel 再看效果**

---

## 八、内容规格（CN/EN 双语）

### 8.1 全局导航

| EN | CN |
| --- | --- |
| Work | 工作 |
| Edu | 教育 |
| Life | 生活 |
| About | 关于 |
| Contact | 联系我 |

### 8.2 联系信息

- Email：`chris_zky@163.com`
- Phone：`+86 153 8518 8929`
- Resume：PDF 新标签页预览

---

## 九、TBD & 开放事项

| **编号** | **待定内容** | **优先级** |
| --- | --- | --- |
| TBD-01 | About Me 核心 Tagline（一句话定位） | 🔴 高，影响整体气质 |
| TBD-02 | Camera 页各点位 caption 文案（Camino/成都杭州/昆士兰） | 🟡 中，提供照片素材时一并确认 |
| TBD-03 | Camera 页点位数量（现有3个，可扩展） | 🟡 中 |
| TBD-04 | 物件图片素材（MacBook/相机/笔记本/咕卡渲染图） | 🔴 高，由 Copilot 生成后置入 |
| TBD-05 | 个人照片（About 页宝丽来 + Life 页各地点照片） | 🟡 中，有素材直接置入 |
| TBD-06 | 简历 PDF 最终版文件路径 | 🟢 低，开发后期置入 |

---

## 十、开发路径建议

- Phase 1｜搭架子（1–2天）
    - 初始化 React + Vite 项目
    - 配置路由（5页）
    - 搭首页 Bag 静态布局（先用占位图）
    - 配置 Tailwind + 颜色 token
- Phase 2｜核心交互（2–3天）
    - 首页物件 hover + click 动效（Framer Motion）
    - 页面切换 zoom-in 炫技动效
    - Work 页 Mac 桌面 + 窗口弹出
    - Edu 页时间轴 + 便签切换
- Phase 3｜内容填充（1–2天）
    - 置入真实物件渲染图（Copilot 生成）
    - 填入所有文案（工作经历/教育/实习）
    - Life 页地图 + 胶片条
    - About 页咕卡拼贴
- Phase 4｜收尾打磨（1天）
    - CN/EN 切换功能
    - 响应式适配（手机端）
    - 悬浮联系按钮
    - 全站性能优化（图片压缩等）
    - Vercel 正式部署