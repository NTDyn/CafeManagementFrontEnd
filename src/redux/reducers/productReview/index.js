import { isAction } from "redux";

const initialState = {
    data: [],
    error: "",
}

const ProductReviewBackEnd = (state = initialState, action) => {
    switch (action.type) {

        case "APPEND_BACK_END_PRODUCT_REVIEW_RATING":
            return {
                ...state,
                data: {
                    ...action.data,
                    id: action.data.productId // thêm id nếu cần
                }
            }

        default:
            return state
    }
}

export default ProductReviewBackEnd