import { fetchAPI, postAPI, putAPI } from "../../../api";

export const getInitialData = () => {
    return async dispatch => {
        fetchAPI("/api/Customer").then(
            response => {

                if (response.status !== 200) {
                    //dispatch({ type: "SHOW_ERROR_API", message: result.message })
                } else {
                    dispatch({ type: "APPEND_BACK_END_CUSTOMER", data: response.data })
                }
            }
        )
    }
}

export const addData = (data) => {
    return async dispatch => {
        postAPI("/api/Customer", data).then(
            response => {
                if (response.status !== 200) {
                } else {
                    dispatch({ type: "ADD_BACK_END_CUSTOMER", data: data })

                }

            }
        )
    }
}


export const updateData = (data) => {
    console.log(data)
    return async dispatch => {
        putAPI("/api/Customer", data).then(
            response => {
                if (response.status !== 200) {

                } else {
                    dispatch({ type: "UPDATE_BACK_END_CUSTOMER", data: response.data })

                }

            }
        )
    }
}