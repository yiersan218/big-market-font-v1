export interface SkuProductResponseDTO {
    /**
     * 商品sku
     */
    sku: number;
    /**
     * 活动ID
     */
    activityId: number;
    /**
     * 活动个人参与次数ID
     */
    activityCountId: number;
    /**
     * 库存总量
     */
    stockCount: number;
    /**
     * 剩余库存
     */
    stockCountSurplus: number;
    /**
     * 商品金额【积分】
     */
    productAmount: number; // TypeScript 中没有 BigDecimal 类型，通常使用 number

    /**
     * 活动商品数量
     */
    activityCount: SkuProductResponseDTO.ActivityCount;
}

namespace SkuProductResponseDTO {
    export interface ActivityCount {
        /**
         * 总次数
         */
        totalCount: number;

        /**
         * 日次数
         */
        dayCount: number;

        /**
         * 月次数
         */
        monthCount: number;
    }
}
