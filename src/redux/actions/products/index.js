import { fetchAPI, fetchAPIwithParams, postAPI, putAPI } from "../../../api";
import { addData as addRecipe } from "../productRecipe";


export const getInitialData = (value) => {
    return async dispatch => {
        let url = "/api/Product";
        if (value)
            url += "?id=" + value;

        await fetchAPI(url).then(
            response => {
                if (response.status !== 200) {
                    //dispatch({ type: "SHOW_ERROR_API", message: result.message })
                } else {
                    dispatch({ type: "APPEND_BACK_END_PRODUCT", data: response.data })
                }
            }
        )
    }
}

export const getProductsByCategory = (value) => {
    return async dispatch => {
        let url = "/api/Product";
        if (value)
            url += "?category=" + value;

        await fetchAPI(url).then(
            response => {
                if (response.status !== 200) {
                    //dispatch({ type: "SHOW_ERROR_API", message: result.message })
                } else {
                    dispatch({ type: "APPEND_BACK_END_PRODUCT_BY_CATEGORY", data: response.data })
                }
            }
        )
    }
}
export const searchProductData = (search, page, pageSize) => {
    return async dispatch => {
        try {
            // Tạo URL với các tham số phù hợp
            let url = `/api/Product/search?page=${page}&pageSize=${pageSize}`;

            if (search) {
                url += `&search=${encodeURIComponent(search)}`;
            }

            const response = await fetchAPI(url);

            if (response.status !== 200) {
                //  console.error("API Error:", response.message);
            } else {
                dispatch({ type: "APPEND_BACK_END_PRODUCT", data: response.data });
                return response.data;
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };
}

export const addData = (data) => {
    return async dispatch => {
        postAPI("/api/Product", data).then(
            response => {
                if (response.status !== 200) {

                } else {
                    dispatch({ type: "ADD_BACK_END_PRODUCT", data: data })

                }

            }
        )
    }
}


export const updateData = (data) => {
    return async dispatch => {
        putAPI("/api/Product", data).then(
            response => {
                if (response.status !== 200) {

                } else {
                    dispatch({ type: "UPDATE_BACK_END_PRODUCT", data: response.data })

                }

            }
        )
    }
}

export const getProductChoice = (value) => {
    return async dispatch => {
        let url = "/api/Product/productChoices";
        if (value)
            url += "?productID=" + value;

        try {
            const response = await fetchAPI(url);
            if (response.status !== 200) {
                // Có thể dispatch lỗi nếu muốn
                return null;
            } else {
                dispatch({ type: "APPEND_BACK_END_PRODUCT_CHOICES", data: response.data });
                return response.data; // <- TRẢ VỀ DỮ LIỆU ở đây
            }
        } catch (err) {
            console.error("Error fetching product choices:", err);
            return null;
        }
    };
}




