import { queryRaffleStrategyRuleWeight } from "@/apis";
import { useEffect, useState } from "react";
import { StrategyAward, StrategyRuleWeightVO } from "@/types/StrategyRuleWeightVO";
import { getActivityParams } from "@/config/activity";

// @ts-ignore
export function StrategyRuleWeight({ refresh }) {

    const [strategyRuleWeightVOList, setStrategyRuleWeightVOList] = useState<StrategyRuleWeightVO[]>([]);

    const queryRaffleStrategyRuleWeightHandle = async () => {
        const { userId, activityId } = getActivityParams();
        const result = await queryRaffleStrategyRuleWeight(userId, activityId);
        const { code, info, data }: { code: string; info: string; data: StrategyRuleWeightVO[] } = await result.json();

        if (code != "0000") {
            window.alert("查询活动账户额度，接口调用失败 code:" + code + " info:" + info)
            return;
        }

        data.sort((a, b) => a.ruleWeightCount - b.ruleWeightCount);
        setStrategyRuleWeightVOList(data)
    }

    const ProgressBar = ({
        index,
        total,
        completed,
        awards,
    }: {
        index: number;
        total: number;
        completed: number;
        awards: StrategyAward[];
    }) => {
        const percentage = Math.min((completed / total) * 100, 100);
        const colors = [
            "from-[#ff8fab] to-[#ffc2d1]",
            "from-[#8bd3dd] to-[#bdeff4]",
            "from-[#ffd166] to-[#ffe6a7]",
        ];

        return (
            <article className="rounded-3xl border border-white/80 bg-white/72 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-[#2f2e41]">阶梯 {index + 1}</span>
                    <span className="rounded-full bg-[#f7f0ff] px-3 py-1 text-xs font-bold text-[#7a5ca8]">
                        {completed > total ? total : completed}/{total}
                    </span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#efe8ef]">
                    <div
                        className={`h-full rounded-full bg-gradient-to-r ${colors[index % colors.length]} transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                {awards && awards.length > 0 && (
                    <div className="mt-4">
                        <p className="text-xs font-bold uppercase text-[#9a8796]">必中奖品范围</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {awards.map((award, idx) => (
                                <span
                                    key={award.awardId}
                                    className="rounded-full border border-[#f4d8df] bg-[#fff8fb] px-3 py-1 text-xs font-semibold text-[#6b6270]"
                                >
                                    {idx + 1}. {award.awardTitle}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        );
    };

    useEffect(() => {
        queryRaffleStrategyRuleWeightHandle().then(r => {
        });
    }, [refresh])

    if (strategyRuleWeightVOList.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed border-[#d9cbea] bg-white/58 px-4 py-8 text-center text-sm font-semibold text-[#8a7c8b]">
                暂无权重阶梯数据
            </div>
        )
    }

    return (
        <div className="grid gap-3">
            {strategyRuleWeightVOList.map((ruleWeight, index) => (
                <ProgressBar
                    key={index}
                    index={index}
                    total={ruleWeight.ruleWeightCount}
                    completed={ruleWeight.userActivityAccountTotalUseCount}
                    awards={ruleWeight.strategyAwards}
                />
            ))}
        </div>
    )
}
