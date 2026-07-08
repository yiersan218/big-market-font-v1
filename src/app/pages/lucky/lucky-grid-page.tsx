"use client"

import React, {useState, useRef, useEffect} from 'react'
// @ts-ignore
import {LuckyGrid} from '@lucky-canvas/react'
import {draw, queryRaffleAwardList} from "@/apis";
import {RaffleAwardVO} from "@/types/RaffleAwardVO";
import {getActivityParams} from "@/config/activity";

const prizeImageStyle = {width: "68px", height: "68px", top: "7px"};

const prizeFontStyle = {
    top: '78%',
    fontSize: '12px',
    fontWeight: '800',
    fontColor: '#2f2e41',
    lengthLimit: '88%',
    lineClamp: 1,
    wordWrap: false
};

const buildPrizeImage = (src: string) => [{src, ...prizeImageStyle}];
const buildPrizeFont = (text: string) => [{text, ...prizeFontStyle}];

/**
 * 大转盘文档：https://100px.net/docs/grid.html
 * @constructor
 */
// @ts-ignore
export function LuckyGridPage({handleRefresh}) {
    const [prizes, setPrizes] = useState([{}])
    const myLucky = useRef<any>(null)

    const queryRaffleAwardListHandle = async () => {
        const {userId, activityId} = getActivityParams();
        const result = await queryRaffleAwardList(userId, activityId);
        const {code, info, data}: { code: string; info: string; data: RaffleAwardVO[] } = await result.json();

        if (code != "0000") {
            window.alert("获取抽奖奖品列表失败 code:" + code + " info:" + info)
            return;
        }

        // 创建一个新的奖品数组
        const prizes = [
            {
                x: 0,
                y: 0,
                fonts: buildPrizeFont(data[0].awardTitle),
                imgs: buildPrizeImage("/raffle-award-00.png")
            },
            {
                x: 1,
                y: 0,
                fonts: buildPrizeFont(data[1].awardTitle),
                imgs: buildPrizeImage("/raffle-award-01.png")
            },
            {
                x: 2,
                y: 0,
                fonts: buildPrizeFont(data[2].awardTitle),
                imgs: buildPrizeImage("/raffle-award-02.png")
            },
            {
                x: 2,
                y: 1,
                fonts: buildPrizeFont(data[3].awardTitle),
                imgs: buildPrizeImage("/raffle-award-12.png")
            },
            {
                x: 2,
                y: 2,
                fonts: buildPrizeFont(data[4].isAwardUnlock ? data[4].awardTitle : '再抽奖' + data[4].waitUnLockCount + '次解锁'),
                imgs: buildPrizeImage(data[4].isAwardUnlock ? "/raffle-award-22.png" : "/raffle-award-22-lock.png")
            },
            {
                x: 1,
                y: 2,
                fonts: buildPrizeFont(data[5].isAwardUnlock ? data[5].awardTitle : '再抽奖' + data[5].waitUnLockCount + '次解锁'),
                imgs: buildPrizeImage(data[5].isAwardUnlock ? "/raffle-award-21.png" : "/raffle-award-21-lock.png")
            },
            {
                x: 0,
                y: 2,
                fonts: buildPrizeFont(data[6].isAwardUnlock ? data[6].awardTitle : '再抽奖' + data[6].waitUnLockCount + '次解锁'),
                imgs: buildPrizeImage(data[6].isAwardUnlock ? "/raffle-award-20.png" : "/raffle-award-20-lock.png")
            },
            {
                x: 0,
                y: 1,
                fonts: buildPrizeFont(data[7].awardTitle),
                imgs: buildPrizeImage("/raffle-award-10.png")
            },
        ]

        // 设置奖品数据
        setPrizes(prizes)

    }

    const randomRaffleHandle = async () => {
        const {userId, activityId} = getActivityParams();

        let result = await draw(userId, activityId);
        const {code, info, data} = await result.json();
        if (code != "0000") {
            window.alert("随机抽奖失败 code:" + code + " info:" + info)
            return;
        }

        handleRefresh()

        // 为了方便测试，mock 的接口直接返回 awardIndex 也就是奖品列表中第几个奖品。
        return data.awardIndex - 1;
    }

    const [buttons] = useState([
        {
            x: 1,
            y: 1,
            background: "#ff8fab",
            borderRadius: "20px",
            shadow: '0 8 14 #f4a8b8',
            imgs: [{src: "/raffle-button.png", width: "100px", height: "100px", top: "0px"}]
        }
    ])

    const [defaultStyle] = useState({
        background: "#fff8fb",
        borderRadius: "18px",
        fontColor: "#2f2e41",
        fontSize: "12px",
        fontWeight: "800",
        wordWrap: false
    })

    const [activeStyle] = useState({
        background: "#fff0b8",
        borderRadius: "18px"
    })

    useEffect(() => {
        queryRaffleAwardListHandle().then(r => {
        });
    }, [])

    return <div className="rounded-[28px] bg-white/64 p-3 shadow-inner">
        <LuckyGrid
            ref={myLucky}
            width="300px"
            height="300px"
            rows="3"
            cols="3"
            prizes={prizes}
            defaultStyle={defaultStyle}
            activeStyle={activeStyle}
            buttons={buttons}
            onStart={() => { // 点击抽奖按钮会触发star回调
                // @ts-ignore
                myLucky.current.play()
                setTimeout(() => {
                    // 抽奖接口
                    randomRaffleHandle().then(prizeIndex => {
                            // @ts-ignore
                            myLucky.current.stop(prizeIndex);
                        }
                    );
                }, 2500)
            }}
            onEnd={
                // @ts-ignore
                prize => {
                    // 加载数据
                    queryRaffleAwardListHandle().then(r => {
                    });
                    // 展示奖品
                    alert('恭喜抽中奖品【' + prize.fonts[0].text + '】')
                }
            }>

        </LuckyGrid>
    </div>

}
