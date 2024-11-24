const initialState = {
    data: [],
    error: "",
}

const ProductRecipeBackEnd = (state = initialState, action) => {
    switch (action.type) {
        case "APPEND_BACK_END_PRODUCT_RECIPE":
            let result = [];
            action.data.forEach((el, i) => {
                result.push(el);
                result[i]["id"] = el.recipe_ID;
            })
            return {
                ...state,
                data: result

            }
        case "ADD_BACK_END_PRODUCT_RECIPE":
            console.log('reducer')
            let list = state.data;
            let elAdd = action.data;
            let recipeID = list.length + 1;
            elAdd.id = recipeID;
            list = [...list, elAdd];

            return {
                ...state,
                data: list
            }
        case "UPDATE_BACK_END_PRODUCT_RECIPE":

            const updatedData = state.data.map(item => {
                let itemUP = action.data;
                if (item.product_ID === itemUP.product_ID) {
                    if (itemUP.product_Name !== undefined && itemUP.product_Category !== undefined && itemUP.price !== undefined && itemUP.point !== undefined) {
                        return {
                            ...item,
                            product_Name: action.data.product_Name,
                            product_Category: action.data.product_Category,
                            price: action.data.price,
                            point: action.data.point
                        };
                    }
                    if (itemUP.product_Name === undefined && itemUP.product_Category === undefined && itemUP.price === undefined && itemUP.point === undefined) {
                        return {
                            ...item,
                            isActive: action.data.isActive
                        }
                    }
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

export default ProductRecipeBackEnd