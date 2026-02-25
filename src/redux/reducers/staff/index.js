const initialState = {
    data: [],
    error: "",
}

const StaffBackEnd = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_STAFF":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.staff_ID;
            })
            return {
                ...state,
                data: result

            }
        case "ADD_BACK_END_STAFF":
            let list = state.data;
            let elAdd = action.data;
            let staffID = list[list.length - 1].staff_ID + 1;
            elAdd.id = staffID;
            list = [...list, elAdd];
            return {
                ...state,
                data: list
            }

        case "UPDATE_BACK_END_STAFF":

            let itemUP = action.data[0];

            const updatedData = state.data.map(item => {
                if (item.satff_ID === itemUP.staff_ID) {

                    return {
                        ...item,
                        staffGroup_ID: itemUP.staffGroup_ID,
                        staff_FullName: itemUP.staff_FullName,
                        staff_Phone: itemUP.staff_Phone,
                        isActive: itemUP.isActive
                    };


                }
                return item;
            });

            return {
                ...state,
                data: updatedData,
            };

        default:
            return state
    }
}

export default StaffBackEnd