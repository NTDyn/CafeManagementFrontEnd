export const login = (_data) => {
    let roles = ["admin_home","admin_product","admin_warehouse","admin_product_category","admin_suppliers"];
    return async dispatch => {
        dispatch({ type: "LOGIN_SUCCESS", isAuthenticated: true,  roles: roles, userName: "Admin"});
        sessionStorage.setItem("authToken", "user-authentication-token");
        
    }

}