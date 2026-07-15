export const DEFAULT_USER_ID = "yiersan218";
export const DEFAULT_ACTIVITY_ID = 100301;

export function getActivityParams() {
    if (typeof window === "undefined") {
        return {
            userId: DEFAULT_USER_ID,
            activityId: DEFAULT_ACTIVITY_ID,
        };
    }

    const queryParams = new URLSearchParams(window.location.search);
    const activityId = Number(queryParams.get("activityId"));

    return {
        userId: queryParams.get("userId") || DEFAULT_USER_ID,
        activityId: Number.isFinite(activityId) && activityId > 0 ? activityId : DEFAULT_ACTIVITY_ID,
    };
}
