import { fetchAPI, postAPI, putAPI } from "../../../api";

export const getInitialData = () => {
    return async dispatch => {
        fetchAPI("/api/StoreIngedient").then(
            response => {

                if (response.status !== 200) {

                } else {
                    dispatch({ type: "APPEND_BACK_END_STORE", data: response.data })
                }
            }
        )
    }
}
