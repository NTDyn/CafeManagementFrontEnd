import { fetchAPI, postAPI, putAPI } from "../../../api";

export const getInitialData = () => {
    return async dispatch => {

        fetchAPI("/api/ProductRecipe").then(
            response => {

                if (response.status !== 200) {
                    //dispatch({ type: "SHOW_ERROR_API", message: result.message })
                } else {
                    dispatch({ type: "APPEND_BACK_END_PRODUCT_RECIPE", data: response.data })
                }
            }
        )
    }
}

export const addData = (list) => {

    return async dispatch => {
        list.forEach(element => {
            console.log(element)
            postAPI("/api/ProductRecipe", element).then(
                response => {
                    if (response.status !== 200) {

                    } else {
                        console.log('action recipe')
                        dispatch({ type: "ADD_BACK_END_PRODUCT_RECIPE", data: element })

                    }

                }
            )
        });

    }
}


export const updateData = (data) => {
    return async dispatch => {
        putAPI("/api/ProductRecipe", data).then(
            response => {
                if (response.status !== 200) {

                } else {
                    dispatch({ type: "UPDATE_BACK_END_PRODUCT_RECIPE", data: data })

                }

            }
        )
    }
}