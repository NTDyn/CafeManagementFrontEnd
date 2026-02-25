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
            const itemUP = action.data[0];
            console.log(itemUP);

            const updatedData = state.data.map(item => {
                if (item.menu_ID === itemUP.menu_ID) {
                    return {
                        ...item,
                        ...(itemUP.menu_Name !== null && { menu_Name: itemUP.menu_Name }),
                        ...(itemUP.isActive !== null && { isActive: itemUP.isActive })
                    };
                }
                return item;
            });

            return {
                ...state,
                data: updatedData
            };

        case "DELETE_BACK_END_MENU":
            return {
                ...state,
                data: state.data.filter(menu => menu.menu_ID !== action.data.menu_ID)
            };
        case "SET_SELECTED_MENU":
            return {
                ...state,
                selectedMenuId: action.data
            };

        default:
            return state;
    }
};

export default Menus;