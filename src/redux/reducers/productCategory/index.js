const initialState = {
    data: [],
    error: "",
}

const ProductCategoryBackend = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_PRODUCT_CATEGORY":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.category_ID;
            });

            return {
                ...state,
                data: result
            }
        case "ADD_BACK_END_PRODUCT_CATEGORY":
            let itemAdd = action.data;
            let list = state.data;
            let cateID = list.list[list.length - 1].category_ID + 1;
            itemAdd.category_ID = cateID;
            itemAdd.id = itemAdd.category_ID;
            list = [...list, itemAdd];
            return {
                ...state,
                data: list
            }

        case "UPDATE_BACK_END_PRODUCT_CATEGORY":
            let itemUP = action.data;

            const updatedData = state.data.map(item => {

                if (item.category_ID === action.data.category_ID) {
                    if (itemUP.category_Name !== null) {
                        return { ...item, category_Name: action.data.category_Name };
                    }
                    if (itemUP.category_Name === null) {
                        return { ...item, isActive: action.data.isActive };
                    }
                }
                return item;
            });

            return {
                ...state,
                data: updatedData
            }
        default:
            return state;
    }

}

export default ProductCategoryBackend;