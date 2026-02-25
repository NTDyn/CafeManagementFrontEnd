const initialState = {
    data: []
}


const ForcedChoice = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_FORCEDCHOICE":
            return {
                ...state,
                data: action.data.map(el => ({
                    ...el,
                    id: el.choice_ID // Tạo mảng mới với thuộc tính id được thêm
                }))
            };

        case "ADD_BACK_END_FORCEDCHOICE":
            return {
                ...state,
                data: [...state.data, action.data] // Sử dụng spread để tạo mảng mới
            };

        case "UPDATE_BACK_END_FORCEDCHOICE":
            return {
                ...state,
                data: state.data.map(item =>
                    item.choice_ID === action.data.choice_ID ? action.data : item
                )
            };

        default:
            return state;
    }
};

export default ForcedChoice;