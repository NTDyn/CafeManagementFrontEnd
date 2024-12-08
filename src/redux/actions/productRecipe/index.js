import { fetchAPIwithParams, postAPI, putAPI } from "../../../api";

export const getInitialData = (productID) => {
    return async dispatch => {
        try {
            const response = await fetchAPIwithParams("/api/ProductRecipe", { id: productID });

            if (response.status !== 200) {
                // Thông báo lỗi nếu API trả về lỗi
                dispatch({ type: "SHOW_ERROR_API", message: response.message });
            } else {
                dispatch({ type: "SET_PRODUCT_RECIPE", data: response.data });
            }
        } catch (error) {
            // Xử lý lỗi khi API không phản hồi hoặc lỗi trong quá trình fetch
            console.error("Error fetching product recipe:", error);
            dispatch({ type: "SHOW_ERROR_API", message: "Lỗi khi lấy dữ liệu sản phẩm." });
        }
    }
};


export const addData = (list) => {

    return async dispatch => {
        list.forEach(element => {
            postAPI("/api/ProductRecipe", element).then(
                response => {
                    if (response.status !== 200) {

                    } else {
                        dispatch({ type: "ADD_BACK_END_PRODUCT_RECIPE", data: element })

                    }

                }
            )
        });

    }
}


export const updateData = (data) => {
    return async dispatch => {
        putAPI("/api/ProductRecipe", data).then(
            response => {
                if (response.status !== 200) {

                } else {
                    dispatch({ type: "UPDATE_BACK_END_PRODUCT_RECIPE", data: data })

                }

            }
        )
    }
}