"use client";

import {LuckyWheelPage} from "@/app/pages/lucky/lucky-wheel-page";
import {LuckyGridPage} from "@/app/pages/lucky/lucky-grid-page";
import dynamic from "next/dynamic";
import {useState} from "react";
import {DEFAULT_ACTIVITY_ID, DEFAULT_USER_ID} from "@/config/activity";

const StrategyArmoryButton = dynamic(async () => (await import("./components/StrategyArmory")).StrategyArmory)
const StrategyRuleWeightButton = dynamic(async () => (await import("./components/StrategyRuleWeight")).StrategyRuleWeight)
const MemberCardButton = dynamic(async () => (await import("./components/MemberCard")).MemberCard)
const SkuProductButton = dynamic(async () => (await import("./components/SkuProduct")).SkuProduct)


export default function Home() {

    const [refresh, setRefresh] = useState(0);

    const handleRefresh = () => {
        setRefresh(prev => prev + 1)
    };

    return (
        <main className="min-h-dvh px-4 py-5 text-[#2f2e41] sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
                <header className="flex flex-col gap-5 rounded-[28px] border border-white/80 bg-white/70 px-5 py-5 shadow-[0_24px_70px_rgba(112,86,94,0.14)] backdrop-blur md:flex-row md:items-center md:justify-between md:px-8">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold text-[#c45d78]">Big Market Raffle Console</p>
                        <h1 className="mt-2 text-3xl font-bold leading-tight text-[#2f2e41] sm:text-4xl lg:text-5xl">
                            大营销抽奖体验台
                        </h1>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-[#6b6270]">
                            柔和马卡龙视觉，聚合会员资产、积分兑换、抽奖玩法与策略进度，让活动体验更轻快也更清晰。
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-[#4f4654] sm:min-w-[300px]">
                        <div className="rounded-2xl border border-[#f4d8df] bg-[#fff8fb] px-4 py-3">
                            <span className="block text-xs uppercase text-[#9a8796]">User</span>
                            <span className="mt-1 block truncate">{DEFAULT_USER_ID}</span>
                        </div>
                        <div className="rounded-2xl border border-[#c8ebf1] bg-[#f4fdff] px-4 py-3">
                            <span className="block text-xs uppercase text-[#7d9aa0]">Activity</span>
                            <span className="mt-1 block">{DEFAULT_ACTIVITY_ID}</span>
                        </div>
                    </div>
                </header>

                <MemberCardButton allRefresh={refresh}/>

                <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    <div className="rounded-[28px] border border-white/80 bg-white/80 p-5 shadow-[0_20px_55px_rgba(89,78,90,0.12)] backdrop-blur">
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-[#d06b85]">Lucky Wheel</p>
                                <h2 className="text-2xl font-bold text-[#2f2e41]">幸运大转盘</h2>
                            </div>
                            <span className="rounded-full bg-[#fff0b8] px-3 py-1 text-xs font-bold text-[#80621c]">主玩法</span>
                        </div>
                        <div className="flex min-h-[330px] items-center justify-center rounded-3xl border border-[#f4d8df] bg-gradient-to-br from-[#fff8fb] to-[#f3fbff] p-4">
                            <LuckyWheelPage handleRefresh={handleRefresh}/>
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-white/80 bg-white/80 p-5 shadow-[0_20px_55px_rgba(89,78,90,0.12)] backdrop-blur">
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-[#4d9faa]">Lucky Grid</p>
                                <h2 className="text-2xl font-bold text-[#2f2e41]">九宫格抽奖</h2>
                            </div>
                            <span className="rounded-full bg-[#dcf8ee] px-3 py-1 text-xs font-bold text-[#3f7d68]">解锁奖池</span>
                        </div>
                        <div className="flex min-h-[330px] items-center justify-center rounded-3xl border border-[#c8ebf1] bg-gradient-to-br from-[#f4fdff] to-[#fff8f1] p-4">
                            <LuckyGridPage handleRefresh={handleRefresh}/>
                        </div>
                    </div>
                </section>

                <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
                    <div className="rounded-[28px] border border-white/80 bg-white/72 p-5 shadow-[0_20px_55px_rgba(89,78,90,0.1)] backdrop-blur">
                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold text-[#c45d78]">Credit Exchange</p>
                                <h2 className="text-2xl font-bold">积分兑换抽奖次数</h2>
                            </div>
                            <StrategyArmoryButton/>
                        </div>
                        <SkuProductButton handleRefresh={handleRefresh}/>
                    </div>

                    <div className="rounded-[28px] border border-white/80 bg-white/72 p-5 shadow-[0_20px_55px_rgba(89,78,90,0.1)] backdrop-blur">
                        <div className="mb-4">
                            <p className="text-sm font-semibold text-[#8a6fc5]">Guarantee Rules</p>
                            <h2 className="text-2xl font-bold">权重阶梯进度</h2>
                        </div>
                        <StrategyRuleWeightButton refresh={refresh}/>
                    </div>
                </section>

            </div>
        </main>
    );
}
