import { postLoginAPI } from "../../../api";
export const login = async (_data) => {
    const roles = [];
    return async dispatch => {
        await postLoginAPI(`/api/Login?Username=${_data.email}&Password=${_data.password}`).then(
            response => {
                if (response.status === 200) {
                    response.data.permissions.forEach(element => {
                        roles.push(element.permission_ID);

                    });
                    dispatch({ type: "API_SUCCESS", message: response.message, status: response.status, data: response.data })
                    dispatch({ type: "LOGIN_SUCCESS", isAuthenticated: true, roles: roles, userName: response.data.staff_FullName });
                    sessionStorage.setItem("authToken", "user-authentication-token");
                }
                if (response.status !== 200) {
                    dispatch({ type: "API_FAILURE", message: response.message, status: response.status, data: response.data })
                }
            }
        );



    }

}