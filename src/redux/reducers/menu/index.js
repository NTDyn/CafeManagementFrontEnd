const initialState = {
    data: []
}

const Menus = (state = initialState, action) => {
    switch (action.type) {
        case "REFETCH_MENU":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.menu_ID;
            });

            return {
                ...state,
                data: result
            }
        case "ADD_MENU":
            let itemAdd = action.data;
            let listNew = state.data.push(itemAdd);
            return {
                ...state,
                data: listNew
            }

        case "UPDATE_MENU":
            let itemUP = action.data;
            let listOld = state.data;
            let index = listOld.findIndex(x=>x.menu_ID === itemUP.menu_ID);
            listOld[index] = itemUP;
            return {
                ...state,
                data: listOld
            }
        default:
            return state;
    }

}

export default Menus;