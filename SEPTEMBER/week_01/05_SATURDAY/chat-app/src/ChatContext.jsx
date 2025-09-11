import React, { createContext, useState, useEffect } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('chatMessages');
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const addMessage = (role, text) => {
        setMessages(prev => [...prev, { role, text, timestamp: new Date().toISOString() }]);
    };

    return (
        <ChatContext.Provider value={{ messages, addMessage, loading, setLoading }}>
            {children}
        </ChatContext.Provider>
    );
};
