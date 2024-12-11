const initialState = {
    data: [],
    error: "",
}

const SpoiledBackEnd = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_STORE":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.ingredient_ID;
            })
            return {
                ...state,
                data: result

            }
        default:
            return state
    }
}

export default SpoiledBackEnd