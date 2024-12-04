import { fetchAPI } from "../../../api";

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