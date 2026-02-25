import { fetchAPIwithParams, postAPI, putAPI } from "../../../api";

export const getInitialData = (menuID) => {
    return async dispatch => {
        try {
            let url = `/api/MenuDetail`
            if (menuID) {
                url += `?menuId=${menuID}`;
                console.log(menuID)
            }

            const response = await fetchAPIwithParams(url);

            if (response.status !== 200) {
                dispatch({ type: "SHOW_ERROR_API", message: response.message });
            } else {
                console.log(response.data)
                dispatch({ type: "APPEND_BACK_END_MENU_DETAIL", data: response.data });
            }
            return response.data
        } catch (error) {
            console.error("Error fetching product recipe:", error);
            dispatch({ type: "SHOW_ERROR_API", message: "Lỗi khi lấy dữ liệu menu detail." });
        }
    }
};

export const addData = (data) => {
    return async dispatch => {
        try {
            const response = await postAPI("/api/MenuDetail", data);
            if (response.status === 200) {
                dispatch({ type: "ADD_BACK_END_MENU_DETAIL", data: data });
            }
            return response;
        } catch (error) {
            console.error("API call failed", error);
            return { status: 500, message: "API call failed", error };
        }
    };
};


export const updateData = (data) => {
    return async dispatch => {
        putAPI("/api/MenuDetail", data)
            .then(
                response => {
                    if (response.status !== 200) {

                    } else {
                        dispatch({ type: "UPDATE_BACK_END_MENU_DETAIL", data: data });
                        console.log(data);
                    }
                }
            )
            .catch(

                error => console.error("API call failed", error),

            )
    }
}
