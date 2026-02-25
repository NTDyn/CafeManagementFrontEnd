import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInitialData as getStaffs } from '../../../../../redux/actions/staff/index.js';
import { addMessage } from '../../../../../redux/actions/chatMessage/index.js';
import './style.css';
import ava1 from "../../../../../image/client/chat&roomchat/jason.png";
import ava2 from "../../../../../image/client/chat&roomchat/cheryn.png";
import ava3 from "../../../../../image/client/chat&roomchat/lou.png";

const staffs = [
    { id: 1, name: 'Jason', avatar: ava1 },
    { id: 2, name: 'Cheryn', avatar: ava2 },
    { id: 3, name: 'Lou', avatar: ava3 }
];

function MainChat() {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.dataChatMessage.messages);
    const staffData = useSelector((state => state.dataStaff.data));
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        dispatch(getStaffs());
    }, [dispatch])
    const handleSendMessage = () => {
        if (!selectedStaff || !inputMessage.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            user: selectedStaff.name,
            content: inputMessage,
        };

        dispatch(addMessage(newMessage));
        setInputMessage('');
    };


    return (
        <main style={{ marginTop: '6rem' }}>
            <div className="p-5 bg-primary text-white hero-chat">
                <div className="container mt-4 container-1-chat">
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                {/* LEFT SIDE */}
                                <div className="col-4 container-2-chat px-4" style={{ paddingTop: '1.2rem' }}>
                                    <div className="input-group">
                                        <input type="search" className="form-control chat mt-4" placeholder="Search Chat" />
                                    </div>
                                    <p className="s-1-chat">Choose a staff you want to talk with</p>
                                    {staffs.map((staff) => (
                                        <div key={staff.id}>
                                            <a href="#" onClick={() => setSelectedStaff(staff)}>
                                                <div className="chat-section">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-3">
                                                                <img className="avatar-1-chat" src={staff.avatar} alt="icon" />
                                                            </div>
                                                            <div className="col text-start pt-3">
                                                                <h5 className="s-2-chat">{staff.name}</h5>
                                                                <p className="s-3-chat">Click to start chat with {staff.name}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <hr className="line-break-side-chat" />
                                        </div>
                                    ))}
                                </div>

                                {/* RIGHT SIDE */}
                                <div className="col-8 container-3-chat text-center">
                                    <div className="container p-4">
                                        <div className="row">
                                            <div className="col" style={{ marginLeft: '-15.5rem', marginTop: '1rem' }}>
                                                <h2 className="s-4-chat">Room Chat</h2>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col" style={{ marginTop: '4rem' }}>
                                                {selectedStaff ? (
                                                    <>
                                                        <p style={{ color: '#fff' }}>Chatting with <strong>{selectedStaff.name}</strong></p>
                                                        {/* Input chat + Gửi */}
                                                        <div className="mt-3">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Type your message..."
                                                                value={inputMessage}
                                                                onChange={(e) => setInputMessage(e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') handleSendMessage();
                                                                }}
                                                            />
                                                            <button
                                                                className="btn btn-light mt-2"
                                                                onClick={handleSendMessage}
                                                            >
                                                                Send Message
                                                            </button>
                                                        </div>

                                                        {/* Danh sách tin nhắn */}
                                                        <div className="mt-3 text-start p-3 bg-white rounded" style={{ color: '#000', maxHeight: '300px', overflowY: 'auto' }}>
                                                            <h5 className="mb-3">Messages:</h5>
                                                            <ul className="list-unstyled">
                                                                {messages
                                                                    .filter(msg => msg.user === selectedStaff.name)
                                                                    .map(msg => (
                                                                        <li key={msg.id} className="mb-2">🗨️ {msg.content}</li>
                                                                    ))}
                                                            </ul>
                                                        </div>

                                                    </>
                                                ) : (
                                                    <p style={{ color: '#9F9F9F' }}>You have no conversation, start chat with a staff!<br />Have a good day!</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* END RIGHT */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MainChat;
