import { fetchAPI, postAPI, putAPI } from "../../../api";
import { addData as addRecipe } from "../productRecipe";
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

                if (response.status !== 200) {
                    //dispatch({ type: "SHOW_ERROR_API", message: result.message })
                } else {
                    dispatch({ type: "APPEND_BACK_END_PRODUCT", data: response.data })
                }
            }
        )
    }
}

export const addData = (data, listRecipe) => {
    return async dispatch => {
        postAPI("/api/Product", data).then(
            response => {
                if (response.status !== 200) {

                } else {
                    dispatch({ type: "ADD_BACK_END_PRODUCT", data: data })
                    let productID = data.id;
                    listRecipe.forEach(element => {
                        element.product_ID = productID
                    });
                    dispatch(addRecipe(listRecipe))

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
                    dispatch({ type: "UPDATE_BACK_END_PRODUCT", data: data })

                }

            }
        )
    }
}