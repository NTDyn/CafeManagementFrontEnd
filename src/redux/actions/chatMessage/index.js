// Action để gửi tin nhắn
export const addMessage = (message) => {
    return {
        type: "ADD_MESSAGE",
        payload: message
    };
};

// Action để lấy tất cả tin nhắn (nếu có lưu trữ từ API)
export const setMessages = (messages) => {
    return {
        type: "SET_MESSAGES",
        payload: messages
    };
};