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
        default:
            return state;
    }

}

export default ProductCategoryBackend;