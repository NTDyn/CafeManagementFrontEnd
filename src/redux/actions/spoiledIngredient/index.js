import { fetchAPI, postAPI } from "../../../api";

export const getInitialData = () => {
    return async dispatch => {
        fetchAPI("/api/SpoiledIngredient").then(
            response => {

                if (response.status !== 200) {

                } else {
                    dispatch({ type: "APPEND_BACK_END_SPOILED", data: response.data })
                }
            }
        )
    }
}

export const addData = (data) => {
    return async dispatch => {
        postAPI("/api/SpoiledIngredient", data).then(
            response => {
                if (response.status !== 200) {
                } else {
                    dispatch({ type: "ADD_BACK_END_SPOILED", data: response.data })
                }

            }
        )
    }
}
