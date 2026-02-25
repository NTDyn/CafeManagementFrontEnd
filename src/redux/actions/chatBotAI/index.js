import { fetchAPI, postAPI, putAPI } from "../../../api";



export const openChatModal = async (userID) => {
    try {
        const response = await postAPI(`/api/ChatBot?userID=${userID}`, {
            action: "open",
            parameters: {

            },
        });
        console.log(response)
        return response;
    } catch (error) {
        console.error('Modal Control Protocol Error:', error);
        throw error;
    }


};

export const sendChatMessage = async (message, userID) => {
    try {
        const response = await postAPI(`/api/ChatBot?userID=${userID}`, {
            action: "send",
            content: message
        });
        console.log(response)
        return response;
    } catch (error) {
        console.error('Modal Control Protocol Error:', error);
        throw error;
    }

};

export const closeChatModal = async () => {
    try {
        const response = await postAPI(`/api/ChatBot`, {
            action: "close",
        });

        return response;
    } catch (error) {
        console.error('Modal Control Protocol Error:', error);
        throw error;
    }
};