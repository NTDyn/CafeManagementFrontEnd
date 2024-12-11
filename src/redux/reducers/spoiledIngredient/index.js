const initialState = {
    data: [],
    error: "",
}

const SpoiledBackEnd = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_SPOILED":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.spoiled_ID;
            })
            return {
                ...state,
                data: result

            }
        case "ADD_BACK_END_SPOILED":
            let list = state.data;
            let elAdd = action.data;
            let ingreID = list[list.length - 1].spoiled_ID + 1;
            elAdd[0]["id"] = ingreID;
            list = [...list, elAdd[0]];
            return {
                ...state,
                data: list
            }
        default:
            return state
    }
}

export default SpoiledBackEnd