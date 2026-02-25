const initialState = {
    data: [],
    error: "",
}

const SpoiledBackEnd = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_STORE":
            const result = action.data.map(el => ({
                ...el,
                id: el.ingredient_ID
            }));
            return {
                ...state,
                data: result
            };
        default:
            return state
    }
}

export default SpoiledBackEnd