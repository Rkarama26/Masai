import React, { useState, useContext } from 'react';
import { ChatContext } from '../ChatContext';

const ChatInput = () => {

  const URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
  const [input, setInput] = useState('');
  const { addMessage, setLoading, loading } = useContext(ChatContext);

  const handleSend = async () => {
    if (!input.trim()) return;

    addMessage('user', input);
    setLoading(true);

    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_GEMINI_API_KEY}`,
        },

        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      addMessage('assistant', data.reply);
    } catch (err) {
      console.error(err);
      addMessage('assistant', 'An error occurred. Please try again.');
    } finally {
      setInput('');
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={loading}
        aria-label="Chat input"
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default ChatInput;
