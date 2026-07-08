import {queryUserActivityAccount} from "@/apis";
import React, {useEffect, useState} from "react";
import {UserActivityAccountVO} from "@/types/UserActivityAccountVO";
import {getActivityParams} from "@/config/activity";

// @ts-ignore
export function ActivityAccount({refresh}) {
    const [dayCount, setDayCount] = useState(0)
    const [monthCount, setMonthCount] = useState(0)

    const queryUserActivityAccountHandle = async () => {
        const {userId, activityId} = getActivityParams();
        // 查询账户数据
        const result = await queryUserActivityAccount(userId, activityId);
        const {code, info, data}: { code: string; info: string; data: UserActivityAccountVO } = await result.json();

        if (code != "0000") {
            window.alert("查询活动账户额度，接口调用失败 code:" + code + " info:" + info)
            return;
        }

        // 日可抽奖额度
        setDayCount(data.dayCountSurplus)
        // 月可抽奖额度
        setMonthCount(data.monthCountSurplus)
    }

    useEffect(() => {
        queryUserActivityAccountHandle().then(r => {
        });
    }, [refresh])

    return (
        <>
            <div
                className="px-8 py-3 mb-6 text-xl font-bold text-white bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
                style={{cursor: "pointer"}}
            >
                今日可抽奖 {dayCount} 次 | 本月可抽奖 {monthCount} 次
            </div>
        </>
    )

}
