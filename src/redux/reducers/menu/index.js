const initialState = {
    data: []
}


const Menus = (state = initialState, action) => {
    switch (action.type) {
        case "REFETCH_MENU":
            return {
                ...state,
                data: action.data.map(el => ({
                    ...el,
                    id: el.menu_ID // Tạo mảng mới với thuộc tính id được thêm
                }))
            };

        case "ADD_BACK_END_MENU":
            return {
                ...state,
                data: [...state.data, action.data] // Sử dụng spread để tạo mảng mới
            };

        case "UPDATE_BACK_END_MENU":
            return {
                ...state,
                data: state.data.map(item =>
                    item.menu_ID === action.data.menu_ID ? action.data : item
                )
            };

        default:
            return state;
    }
};

export default Menus;