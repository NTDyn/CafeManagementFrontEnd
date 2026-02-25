// components/Chat.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessages } from "../../../../../redux/actions/chatMessage";
import { HubConnectionBuilder } from "@microsoft/signalr";
import axios from "axios";

const Chat = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.dataChatMessage.messages);
    const [connection, setConnection] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:3000/chatHub") // Địa chỉ API SignalR
            .build();

        newConnection
            .start()
            .then(() => console.log("Connected to SignalR"))
            .catch((err) => console.log("Connection failed: ", err));

        // Khi nhận được tin nhắn từ SignalR, dispatch vào Redux
        newConnection.on("ReceiveMessage", (user, message) => {
            dispatch(addMessage(`${user}: ${message}`));
        });

        setConnection(newConnection);

        // Lấy tất cả tin nhắn từ API nếu cần
        axios
            .get("http://localhost:3000/api/chat/messages")
            .then((response) => {
                dispatch(setMessages(response.data));
            })
            .catch((error) => {
                console.error("Error fetching messages", error);
            });
    }, [dispatch]);

    const sendMessage = () => {
        if (connection && message.trim() !== "") {
            // Gửi tin nhắn qua SignalR
            connection
                .send("SendMessage", "Client", message)
                .then(() => setMessage(""));

            // Gửi tin nhắn qua API (nếu cần lưu trữ vào DB)
            axios
                .post("http://localhost:3000/api/chat/send", {
                    user: "Client",
                    message: message,
                })
                .catch((error) => console.error("Error sending message: ", error));
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
