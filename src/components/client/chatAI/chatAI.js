import React, { useState, useEffect, useRef } from 'react';
import { openChatModal, sendChatMessage, closeChatModal } from '../../../redux/actions/chatBotAI/index';
import Message from './message';
import { Box, Button, Input, Typography, Grid2, TextField } from '@mui/material';
import ChatBot from '../../../image/client/robot.png'

const ChatAIBubble = ({ modalId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userID, setUserID] = useState(0);
    const messagesEndRef = useRef(null);

    const customer = JSON.parse(localStorage.getItem('@userLogin') || '{}');

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (!isOpen) return;

        const initializeChat = async () => {
            setIsLoading(true);
            try {
                if (customer.customer_Id) {
                    setUserID(customer.customer_Id)
                } else {
                    setUserID(0)
                }
                const response = await openChatModal(userID);
                console.log(response)
                setMessages([{ text: response.content, isAI: true }]);
            } catch (error) {
                console.error('Failed to open chat:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeChat();
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;
        const userMessage = inputMessage;
        setInputMessage('');
        setMessages(prev => [...prev, { text: userMessage, isAI: false }]);
        setIsLoading(true);

        try {
            const response = await sendChatMessage(userMessage, userID);
            setMessages(prev => [...prev, { text: response.content, isAI: true }]);
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{
            position: 'fixed',
            bottom: 20,
            right: 90,
            width: isOpen ? 300 : 50,
            height: isOpen ? 400 : 50,
            backgroundColor: 'white',
            borderRadius: isOpen ? 3 : '50%',
            boxShadow: 5,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease-in-out',
            zIndex: 1000
        }}>
            {!isOpen ? (
                <Button sx={{ height: '100%', backgroundColor: 'white', alignItems: 'center', minWidth: '100%' }} onClick={toggleChat}>
                    <img src={ChatBot} alt="up" style={{
                        width: '80%',
                        height: '100%',
                        cursor: 'pointer',

                    }} />
                </Button>
            ) : (
                <>
                    <Box sx={{ p: 1, borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgb(51, 153, 255)' }}>

                        <Grid2 container alignItems="center" sx={{ backgroundColor: '#2196f3', width: '100%', color: 'white', p: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                            <Grid2 size={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <img
                                    src={ChatBot}
                                    alt="bot"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        objectFit: 'contain',
                                    }}
                                />
                            </Grid2>
                            <Grid2 size={8} sx={{ paddingLeft: 2 }}>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    DYN COFFEE
                                </Typography>
                                <Typography sx={{ fontSize: '14px' }}>
                                    Chat with us!
                                </Typography>
                            </Grid2>
                            <Grid2 size={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button size="small" onClick={toggleChat} sx={{ minWidth: 0, color: 'white' }}>
                                    ✕
                                </Button>
                            </Grid2>
                        </Grid2>


                    </Box>
                    <Box sx={{ flex: 1, p: 1, overflowY: 'auto' }}>
                        {messages.map((msg, index) => (
                            <Message key={index} text={msg.text} isAI={msg.isAI} />
                        ))}
                        {isLoading && <div>AI is thinking...</div>}
                        <div ref={messagesEndRef} />
                    </Box>
                    <Box sx={{ display: 'flex', p: 1, borderTop: '1px solid #ddd' }}>
                        <TextField
                            fullWidth
                            size='small'
                            variant="outlined"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            placeholder="Type your message..."
                            disabled={isLoading}
                            sx={{
                                backgroundColor: '#f5f5f5',
                                borderRadius: '20px',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px',
                                },
                            }}
                        />
                        <Button onClick={handleSendMessage} disabled={isLoading}>Send</Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ChatAIBubble;
