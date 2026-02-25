import { fetchAPI, fetchAPIwithParams, postAPI, putAPI } from "../../../api";

export const getProductRate = (value) => {
    return async dispatch => {
        let url = "/api/ProductReview/";
        if (value)
            url += value + "/rating";

        try {
            const response = await fetchAPI(url);
            if (response.status !== 200) {

                return null;
            } else {
                dispatch({ type: "APPEND_BACK_END_PRODUCT_REVIEW_RATING", data: response.data });
                return response;
            }
        } catch (err) {
            console.error("Error fetching product rating:", err);
            return null;
        }
    };
}

export const addReview = (value) => {

    return async dispatch => {
        let url = "/api/ProductReview/review";

        try {
            const results = await Promise.all(
                value?.ratingList?.map(async review => {
                    const data = {
                        user_ID: value.user_ID,
                        product_ID: review?.product_ID,
                        rating: review?.rating,
                        order_ID: value.order_ID,
                        comment: value.comment
                    };
                    console.log(data)
                    postAPI(url, data).then(
                        response => {
                            console.log(response)
                            if (response.status !== 200) {
                                console.error("ERROR IN ADD REVIEW")
                            }

                        }
                    )
                })
            );

            return results;

        } catch (err) {
            console.error("Error sending product reviews:", err);
            return null;
        }
    };
};
