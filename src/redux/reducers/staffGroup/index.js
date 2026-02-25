const initialState = {
    data: [],
    error: "",
}

const StaffGroupBackEnd = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_STAFFGROUP":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.staffGroup_ID;
            })
            return {
                ...state,
                data: result

            }
        case "ADD_BACK_END_STAFFGROUP":
            let list = state.data;
            let elAdd = action.data;
            let grID = list[list.length - 1].staffGroup_ID + 1;
            elAdd.id = grID;
            list = [...list, elAdd];
            return {
                ...state,
                data: list
            }

        case "UPDATE_BACK_END_STAFFGROUP":

            let itemUP = action.data[0];

            const updatedData = state.data.map(item => {
                if (item.satffGroup_ID === itemUP.staffGroup_ID) {

                    return {
                        ...item,
                        staffGroup_ID: itemUP.staffGroup_ID,
                        staffGroup_Name: itemUP.staffGroup_Name,
                        permissions: itemUP.permissions,
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

export default StaffGroupBackEnd