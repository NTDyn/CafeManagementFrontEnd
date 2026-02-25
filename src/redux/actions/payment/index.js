import { fetchAPI, fetchAPIwithParams, postAPI, putAPI } from "../../../api";

export const createPayment = (data) => {
    return async dispatch => {
        // Dispatch loading state to indicate the API call is in progress
        dispatch({ type: "CREATE_PAYMENT_LOADING" });
        try {
            const response = await postAPI("/api/Payment", data);
            if (response.status === 200) {
                dispatch({ type: "CREATE_PAYMENT_SUCCESS", data: response.data });
                return response;
            } else {
                // Dispatch error in case of a non-200 response
                dispatch({ type: "CREATE_PAYMENT_ERROR", error: response.message || "An error occurred" });
            }
        } catch (error) {
            // Handle network or unexpected errors
            dispatch({ type: "CREATE_PAYMENT_ERROR", error: error.message || "Something went wrong!" });
        }
    }
}

export const handlePaymentReturn = (vnp_ResponseCode, vnp_TxnRef) => {
    return async dispatch => {
        dispatch({ type: "PAYMENT_RETURN_LOADING" });
        try {
            const response = await fetchAPI(`/api/Payment/payment-return?vnp_ResponseCode=${vnp_ResponseCode}&vnp_TxnRef=${vnp_TxnRef}`);
            if (response.status === 200) {
                dispatch({ type: "PAYMENT_RETURN_SUCCESS", data: response });
                console.log(response)
                return response;
            } else {
                dispatch({ type: "PAYMENT_RETURN_ERROR", error: response.message || "Payment failed!" });
                return response;
            }
        } catch (error) {
            dispatch({ type: "PAYMENT_RETURN_ERROR", error: error.message || "Something went wrong!" });
        }
    };
};