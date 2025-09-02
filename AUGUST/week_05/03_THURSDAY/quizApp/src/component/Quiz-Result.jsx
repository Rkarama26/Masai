import React from 'react';
import { useLocation, useNavigate } from "react-router";
import { Button, Box, Text } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { fetchQuiz } from '../redux/actions/quizActions';

const QuizResult = () => {

    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { score, total } = state;

    return (
        <>
            <Box p={5} flex textAlign="center">
                <Text fontSize="2xl" mb={4}>
                    Quiz Completed!
                </Text>
                <Text fontSize="xl" mb={4}>
                    Your Score: {score} / {total}
                </Text>
                <Button onClick={() => {
                    dispatch(fetchQuiz()); // reload the quiz questions
                    navigate("/dashboard");
                }}>
                    Retake Quiz
                </Button>
            </Box>
        </>
    );
}

export default QuizResult;
