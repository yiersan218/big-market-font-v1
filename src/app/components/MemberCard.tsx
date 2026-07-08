import { calendarSignRebate, isCalendarSignRebate, queryUserActivityAccount, queryUserCreditAccount } from "@/apis";
import React, { useEffect, useState } from "react";
import { UserActivityAccountVO } from "@/types/UserActivityAccountVO";
import { getActivityParams } from "@/config/activity";

interface MemberCardProps {
    allRefresh: number;
}

export function MemberCard({ allRefresh }: MemberCardProps) {
    const [refresh, setRefresh] = useState(0);
    const [dayCount, setDayCount] = useState(0);
    const [creditAmount, setCreditAmount] = useState(0);
    const [sign, setSign] = useState(false);
    const [userId, setUserId] = useState("");

    const getParams = async () => {
        setUserId(getActivityParams().userId);
    };

    const handleRefresh = () => {
        setRefresh(prev => prev + 1);
    };

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}年${(`0${currentDate.getMonth() + 1}`).slice(-2)}月${(`0${currentDate.getDate()}`).slice(-2)}日`;

    const queryUserActivityAccountHandle = async () => {
        const { userId, activityId } = getActivityParams();
        if (!userId || !activityId) return;
        try {
            const result = await queryUserActivityAccount(userId, activityId);
            const { code, info, data }: { code: string; info: string; data: UserActivityAccountVO } = await result.json();
            if (code !== "0000") {
                window.alert(`查询活动账户额度失败，code: ${code} info: ${info}`);
                return;
            }
            setDayCount(data.totalCountSurplus || 0);
        } catch (err) {
            console.error("查询活动账户异常", err);
        }
    };

    const queryUserCreditAccountHandle = async () => {
        const { userId } = getActivityParams();
        if (!userId) return;
        try {
            const result = await queryUserCreditAccount(userId);
            const { code, info, data }: { code: string; info: string; data: number } = await result.json();
            if (code !== "0000") {
                window.alert(`查询积分账户失败，code: ${code} info: ${info}`);
                return;
            }
            setCreditAmount(data || 0);
        } catch (err) {
            console.error("查询积分账户异常", err);
        }
    };

    const calendarSignRebateHandle = async () => {
        if (sign) {
            window.alert("今日已签到！");
            return;
        }
        const { userId } = getActivityParams();
        if (!userId) return;
        try {
            const result = await calendarSignRebate(userId);
            const { code, info }: { code: string; info: string; } = await result.json();
            if (code !== "0000" && code !== "0003") {
                window.alert(`签到失败，code: ${code} info: ${info}`);
                return;
            }
            setSign(true);
            setTimeout(() => handleRefresh(), 550);
        } catch (err) {
            console.error("签到异常", err);
        }
    };

    const isCalendarSignRebateHandle = async () => {
        const { userId } = getActivityParams();
        if (!userId) return;
        try {
            const result = await isCalendarSignRebate(userId);
            const { code, info, data }: { code: string; info: string; data: boolean } = await result.json();
            if (code !== "0000") {
                window.alert(`查询签到状态失败，code: ${code} info: ${info}`);
                return;
            }
            setSign(!!data);
        } catch (err) {
            console.error("查询签到状态异常", err);
        }
    };

    useEffect(() => {
        getParams();
        queryUserActivityAccountHandle();
        queryUserCreditAccountHandle();
        isCalendarSignRebateHandle();
    }, [refresh, allRefresh]);

    return (
        <section className="overflow-hidden rounded-[28px] border border-white/80 bg-white/78 shadow-[0_20px_55px_rgba(89,78,90,0.12)] backdrop-blur">
            <div className="grid gap-5 p-5 md:grid-cols-[1.1fr_1fr] md:p-6">
                <div className="rounded-3xl border border-[#f4d8df] bg-gradient-to-br from-[#fff3f7] via-[#fffaf0] to-[#f3fbff] p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-[#c45d78]">Member Wallet</p>
                            <h2 className="mt-1 text-2xl font-bold text-[#2f2e41]">营销会员卡</h2>
                        </div>
                        <span className="max-w-full rounded-full border border-white/90 bg-white/70 px-4 py-2 text-sm font-bold text-[#615463] shadow-sm">
                            id: {userId || "unknown"}
                        </span>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/80 bg-white/72 p-4 shadow-sm">
                            <span className="text-sm font-semibold text-[#8c7d8c]">我的积分</span>
                            <strong className="mt-2 block text-3xl font-bold text-[#2f2e41]">
                                {creditAmount ? creditAmount.toFixed(2) : "0.00"}
                            </strong>
                            <span className="mt-1 block text-xs font-semibold text-[#b27780]">可用于兑换抽奖次数</span>
                        </div>
                        <div className="rounded-2xl border border-white/80 bg-white/72 p-4 shadow-sm">
                            <span className="text-sm font-semibold text-[#8c7d8c]">剩余抽奖次数</span>
                            <strong className="mt-2 block text-3xl font-bold text-[#2f2e41]">{dayCount || 0}</strong>
                            <span className="mt-1 block text-xs font-semibold text-[#5b96a0]">兑换或签到后自动刷新</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#c8ebf1] bg-[#f4fdff]/78 p-5">
                    <div>
                        <p className="text-sm font-semibold text-[#4d9faa]">Daily Check-in</p>
                        <h3 className="mt-1 text-xl font-bold text-[#2f2e41]">{formattedDate}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#6b6270]">
                            签到后可获得活动返利，抽奖次数与积分会同步刷新。
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            onClick={calendarSignRebateHandle}
                            className="min-h-[44px] flex-1 rounded-full bg-[#ff8fab] px-5 py-3 text-base font-bold text-white shadow-[0_12px_24px_rgba(255,143,171,0.28)] transition duration-200 hover:bg-[#f47f9d] active:scale-[0.98]"
                        >
                            {sign ? "今日已签" : "立即签到"}
                        </button>
                        <button
                            onClick={handleRefresh}
                            className="min-h-[44px] flex-1 rounded-full border border-[#f4d8df] bg-white px-5 py-3 text-base font-bold text-[#4f4654] transition duration-200 hover:border-[#ffb3c5] hover:bg-[#fff8fb] active:scale-[0.98]"
                        >
                            刷新资产
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
