export interface StrategyRuleWeightVO {
    ruleWeightCount: number;
    userActivityAccountTotalUseCount: number;
    strategyAwards: StrategyAward[];
}

export interface StrategyAward {
    // 奖品ID
    awardId: number;
    // 奖品标题
    awardTitle: string;
}