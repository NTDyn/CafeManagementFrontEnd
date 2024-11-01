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
            let itemUP = action.data;
            console.log(itemUP)
            let indexUp = state.data.findIndex(x => x.product_ID === itemUP.product_ID);
            if (indexUp !== -1 && itemUP.product_Name !== undefined && itemUP.product_Category !== undefined && itemUP.price !== undefined && itemUP.point !== undefined) {
                console.log(itemUP.product_Name)
                state.data[indexUp]["product_Name"] = action.data.product_Name;
                state.data[indexUp]["product_Category"] = action.data.product_Category;
                state.data[indexUp]["price"] = action.data.price;
                state.data[indexUp]["point"] = action.data.point;
            }
            if (indexUp !== -1 && itemUP.product_Name === undefined && itemUP.product_Category === undefined && itemUP.price === undefined && itemUP.point === undefined) {
                state.data[indexUp]["isActive"] = action.data.isActive
            }
            console.log(state.data)
            return {
                ...state,
                data: state.data

            }

        default:
            return state
    }
}

export default ProductBackEnd