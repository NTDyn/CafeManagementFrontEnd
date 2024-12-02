const initialState = {
    data: [],
    error: "",
}

const IngredientCategoryBackend = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_INGREDIENT_CATEGORY":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.ingredient_Category_ID;
            });

            return {
                ...state,
                data: result
            }
        case "ADD_BACK_END_INGREDIENT_CATEGORY":
            let itemAdd = action.data;
            let list = state.data;
            let cateID = list[list.length - 1].ingredient_Category_ID + 1;
            itemAdd.ingredient_Category_ID = cateID;
            itemAdd.id = itemAdd.ingredient_Category_ID;
            list = [...list, itemAdd];
            return {
                ...state,
                data: list
            }

        case "UPDATE_BACK_END_INGREDIENT_CATEGORY":
            let itemUP = action.data;

            const updatedData = state.data.map(item => {

                if (item.ingredient_Category_ID === action.data.ingredient_Category_ID) {
                    if (itemUP.ingredient_Category_Name !== null) {
                        return { ...item, ingredient_Category_Name: action.data.ingredient_Category_Name };
                    }
                    if (itemUP.ingredient_Category_Name === null) {
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
            return state;
    }

}

export default IngredientCategoryBackend;