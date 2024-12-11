import { isAction } from "redux";

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
            return {
                ...state,
                data: result

            }
        case "ADD_BACK_END_PRODUCT":
            let list = state.data;
            let elAdd = action.data;
            let productID = list.length + 1;
            elAdd.id = productID;
            list = [...list, elAdd];

            return {
                ...state,
                data: list
            }
        case "UPDATE_BACK_END_PRODUCT":
            const updatedData = state.data.map(item => {
                console.log(item)
                let itemUP = action.data;
                console.log(itemUP)
                if (item.product_ID === itemUP.product_ID) {
                    if (action.data.product_Name && action.data.product_Category && action.data.price && action.data.point && action.data.product_Image) {
                        return {
                            ...item,
                            product_Name: action.data.product_Name,
                            product_Category: action.data.product_Category,
                            price: action.data.price,
                            point: action.data.point,
                            product_Image: action.data.product_Image,
                            isActive: action.data.isActive

                        };
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

export default ProductBackEnd