import { useEffect, useState } from 'react'
import './App.css'
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import type { Feedback } from './types';

const App: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('feedbacks');
    if (stored) {
      setFeedbacks(JSON.parse(stored));
    }
  }, []);

  const handleAddFeedback = (feedback: Feedback) => {
    const updated = [feedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem('feedbacks', JSON.stringify(updated));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Aromatic Bar Feedback System</h1>
      <FeedbackForm onAddFeedback={handleAddFeedback} />
      <FeedbackList feedbacks={feedbacks} />
    </div>
  );
};

export default App;