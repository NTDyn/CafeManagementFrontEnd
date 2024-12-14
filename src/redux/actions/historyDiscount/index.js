import { fetchAPIwithParams, postAPI, putAPI } from "../../../api";

export const getInitialData = (cusID) => {
    return async dispatch => {
        try {
            const response = await fetchAPIwithParams("/api/HistoryDiscount", { Customer_ID: cusID });

            if (response.status !== 200) {
                dispatch({ type: "SHOW_ERROR_API", message: response.message });
            } else {
                console.log(cusID)
                console.log(response.data)
                dispatch({ type: "APPEND_BACK_END_HISTORY_DISCOUNT", data: response.data });
            }
        } catch (error) {
            console.error("Error fetching historyDiscount:", error);
            dispatch({ type: "SHOW_ERROR_API", message: "Lỗi khi lấy dữ liệu HistoryDiscount." });
        }
    }
};