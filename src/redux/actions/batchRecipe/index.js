import { fetchAPI, postAPI, putAPI } from "../../../api";

export const getInitialData = () => {
    return async dispatch => {
        await Promise.all([
            fetchAPI("/api/Ingredient"),
            fetchAPI("/api/BatchRecipe")

        ]).then(
            response => {
                let i = 0;
                response.forEach(element => {
                    console.log('sdsdsddfsfd')
                    if (element.status !== 200) {

                    } else {
                        if (i === 0) {
                            dispatch({ type: "APPEND_BACK_END_INGREDIENT", data: element.data })
                        }
                        else {
                            dispatch({ type: "APPEND_BACK_END_BATCH", data: element.data })
                        }
                        i++;
                    }
                });
            }
        )
    }
}

export const addData = (data) => {
    return async dispatch => {
        postAPI("/api/BatchRecipe", data).then(
            response => {
                if (response.status !== 200) {
                } else {
                    dispatch({ type: "ADD_BACK_END_BATCH", data: response.data })
                }

            }
        )
    }
}
