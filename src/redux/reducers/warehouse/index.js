const initialState = {
    data: [],
    error: ""
}

const WarehouseBackend = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_WAREHOUSE":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.wareHouse_ID;
            });
            return {
                ...state,
                data: result
            }
        case "ADD_BACK_END_WAREHOUSE":
            let itemAdd = action.data;
            let list = state.data;
            let wareID = list[list.length - 1].wareHouse_ID + 1;
            itemAdd.wareHouse_ID = wareID;
            itemAdd.id = itemAdd.wareHouse_ID;
            list = [...list, itemAdd];
            return {
                ...state,
                data: list
            }

        case "UPDATE_BACK_END_WAREHOUSE":
            const itemUP = action.data;

            const updatedData = state.data.map(item =>
                item.wareHouse_ID === itemUP.wareHouse_ID ? {
                    ...item,
                    wareHouse_Name: itemUP.wareHouse_Name ?? item.wareHouse_Name,
                    isActive: itemUP.isActive ?? item.isActive,
                } : item
            );

            return {
                ...state,
                data: updatedData,
            };


            return {
                ...state,
                data: updatedData,
            };


        default:
            return state;

    }
}

export default WarehouseBackend