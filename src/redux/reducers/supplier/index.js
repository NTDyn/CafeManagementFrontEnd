const initialState = {
    data: [],
    error: "",
}

const SupplierBackend = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_SUPPLIER":
            const result = action.data?.map(el => ({
                ...el,
                id: el.supplier_ID
            }));
            return {
                ...state,
                data: result
            };
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
            let updatedData;
            if (action.data.isActive === false) {
                updatedData = state.data.filter(item => item.supplier_ID !== action.data.supplier_ID)
            } else {
                updatedData = state.data.map(item => {
                    const sup = action.data;
                    if (item.supplier_ID === sup.supplier_ID) {

                        return {
                            ...item, supplier_Name: sup.supplier_Name,
                            supplier_Address: sup.supplier_Address,
                            supplier_Phone: sup.supplier_Phone,
                            supplier_Email: sup.supplier_Email,
                        };

                    }

                    return item;
                });
            }
            return {
                ...state,
                data: updatedData,
            };

        default:
            return state;
    }

}

export default SupplierBackend;