"use client"

import React, {useEffect, useRef, useState} from 'react'
// @ts-ignore
import {LuckyWheel} from '@lucky-canvas/react'

import {queryRaffleAwardList, draw} from '@/apis'
import {RaffleAwardVO} from "@/types/RaffleAwardVO";
import {getActivityParams} from "@/config/activity";

const wheelPalette = ['#fff7fb', '#f3fcff', '#fff8de', '#f7f0ff'];

const formatWheelLabel = (title: string) => {
    const normalizedTitle = title.replace(/\s/g, "");

    if (normalizedTitle.includes("OpenAI")) return "AI会员";
    if (normalizedTitle.includes("小米手机")) return "手机";
    if (normalizedTitle.includes("随机积分")) return "积分";
    if (normalizedTitle.includes("暴走玩偶")) return "玩偶";
    if (normalizedTitle.includes("支付")) return "支付券";
    if (normalizedTitle.includes("优惠券")) return "优惠券";

    const compactTitle = normalizedTitle
        .replace(/兑换/g, "")
        .replace(/奖品/g, "")
        .replace(/机会/g, "");

    return compactTitle.length > 4 ? compactTitle.slice(0, 4) : compactTitle;
};

// @ts-ignore
export function LuckyWheelPage({handleRefresh}) {
    const [prizes, setPrizes] = useState([{}])
    const myLucky = useRef<any>(null)

    const [blocks] = useState([
        {padding: '10px', background: '#fff8fb'},
        {padding: '7px', background: '#ffc7d5'},
        {padding: '5px', background: '#fff6d7'}
    ])

    const [buttons] = useState([
        {radius: '34%', background: '#ff8fab'},
        {radius: '28%', background: '#fff5bf'},
        {
            radius: '23%', background: '#8bd3dd',
            pointer: true,
            fonts: [{
                text: '开始',
                top: '-9px',
                fontSize: '16px',
                fontWeight: '700',
                fontColor: '#2f2e41'
            }]
        }
    ])

    const [defaultConfig] = useState({
        gutter: '2px',
        speed: 16,
        accelerationTime: 1800,
        decelerationTime: 2200
    })

    const [defaultStyle] = useState({
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: '700',
        fontColor: '#3f3945',
        wordWrap: false
    })

    // 查询奖品列表
    const queryRaffleAwardListHandle = async () => {
        const {userId, activityId} = getActivityParams();
        const result = await queryRaffleAwardList(userId, activityId);
        const {code, info, data} = await result.json();
        if (code != "0000") {
            window.alert("获取抽奖奖品列表失败 code:" + code + " info:" + info)
            return;
        }

        // 创建一个新的奖品数组
        const prizes = data.map((award: RaffleAwardVO, index: number) => {
            const background = wheelPalette[index % wheelPalette.length];
            return {
                background: background,
                fullTitle: award.awardTitle,
                fonts: [{
                    id: award.awardId,
                    text: formatWheelLabel(award.awardTitle),
                    top: '25px',
                    lengthLimit: '62%'
                }]
            };
        });

        // 设置奖品数据
        setPrizes(prizes)
    }

    // 调用随机抽奖
    const randomRaffleHandle = async () => {
        const {userId, activityId} = getActivityParams();
        const result = await draw(userId, activityId);
        const {code, info, data} = await result.json();
        if (code != "0000") {
            window.alert("随机抽奖失败 code:" + code + " info:" + info)
            return;
        }
        // 为了方便测试，mock 的接口直接返回 awardIndex 也就是奖品列表中第几个奖品。
        return data.awardIndex - 1;
    }

    useEffect(() => {
        queryRaffleAwardListHandle().then(r => {
        });
    }, [])

    return <div className="rounded-full border border-white/80 bg-white/80 p-2 shadow-inner">
        <LuckyWheel
            ref={myLucky}
            width="300px"
            height="300px"
            blocks={blocks}
            prizes={prizes}
            buttons={buttons}
            defaultConfig={defaultConfig}
            defaultStyle={defaultStyle}
            onStart={() => {
                // @ts-ignore
                myLucky.current.play()
                setTimeout(() => {
                    // 抽奖接口
                    randomRaffleHandle().then(prizeIndex => {
                            // @ts-ignore
                            myLucky.current.stop(prizeIndex);

                            const timer = setTimeout(() => {
                                handleRefresh()
                            }, 550);

                            // 清除定时器，以防组件在执行前被卸载
                            return () => clearTimeout(timer);
                        }
                    );

                }, 2500)
            }}
            onEnd={
                // @ts-ignore
                prize => {
                    alert('恭喜你抽到【' + (prize.fullTitle || prize.fonts[0].text) + '】奖品ID【' + prize.fonts[0].id + '】')
                }
            }
        />
    </div>
}
