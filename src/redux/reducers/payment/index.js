const initialState = {
    data: [],
    error: "",
    loading: false,
};

const Payment = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_PAYMENT_LOADING":
            return { ...state, loading: true };

        case "CREATE_PAYMENT_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.data,  // Directly assign data without unnecessary iteration
                error: ""           // Clear any previous error on success
            };

        case "CREATE_PAYMENT_ERROR":
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case "PAYMENT_RETURN_ERROR":
            return { ...state, loading: false, error: action.error };

        case "PAYMENT_RETURN_SUCCESS":
            return { ...state, loading: false, returnStatus: action.data.status, error: null };
        default:
            return state;
    }
};

export default Payment;
