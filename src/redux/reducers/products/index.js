const initialState = {
    data: [],
    error: "",
}

const ProductBackEnd = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_PRODUCT":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.product_ID;
            })
            console.log(result)
            return {
                ...state,
                data: result
            }
        default:
            return state
    }
}

export default ProductBackEnd