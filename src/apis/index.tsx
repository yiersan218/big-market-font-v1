// 请求地址
const apiHostUrl = process.env.API_HOST_URL ? process.env.API_HOST_URL : "https://console-mock.apipost.cn/mock/6afa907d-6678-45e2-b867-032a11090abd";

/**
 * 装配抽奖
 * @param activityId
 */
export const activityStrategyArmory = (activityId?: number) => {
    return fetch(`${apiHostUrl}/api/v1/raffle/activity/armory?activityId=${activityId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/**
 * 查询抽奖奖品列表
 * @param userId 用户ID
 * @param activityId 用户ID
 */
export const queryRaffleAwardList = (userId?: string, activityId?: number) => {
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/strategy/query_raffle_award_list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                activityId: activityId
            })
        });
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

/**
 * 抽奖接口
 * @param userId 用户ID
 * @param activityId 用户ID
 */
export const draw = (userId?: string, activityId?: number) => {
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/activity/draw`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                userId: userId,
                activityId: activityId
            })
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

/**
 * 查询账户额度
 * @param userId        用户ID
 * @param activityId    活动ID
 */
export const queryUserActivityAccount = (userId?: string, activityId?: number) => {
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/activity/query_user_activity_account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                userId: userId,
                activityId: activityId
            })
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

/**
 * 日历签到返利接口
 * @param userId
 */
export const calendarSignRebate = (userId?: string) => {
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/activity/calendar_sign_rebate?userId=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

/**
 * 判断是否签到接口
 * @param userId
 */
export const isCalendarSignRebate = (userId?: string) => {
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/activity/is_calendar_sign_rebate?userId=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

/**
 * 查询权重规则
 * @param userId        用户ID
 * @param activityId    活动ID
 */
export const queryRaffleStrategyRuleWeight = (userId?: string, activityId?: number) => {
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/strategy/query_raffle_strategy_rule_weight`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                userId: userId,
                activityId: activityId
            })
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

export const queryUserCreditAccount = (userId?: string)=>{
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/activity/query_user_credit_account?userId=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

export const querySkuProductListByActivityId = (activityId?: number)=>{
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/activity/query_sku_product_list_by_activity_id?activityId=${activityId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}

export const creditPayExchangeSku = (userId?: string, sku?: number) => {
    try {
        return fetch(`${apiHostUrl}/api/v1/raffle/activity/credit_pay_exchange_sku`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                userId: userId,
                sku: sku
            })
        })
    } catch (error) {
        return fetch("{\n" +
            "    \"code\": \"0001\",\n" +
            "    \"info\": \"调用失败\",\n" +
            "    \"data\": [\n" +
            "}");
    }
}



