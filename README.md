# Big Market Front V1

> 基于 Next.js 实现的大营销抽奖活动前端，面向 Big Market 后端接口提供活动体验页，覆盖大转盘、九宫格抽奖、会员资产、签到返利、积分兑换、策略装配和权重规则进度展示等营销场景。

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8)
![Node.js](https://img.shields.io/badge/Node.js-24+-339933)

## 项目简介

Big Market Front V1 是 Big Market 营销抽奖系统的前端体验项目。项目使用 Next.js App Router、React、TypeScript 和 Tailwind CSS 构建，前端通过活动 ID 与用户 ID 调用后端抽奖活动接口，展示用户活动账户、奖品列表、抽奖结果、签到返利、积分账户和 SKU 兑换等数据。

项目默认对接 mock 接口，也可以通过环境变量切换到本地或线上 Big Market 后端服务。

## 核心能力

- 抽奖活动页：提供大转盘和九宫格两种抽奖玩法。
- 奖品展示：查询并渲染活动奖品池、锁定奖品和解锁奖品状态。
- 活动账户：展示用户活动总额度、月额度、日额度和剩余抽奖次数。
- 签到返利：支持日历签到状态查询和签到返利触发。
- 积分账户：查询用户积分余额，支持积分兑换活动 SKU。
- 策略装配：提供活动策略装配入口，便于本地联调后端缓存预热流程。
- 权重规则：展示抽奖策略权重阶段和用户解锁进度。
- 参数透传：支持通过 URL query 覆盖默认 `userId` 和 `activityId`。

## 技术栈

- Next.js 16.1.6
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4
- ESLint 9
- Lucky Canvas React
- Docker

## 目录结构

```text
big-market-font-v1
├── public/                     # 静态资源、奖品图片、抽奖按钮和背景素材
├── src/
│   ├── apis/                   # 后端 API 请求封装
│   ├── app/
│   │   ├── components/         # 活动账户、签到、SKU、策略规则等组件
│   │   ├── pages/lucky/        # 大转盘和九宫格抽奖页面
│   │   ├── globals.css         # 全局样式
│   │   ├── layout.tsx          # App Router 根布局
│   │   └── page.tsx            # 首页活动体验台
│   ├── config/                 # 默认用户和活动参数
│   └── types/                  # 接口响应类型定义
├── Dockerfile                  # 前端镜像构建文件
├── build.sh                    # Docker 镜像构建脚本
├── next.config.js              # Next.js 配置
├── package.json                # npm 脚本与依赖
└── tsconfig.json               # TypeScript 配置
```

## 环境要求

- Node.js 24+，推荐与 `Dockerfile` 保持一致
- npm 10+
- 可选：Docker，用于镜像构建和容器部署

默认端口：

| 服务 | 端口 |
| --- | --- |
| Next.js 本地开发服务 | `3000` |
| Docker 容器服务 | `3000` |
| Big Market 后端服务 | 根据后端项目配置，常见为 `8098` |

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置接口地址

项目通过 `API_HOST_URL` 指定后端服务地址。可在本地创建 `.env.local`：

```bash
API_HOST_URL=http://localhost:8098
```

如果未配置，项目会使用代码中的 mock 地址。

### 3. 启动开发服务

```bash
npm run dev
```

浏览器访问：

```text
http://localhost:3000
```

支持通过 URL 参数指定用户和活动：

```text
http://localhost:3000?userId=yiersan218&activityId=100301
```

### 4. 构建生产包

```bash
npm run build
```

### 5. 启动生产服务

```bash
npm run start
```

## Docker 部署

构建镜像：

```bash
docker build -t yiersan218/big-market-front-app:3.0 .
```

或执行脚本：

```bash
sh build.sh
```

启动容器：

```bash
docker run -d \
  --name big-market-front \
  -p 3000:3000 \
  -e API_HOST_URL=http://host.docker.internal:8098 \
  yiersan218/big-market-front-app:3.0
```

> 如果后端服务部署在 Linux 宿主机或 Docker Compose 网络中，请按实际网络环境调整 `API_HOST_URL`。

## 接口说明

前端请求统一封装在 `src/apis/index.tsx`，当前使用的后端接口包括：

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/v1/raffle/activity/armory` | 装配活动与抽奖策略数据 |
| POST | `/api/v1/raffle/strategy/query_raffle_award_list` | 查询抽奖奖品列表 |
| POST | `/api/v1/raffle/activity/draw` | 用户参与活动抽奖 |
| POST | `/api/v1/raffle/activity/query_user_activity_account` | 查询用户活动账户额度 |
| POST | `/api/v1/raffle/activity/calendar_sign_rebate` | 用户签到返利 |
| POST | `/api/v1/raffle/activity/is_calendar_sign_rebate` | 查询用户当日是否签到 |
| POST | `/api/v1/raffle/strategy/query_raffle_strategy_rule_weight` | 查询策略权重规则进度 |
| POST | `/api/v1/raffle/activity/query_user_credit_account` | 查询用户积分账户 |
| POST | `/api/v1/raffle/activity/query_sku_product_list_by_activity_id` | 查询活动 SKU 商品列表 |
| POST | `/api/v1/raffle/activity/credit_pay_exchange_sku` | 积分兑换活动 SKU |

## 常用脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动本地开发服务 |
| `npm run build` | 构建生产版本 |
| `npm run start` | 启动生产服务 |
| `npm run lint` | 执行 ESLint 检查 |

## 联调说明

本项目通常与 Big Market 后端项目配合使用。联调前请确认：

- 后端服务已启动，并且活动、策略、奖品、SKU 和用户账户数据已初始化。
- `API_HOST_URL` 指向可访问的后端网关地址。
- 默认活动 ID 为 `100301`，默认用户 ID 为 `yiersan218`，可在 `src/config/activity.ts` 中调整。
- 如果使用 Docker 运行前端，容器内访问宿主机后端时需要使用正确的宿主机地址。

## 许可证

本项目用于 Big Market 营销系统前端示例，许可证请以仓库实际 `LICENSE` 文件为准。
