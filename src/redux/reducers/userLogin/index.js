const initialState = {
    isAuthenticated: false,
    roles: [],
    userName: ""
}

const loginUser = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                roles: action.roles,
                userName: action.userName
            }
        default:
            return state;
    }

}

export default loginUser;