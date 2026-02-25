const initialState = {
    data: [],
    error: "",
}

const PermissionBackEnd = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_PERMISSION":
            const result = action.data.map(el => ({
                ...el,
                id: el.permission_ID
            }));
            return {
                ...state,
                data: result
            };
        default:
            return state
    }
}

export default PermissionBackEnd