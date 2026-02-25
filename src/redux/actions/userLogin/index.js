import { postLoginAPI } from "../../../api";
export const loginAdmin = (_data) => {
    return async (dispatch) => {
        const roles = [];
        return postLoginAPI(`/api/Login/admin?Username=${_data.email}&Password=${_data.password}`)
            .then((response) => {
                if (response.status === 200) {
                    response.data.permissions.forEach(element => {
                        roles.push(element.permission_ID);
                    });

                    dispatch({ type: "API_SUCCESS", message: response.message, status: response.status, data: response.data });
                    dispatch({ type: "LOGIN_SUCCESS", isAuthenticated: true, roles: roles, userName: response.data.staff_FullName });
                    sessionStorage.setItem("authToken", "user-authentication-token");
                    sessionStorage.setItem("userName", response.data.staff_UserName);

                } else {
                    dispatch({ type: "API_FAILURE", message: response.message, status: response.status, data: response.data });
                    //throw new Error(response.message);
                }
                return response;
            });
    };
};

export const loginClient = (_data) => {
    return async (dispatch) => {
        const roles = [];
        return postLoginAPI(`/api/Login/client?UserName=${_data.username}&Password=${_data.password}`)
            .then((response) => {
                if (response.status === 200) {
                    // response.data.permissions.forEach(element => {
                    //     roles.push(element.permission_ID);
                    // });
                    console.log(response)
                    dispatch({ type: "API_SUCCESS", message: response.message, status: response.status, data: response.data });
                    dispatch({ type: "LOGIN_SUCCESS", isAuthenticated: true, userName: response.data.customer_Name });
                    sessionStorage.setItem("authToken", "user-authentication-token");
                    sessionStorage.setItem("userName", response.data.username);

                } else {
                    dispatch({ type: "API_FAILURE", message: response.message, status: response.status, data: response.data });
                    //throw new Error(response.message);
                }
                return response;
            });
    };
};