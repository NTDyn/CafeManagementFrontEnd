import { fetchAPI, postAPI, putAPI } from "../../../api";

export const getMenu = (_id = -1) => {
  let url = "/api/Menu";
  if (_id !== -1) {
    url += `?MenuID=${_id}`;
  }
  return async dispatch => {
    await dispatch({ type: "API_REQUEST", typeRequest: 1 });
    await Promise.all([
      fetchAPI(url)
    ]).then(
      response => {
        let i = 0;
        let types = ["REFETCH_MENU"];
        for (const result of response) {
          if (!result.length) {
            dispatch({ type: "API_FAILURE", status: '', message: '' });
          } else {
            dispatch({ type: "API_SUCCESS", status: '', message: '' });
            dispatch({ type: types[i], data: result });
          }
          i++;
        }
      }
    )
      .catch(
        error => {
          dispatch({ type: "API_FAILURE", status: -1, message: error.message })
        }
      );
  }
}

export const addData = (data) => {
  return async dispatch => {
    postAPI("/api/Menu", data)
      .then(
        response => {
          if (response.status !== 200) {
            //   dispatch({ type: "SHOW_ERROR_API", message: result.message })
          } else {
            dispatch({ type: "ADD_BACK_END_MENU", data: data });
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
    putAPI("/api/Menu", data)
      .then(
        response => {
          if (response.status !== 200) {

          } else {
            dispatch({ type: "UPDATE_BACK_END_MENU", data: data });
            console.log(data);
          }
        }
      )
      .catch(

        error => console.error("API call failed", error),

      )
  }
}
