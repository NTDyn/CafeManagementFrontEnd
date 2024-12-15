import { fetchAPI, postAPI } from "../../../api";

export const getInitialData = () => {
    return async dispatch => {
        // fetchAPI("/api/SpoiledIngredient").then(
        //     response => {

        //         if (response.status !== 200) {

        //         } else {
        //             dispatch({ type: "APPEND_BACK_END_SPOILED", data: response.data })
        //         }
        //     }
        // )
        await Promise.all([
            fetchAPI("/api/Ingredient"),
            fetchAPI("/api/SpoiledIngredient")

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
                            dispatch({ type: "APPEND_BACK_END_SPOILED", data: element.data })
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
        postAPI("/api/SpoiledIngredient", data).then(
            response => {
                if (response.status !== 200) {
                } else {
                    console.log(response)
                    dispatch({ type: "ADD_BACK_END_SPOILED", data: response.data })
                }

            }
        )
    }
}
