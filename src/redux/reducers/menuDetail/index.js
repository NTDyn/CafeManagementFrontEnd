const initialState = {
    data: []
}

const MenuDetails = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_MENU_DETAIL":
            return { ...state, data: action.data };

        case "ADD_BACK_END_MENU_DETAIL":
            let itemAdd = action.data;
            return {
                ...state,
                data: [...state.data, itemAdd]
            };

        case "UPDATE_BACK_END_MENU_DETAIL":
            return {
                ...state,
                data: state.data.map(item =>
                    item.setup_ID === action.data.setup_ID ? action.data : item
                )
            }
        default:
            return state;
    }

}

export default MenuDetails;