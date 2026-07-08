import {useEffect, useState} from "react";
import {SkuProductResponseDTO} from "@/types/SkuProductResponseDTO";
import {creditPayExchangeSku, querySkuProductListByActivityId} from "@/apis";
import {getActivityParams} from "@/config/activity";

// @ts-ignore
export function SkuProduct({handleRefresh}) {
    const [SkuProductResponseDTOList, setSkuProductResponseDTOList] = useState<SkuProductResponseDTO[]>([]);

    const querySkuProductListByActivityIdHandle = async () => {
        const {activityId} = getActivityParams();
        const result = await querySkuProductListByActivityId(activityId);

        const {code, info, data}: { code: string; info: string; data: SkuProductResponseDTO[] } = await result.json();

        if (code != "0000") {
            window.alert("查询产品列表，接口调用失败 code:" + code + " info:" + info)
            return;
        }
        setSkuProductResponseDTOList(data)
    }

    const creditPayExchangeSkuHandle = async (sku: number) => {
        const {userId} = getActivityParams();
        const result = await creditPayExchangeSku(userId, sku);
        const {code, info}: { code: string; info: string; data: boolean } = await result.json();

        if (code != "0000") {
            window.alert("兑换抽奖次数，接口调用失败 code:" + code + " info:" + info)
            return;
        }

        const timer = setTimeout(() => {
            handleRefresh()
        }, 350);

        return () => clearTimeout(timer);
    }

    useEffect(() => {
        querySkuProductListByActivityIdHandle().then(r => {
        });
    }, [])

    if (SkuProductResponseDTOList.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed border-[#f4d8df] bg-white/58 px-5 py-8 text-center text-sm font-semibold text-[#8a7c8b]">
                暂无可兑换商品
            </div>
        )
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SkuProductResponseDTOList.map((skuProduct, index) => (
                <article
                    key={index}
                    className="rounded-3xl border border-white/80 bg-gradient-to-br from-white to-[#fff8fb] p-4 shadow-[0_14px_34px_rgba(89,78,90,0.1)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(89,78,90,0.14)]"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-[#9a8796]">套餐 {index + 1}</p>
                            <h3 className="mt-2 text-2xl font-bold text-[#2f2e41]">
                                {skuProduct.activityCount.dayCount} 次抽奖
                            </h3>
                        </div>
                        <span className="rounded-full bg-[#dcf8ee] px-3 py-1 text-xs font-bold text-[#3f7d68]">
                            SKU {skuProduct.sku}
                        </span>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3">
                        <span className="rounded-full bg-[#fff0b8] px-4 py-2 text-base font-bold text-[#80621c]">
                            {skuProduct.productAmount} 积分
                        </span>
                        <button
                            onClick={() => creditPayExchangeSkuHandle(skuProduct.sku)}
                            className="min-h-[44px] rounded-full bg-[#8bd3dd] px-5 py-2 text-sm font-bold text-[#244d55] transition duration-200 hover:bg-[#79c7d2] active:scale-[0.98]"
                        >
                            兑换次数
                        </button>
                    </div>
                </article>
            ))}
        </div>
    )
}
