import React from 'react';
import type { Feedback } from '../types';

interface Props {
  feedbacks: Feedback[];
}

const FeedbackList: React.FC<Props> = ({ feedbacks }) => {
  if (feedbacks.length === 0) {
    return <p style={{ textAlign: 'center' }}>No feedback available.</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
      <h2>All Feedback</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {feedbacks.map((fb) => (
          <li key={fb.id} style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
            <p><strong>Name:</strong> {fb.name}</p>
            <p><strong>Email:</strong> {fb.email}</p>
            <p><strong>Rating:</strong> {fb.rating}</p>
            <p><strong>Message:</strong> {fb.message}</p>
            <p><small>{fb.date}</small></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
