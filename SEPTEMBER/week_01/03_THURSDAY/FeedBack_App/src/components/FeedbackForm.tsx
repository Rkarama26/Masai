import React, { useState } from 'react';
import type { Feedback } from '../types';

interface Props {
  onAddFeedback: (feedback: Feedback) => void;
}

const FeedbackForm: React.FC<Props> = ({ onAddFeedback }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) return;

    const newFeedback: Feedback = {
      id: Date.now(),
      name,
      email,
      rating,
      message,
      date: new Date().toLocaleString(),
    };

    onAddFeedback(newFeedback);
    setSubmitted(true);
    setName('');
    setEmail('');
    setRating(1);
    setMessage('');
  };

  if (submitted) {
    return <p style={{ textAlign: 'center' }}>Thank you for your feedback!</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto' }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />

      <label>
        Rating (1-5):
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
          style={{ marginLeft: '10px' }}
        />
      </label>

      <textarea
        placeholder="Your feedback..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '10px', width: '100%', height: '80px' }}
      />

      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
