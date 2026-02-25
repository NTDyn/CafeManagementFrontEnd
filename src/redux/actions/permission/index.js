import { fetchAPI, postAPI, putAPI } from "../../../api";

export const getInitialData = () => {
    return async dispatch => {
        fetchAPI("/api/Permission").then(
            response => {

                if (response.status !== 200) {
                    //dispatch({ type: "SHOW_ERROR_API", message: result.message })
                } else {
                    console.log(response)
                    dispatch({ type: "APPEND_BACK_END_PERMISSION", data: response.data })
                }
            }
        )
    }
}
