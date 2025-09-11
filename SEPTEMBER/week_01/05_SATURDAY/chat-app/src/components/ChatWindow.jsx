import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../ChatContext';
import MessageBubble from './MessageBubble';

export default function ChatWindow() {

    const { messages } = useContext(ChatContext);
    const bottomRef = useRef();
 
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    return (
        <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ddd', padding: '1rem' }}>
            {messages.map((msg, idx) => (
                <MessageBubble key={idx} role={msg.role} text={msg.text} timestamp={msg.timestamp} />
            ))}
            <div ref={bottomRef} />
        </div>
    )
}
