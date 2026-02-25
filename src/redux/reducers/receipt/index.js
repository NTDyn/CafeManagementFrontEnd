import { isAction } from "redux";

const initialState = {
    data: [],
    error: "",
}

const ReceiptBackEnd = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_RECEIPT":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.receipt_ID;
            })
            return {
                ...state,
                data: result

            }
        case "ADD_BACK_END_RECEIPT":
            let list = state.data;
            let elAdd = action.data;
            let receiptID = list.length + 1;
            elAdd.id = receiptID;
            list = [...list, elAdd];

            return {
                ...state,
                data: list
            }
        case "UPDATE_BACK_END_RECEIPT":
            const updatedData = state.data.map(item => {
                console.log(item)
                let itemUP = action.data;
                console.log(itemUP)
                // if (item.receipt_ID === itemUP.receipt_ID) {
                //     if (action.data.product_Name && action.data.product_Category && action.data.price && action.data.point && action.data.product_Image) {
                //         return {
                //             ...item,
                //             product_Name: action.data.product_Name,
                //             product_Category: action.data.product_Category,
                //             price: action.data.price,
                //             point: action.data.point,
                //             product_Image: action.data.product_Image,
                //             isActive: action.data.isActive

                //         };
                //     }

                // }
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

export default ReceiptBackEnd