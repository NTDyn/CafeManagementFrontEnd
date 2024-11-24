const initialState = {
    data: [],
    error: "",
}

const IngredientBackEnd = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_INGREDIENT":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.ingredient_ID;
            })
            return {
                ...state,
                data: result

            }
        case "ADD_BACK_END_INGREDIENT":
            let list = state.data;
            let elAdd = action.data;
            let ingreID = list[list.length - 1].ingredient_ID + 1;
            elAdd.id = ingreID;
            list = [...list, elAdd];
            return {
                ...state,
                data: list
            }

        case "UPDATE_BACK_END_INGREDIENT":

            let itemUP = action.data;

            const updatedData = state.data.map(item => {
                if (item.ingredient_ID === action.data.ingredient_ID) {
                    if (itemUP.ingredient_Name !== undefined && itemUP.ingredient_Type !== undefined && itemUP.ingredient_Category !== undefined && itemUP.unit_Max !== undefined && itemUP.unit_Min !== undefined && itemUP.unit_Transfer !== undefined && itemUP.transferPerMin !== undefined && itemUP.maxPerTransfer !== undefined) {
                        return { ...item, ingredient_Name: action.data.ingredient_Name };
                    }
                    if (action.data.isActive !== undefined) {

                        return { ...item, isActive: action.data.isActive };
                    }
                }
                return item;
            });

            return {
                ...state,
                data: updatedData,
            };

        default:
            return state
    }
}

export default IngredientBackEnd