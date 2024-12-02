import { fetchAPI, postAPI, putAPI } from "../../../api";

export const getInitialData = () => {
    return async dispatch => {
        fetchAPI("/api/Ingredient").then(
            response => {

                if (response.status !== 200) {
                    //dispatch({ type: "SHOW_ERROR_API", message: result.message })
                } else {
                    dispatch({ type: "APPEND_BACK_END_INGREDIENT", data: response.data })
                }
            }
        )
    }
}

export const addData = (data) => {
    return async dispatch => {
        postAPI("/api/Ingredient", data).then(
            response => {
                if (response.status !== 200) {
                } else {
                    dispatch({ type: "ADD_BACK_END_INGREDIENT", data: data })

                }

            }
        )
    }
}


export const updateData = (data) => {
    console.log(data)
    return async dispatch => {
        putAPI("/api/Ingredient", data).then(
            response => {
                if (response.status !== 200) {

                } else {
                    dispatch({ type: "UPDATE_BACK_END_INGREDIENT", data: data })

                }

            }
        )
    }
}