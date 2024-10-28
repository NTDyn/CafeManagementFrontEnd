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
            let cateID = list.length + 1;
            itemAdd.category_ID = cateID;
            itemAdd.id = itemAdd.category_ID;
            list = [...list, itemAdd];
            console.log(list)
            return {
                ...state,
                data: list
            }

        case "UPDATE_BACK_END_PRODUCT_CATEGORY":
            let itemUP = action.data;
            let indexUp = state.data.findIndex(x => x.category_ID === itemUP.category_ID);
            if (indexUp !== -1 && itemUP.category_Name !== null) {
                state.data[indexUp]["category_Name"] = action.data.category_Name
            }
            if (indexUp !== -1 && itemUP.category_Name === null) {
                state.data[indexUp]["isActive"] = action.data.isActive
            }
            return {
                ...state,
                data: state.data
            }
        default:
            return state;
    }

}

export default ProductCategoryBackend;