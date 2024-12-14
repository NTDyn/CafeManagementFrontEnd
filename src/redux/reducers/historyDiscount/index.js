const initialState = {
    data: []
}


const HistoryDiscount = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_HISTORY_DISCOUNT":
            console.log(action.data)
            return {
                ...state,
                data: action.data.map(el => ({
                    ...el,
                    id: el.history_ID // Tạo mảng mới với thuộc tính id được thêm
                }))
            };


        default:
            return state;
    }
};

export default HistoryDiscount;