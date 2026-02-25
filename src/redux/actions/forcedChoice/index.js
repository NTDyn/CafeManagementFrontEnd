import { fetchAPI, postAPI, putAPI } from "../../../api";

export const getForcedChoice = (_id = -1) => {
    let url = "/api/ForcedChoice";
    if (_id !== -1) {
        url += `?product_id=${_id}`;
    }
    return async dispatch => {
        fetchAPI(url).then(
            response => {

                if (response.status !== 200) {
                    //dispatch({ type: "SHOW_ERROR_API", message: result.message })
                } else {
                    console.log(response)
                    dispatch({ type: "APPEND_BACK_END_FORCEDCHOICE", data: response.data })
                }
            }
        )
    }
}

export const addData = (data) => {
    return async dispatch => {
        postAPI("/api/ForedChoice", data)
            .then(
                response => {
                    if (response.status !== 200) {
                        //   dispatch({ type: "SHOW_ERROR_API", message: result.message })
                    } else {
                        dispatch({ type: "ADD_BACK_END_FORCEDCHOICE", data: data });
                    }
                }
            )
            .catch(

                error => console.error("API call failed", error),

            )
    }
}

export const updateData = (data) => {
    return async dispatch => {
        putAPI("/api/ForcedChoice", data)
            .then(
                response => {
                    if (response.status !== 200) {

                    } else {
                        console.log(response.data);
                        dispatch({ type: "UPDATE_BACK_END_ForcedChoice", data: response.data });

                    }
                }
            )
            .catch(

                error => console.error("API call failed", error),

            )
    }
}
