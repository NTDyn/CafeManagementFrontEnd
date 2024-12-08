import { Warehouse } from "@mui/icons-material";
import { fetchAPI, postAPI, putAPI } from "../../../api";

export const getInitialData = () => {
    return async dispatch => {
        fetchAPI("/api/Warehouse").then(
            response => {
                if (response.status !== 200) {
                    //dispatch({ type: "SHOW_ERROR_API", message: result.message })
                } else {
                    dispatch({ type: "APPEND_BACK_END_WAREHOUSE", data: response.data })

                }
            }
        )
    }
}

export const addData = (data) => {
    return async dispatch => {
        postAPI("/api/Warehouse", data)
            .then(
                response => {

                    if (response.status !== 200) {
                        //   dispatch({ type: "SHOW_ERROR_API", message: result.message })
                    } else {
                        dispatch({ type: "ADD_BACK_END_WAREHOUSE", data: data });
                    }
                }
            )
            .catch(

                error => console.error("API call failed", error),

            )
    }
}

export const updateData = (data) => {
    return async dispatch => {
        putAPI("/api/Warehouse", data)
            .then(
                response => {
                    if (response.status !== 200) {

                    } else {
                        dispatch({ type: "UPDATE_BACK_END_WAREHOUSE", data: data });
                    }
                }
            )
            .catch(

                error => console.error("API call failed", error),

            )
    }
}
