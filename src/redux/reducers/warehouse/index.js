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
        default:
            return state;
    }
}

export default WarehouseBackend