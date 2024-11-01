const initialState = {
    data: [],
    error: "",
}

const SupplierBackend = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_SUPPLIER":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.supplier_ID;
            });

            return {
                ...state,
                data: result
            }
        case "ADD_BACK_END_SUPPLIER":
            let itemAdd = action.data;
            let list = state.data;
            let suppID = list[list.length - 1].supplier_ID + 1;
            itemAdd.supplier_ID = suppID;
            itemAdd.id = itemAdd.supplier_ID;
            list = [...list, itemAdd];
            console.log(list)
            return {
                ...state,
                data: list
            }

        case "UPDATE_BACK_END_SUPPLIER":
            let itemUP = action.data;
            let indexUp = state.data.findIndex(x => x.supplier_ID === itemUP.supplier_ID);
            if (indexUp !== -1 && itemUP.supplier_Name !== null) {
                state.data[indexUp]["supplier_Name"] = action.data.supplier_Name
            }
            if (indexUp !== -1 && itemUP.supplier_Name === null) {
                state.data[indexUp]["isActive"] = action.data.isActive
            }
            return {
                ...state,
                data: state.data
            }
        default:
            return state;
    }

}

export default SupplierBackend;