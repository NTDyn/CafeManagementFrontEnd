import { fetchAPI } from "../../../api";

export const getInitialData = () => {
    return async dispatch => {
        fetchAPI("/api/ProductCategory").then(
            response => {
                if (response.status !== 200) {
                    //dispatch({ type: "SHOW_ERROR_API", message: result.message })
                } else {
                    dispatch({ type: "APPEND_BACK_END_PRODUCT_CATEGORY", data: response.data });
                    console.log(response.data);
                }
            }

        )
    }

}