import { fetchAPI, postAPI, putAPI } from "../../../api";

export const getInitialData = () => {
    return async dispatch => {
        fetchAPI("/api/CustomerLevel").then(
            response => {

                if (response.status !== 200) {
                    //dispatch({ type: "SHOW_ERROR_API", message: result.message })
                } else {
                    dispatch({ type: "APPEND_BACK_END_CUSTOMER_LEVEL", data: response.data })
                }
            }
        )
    }
}

export const addData = (data) => {
    return async dispatch => {
        postAPI("/api/CustomerLevel", data).then(
            response => {
                if (response.status !== 200) {
                } else {
                    console.log(response.data)
                    dispatch({ type: "ADD_BACK_END_CUSTOMER_LEVEL", data: response.data })

                }

            }
        )
    }
}


export const updateData = (data) => {

    return async dispatch => {
        putAPI("/api/CustomerLevel", data).then(
            response => {

                if (response.status !== 200) {

                } else {
                    console.log(response)
                    dispatch({ type: "UPDATE_BACK_END_CUSTOMER_LEVEL", data: response.data })

                }

            }
        )
    }
}