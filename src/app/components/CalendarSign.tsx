import {calendarSignRebate, isCalendarSignRebate} from "@/apis";
import React, {useEffect, useState} from "react";
import {getActivityParams} from "@/config/activity";

// @ts-ignore
export function CalendarSign({handleRefresh}) {

    const [sign, setSign] = useState(false);

    const calendarSignRebateHandle = async () => {
        if (sign){
            window.alert("今日已签到！")
            return;
        }
        const {userId} = getActivityParams();
        const result = await calendarSignRebate(userId);
        const {code, info}: { code: string; info: string; } = await result.json();

        if (code != "0000" && code != "0003") {
            window.alert("日历签到返利接口，接口调用失败 code:" + code + " info:" + info)
            return;
        }

        setSign(true);

        // 设置一个3秒后执行的定时器
        const timer = setTimeout(() => {
            handleRefresh()
        }, 150);

        // 清除定时器，以防组件在执行前被卸载
        return () => clearTimeout(timer);
    }

    const isCalendarSignRebateHandle = async () => {

        const {userId} = getActivityParams();
        const result = await isCalendarSignRebate(userId);
        const {code, info, data}: { code: string; info: string; data: boolean } = await result.json();

        if (code != "0000") {
            window.alert("判断是否签到接口，接口调用失败 code:" + code + " info:" + info)
            return;
        }

        setSign(data);
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (`0${currentDate.getMonth() + 1}`).slice(-2); // 月份是从0开始的
    const day = (`0${currentDate.getDate()}`).slice(-2);

    const formattedDate = `${year}-${month}-${day}`;

    useEffect(() => {
        isCalendarSignRebateHandle().then(r => {
        });
    }, [])

    return (
        <>
            <div
                className="px-6 py-2 mb-8 text-white bg-green-600 rounded-full shadow-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                style={{cursor: "pointer"}}
                onClick={calendarSignRebateHandle}
            >
                {sign ? "今日已签到" : "点击签到「获得抽奖次数」"}
            </div>
        </>
    )

}
