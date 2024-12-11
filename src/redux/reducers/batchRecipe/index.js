const initialState = {
    data: [],
    error: "",
}

const BatchBackEnd = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_BATCH":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.batchRecipe_ID;
            })
            return {
                ...state,
                data: result

            }
        case "ADD_BACK_END_BATCH":
            let list = state.data;
            let elAdd = action.data;
            let ingreID = list[list.length - 1].batchRecipe_ID + 1;
            elAdd[0]["id"] = ingreID;
            list = [...list, elAdd];
            return {
                ...state,
                data: list
            }
        default:
            return state
    }
}

export default BatchBackEnd