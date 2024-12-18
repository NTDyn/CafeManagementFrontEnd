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
            const updatedData = state.data.map(item => {
                if (item.supplier_ID === action.data.supplier_ID) {
                    if (action.data.supplier_Name !== null) {
                        return { ...item, supplier_Name: action.data.supplier_Name };
                    }
                    if (action.data.supplier_Name === null) {
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

export default SupplierBackend;