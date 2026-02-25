const initialState = {
    data: [],
    error: "",
}

const CustomerBackEnd = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_CUSTOMER":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.customer_Id;
            })
            return {
                ...state,
                data: result

            }
        case "ADD_BACK_END_CUSTOMER":
            let list = state.data;
            let elAdd = action.data;
            console.log(list)
            let cusID = list[list.length - 1]?.customer_Id + 1;
            elAdd.id = cusID;
            list = [...list, elAdd];
            return {
                ...state,
                data: list
            }

        case "UPDATE_BACK_END_CUSTOMER":

            let itemUP = action.data;
            console.log(itemUP)
            let updatedData;
            if (itemUP.isActive === false) {
                updatedData = state.data.filter(item => item.customer_Id !== itemUP.customer_Id)
            } else {
                updatedData = state.data.map(item => {
                    if (item.customer_Id === itemUP.customer_Id) {


                        return {
                            ...item,
                            customer_Name: itemUP.customer_Name,
                            customer_Phone: itemUP.customer_Phone,
                            customer_Address: itemUP.customer_Address,
                            customer_Email: itemUP.customer_Email,
                            level_ID: itemUP.level_ID
                        };


                    }
                    return item;
                });
            }
            return {
                ...state,
                data: updatedData,
            };

        default:
            return state
    }
}

export default CustomerBackEnd