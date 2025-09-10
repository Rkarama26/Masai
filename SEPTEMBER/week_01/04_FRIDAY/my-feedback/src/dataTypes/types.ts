export interface Feedback {
    id: string;
    name: string;
    comment: string;
    rating: number;  // e.g. 1 - 5
    date: string;   
}

export interface FeedbackState {
    feedbackList: Feedback[];
}
