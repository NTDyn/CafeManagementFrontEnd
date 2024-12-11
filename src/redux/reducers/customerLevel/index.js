const initialState = {
    data: [],
    error: "",
}

const CustomerLevelBackEnd = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_CUSTOMER_LEVEL":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.level_ID;
            })
            return {
                ...state,
                data: result

            }
        case "ADD_BACK_END_CUSTOMER_LEVEL":
            let list = state.data;
            let elAdd = action.data;
            let levID = list.length > 0 ? list[list.length - 1].level_ID + 1 : 1;
            elAdd.id = levID;
            list = [...list, elAdd];
            return {
                ...state,
                data: list
            }

        case "UPDATE_BACK_END_CUSTOMER_LEVEL":

            let itemUP = action.data[0];

            const updatedData = state.data.map(item => {
                console.log(state.data)
                if (item.level_ID === itemUP["level_ID"]) {
                    console.log(action.data)
                    if (itemUP.level_Name !== undefined && itemUP.pointApply !== undefined) {

                        return { ...item, level_Name: itemUP.level_Name, pointApply: itemUP.pointApply, isActive: itemUP.isActive };
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

export default CustomerLevelBackEnd