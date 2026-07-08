import {activityStrategyArmory} from "@/apis";
import {getActivityParams} from "@/config/activity";

export function StrategyArmory() {
    const strategyArmoryHandle = async () => {
        const {activityId} = getActivityParams();
        if (!activityId){
            window.alert("请在请求地址中，配置 activityId 值，如：http://raffle.yiersan218.click/?userId=yiersan218&activityId=100301")
            return;
        }
        const res = await activityStrategyArmory(activityId);
        const {code, info} = await res.json();
        if (code != "0000") {
            window.alert("抽奖活动策略装配失败 code:" + code + " info:" + info)
            return;
        }

        window.alert("装配完成，开始体验吧!")
    }

    return (
        <button
            className="min-h-[44px] rounded-full bg-[#ffd166] px-5 py-3 text-sm font-bold text-[#5f4817] shadow-[0_10px_24px_rgba(255,209,102,0.28)] transition duration-200 hover:bg-[#ffc94d] active:scale-[0.98]"
            onClick={strategyArmoryHandle}
        >
            活动预热
        </button>
    );
}
