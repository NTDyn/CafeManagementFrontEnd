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
            let itemUP = action.data;

            const updatedData = state.data.map(item => {

                if (item.wareHouse_ID === action.data.wareHouse_ID) {
                    if (itemUP.wareHouse_Name !== null) {
                        return { ...item, wareHouse_Name: action.data.wareHouse_Name };
                    }
                    if (itemUP.wareHouse_Name === null) {
                        return { ...item, isActive: action.data.isActive };
                    }
                }
                return item;
            });

            return {
                ...state,
                data: updatedData,
            };


        default:
            return state;

    }
}

export default WarehouseBackend