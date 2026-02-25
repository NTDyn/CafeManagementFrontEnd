import { fetchAPI, postAPI, putAPI } from "../../../api";



export const getInitialData = (value) => {
    return async dispatch => {
        var url = "/api/Receipt";
        if (value?.receipt_ID != undefined) {
            url += `?Receipt_ID=${value.receipt_ID}`;
        }
        if (value?.customer_ID != null && value?.receipt_ID == null) {
            console.log('h')
            url += `?Customer_ID=${value.customer_ID}`;
        }

        await fetchAPI(url).then(
            response => {
                if (response.status !== 200) {
                    //dispatch({ type: "SHOW_ERROR_API", message: result.message })
                } else {
                    dispatch({ type: "APPEND_BACK_END_RECEIPT", data: response.data })
                }
            }
        )
    }
}



export const addData = (data) => {
    return async dispatch => {
        postAPI("/api/Receipt", data).then(
            response => {
                if (response.status !== 200) {

                } else {
                    dispatch({ type: "ADD_BACK_END_RECEIPT", data: data })
                    return response;
                }

            }
        )
    }
}


export const updateData = (data) => {
    return async dispatch => {
        putAPI("/api/Receipt", data).then(
            response => {
                if (response.status !== 200) {

                } else {
                    dispatch({ type: "UPDATE_BACK_END_RECEIPT", data: response.data })

                }

            }
        )
    }
}