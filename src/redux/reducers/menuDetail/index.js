const initialState = {
    data: []
}

const MenuDetails = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_MENU_DETAIL":
            return { ...state, data: action.data };

        case "ADD_BACK_END_MENU_DETAIL":
            let itemAdd = action.data;
            let listNew = state.data.push(itemAdd);
            return {
                ...state,
                data: listNew
            }

        case "UPDATE_BACK_END_MENU_DETAIL":
            let itemUP = action.data;
            let listOld = state.data;
            let index = listOld.findIndex(x => x.setup_ID === itemUP.setup_ID);
            listOld[index] = itemUP;
            return {
                ...state,
                data: listOld
            }
        default:
            return state;
    }

}

export default MenuDetails;