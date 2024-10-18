import { fetchAPI } from "../../../api";

export const getInitialData = () => {
    return async dispatch => {
        // await Promise.all([

        // ]).then(
        //     response => {
        //         let i = 0;
        //         let types = ["APPEND_BACK_END_PRODUCT"]
        //         for (const result of response) {
        //             if (result.status !== 200) {
        //                 dispatch({ type: "SHOW_ERROR_API", message: result.message })
        //             } else {
        //                 dispatch({ type: types[i], data: result.data })
        //             }
        //             i++;
        //         }
        //     }
        // )
        //     .catch(
        //         error => {
        //             dispatch({ type: "SHOW_ERROR_API", message: error.message })
        //         }
        //     );
        fetchAPI("/api/Product").then(
            response => {
                console.log(response)
                if (response.status !== 200) {
                    //dispatch({ type: "SHOW_ERROR_API", message: result.message })
                } else {
                    dispatch({ type: "APPEND_BACK_END_PRODUCT", data: response.data })
                }
            }
        )
    }
}