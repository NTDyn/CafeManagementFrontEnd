import { fetchAPI, postAPI, putAPI } from "../../../api";

export const getInitialData = () => {
    return async dispatch => {
        fetchAPI("/api/BatchRecipe").then(
            response => {

                if (response.status !== 200) {

                } else {
                    dispatch({ type: "APPEND_BACK_END_BATCH", data: response.data })
                }
            }
        )
    }
}

export const addData = (data) => {
    return async dispatch => {
        postAPI("/api/BatchRecipe", data).then(
            response => {
                if (response.status !== 200) {
                } else {
                    dispatch({ type: "ADD_BACK_END_BATCH", data: response.data })
                }

            }
        )
    }
}
