import { fetchQuiz, skipQuestion, submitAnswer } from '../redux/actions/quizActions';
import { logoutUser } from '../redux/actions/authActions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Box, Button, VStack, Text, Progress } from "@chakra-ui/react";


const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { loading, questions, error, currentQuestionIndex, score } = useSelector(
        (state) => state.quiz
    );

    useEffect(() => {
        dispatch(fetchQuiz());
    }, [dispatch]);


    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    if (loading) return <Text>Loading Quiz...</Text>;
    if (error) return <Text>Error: {error.error || error}</Text>;
    if (!questions || questions.length === 0) return <Text>No questions available</Text>;

    const currentQuestion = questions[currentQuestionIndex] || {};


    const handleAnswer = (idx) => {
        const isCorrect = idx === currentQuestion.correctOptionIndex;
        dispatch(submitAnswer(isCorrect));

        if (currentQuestionIndex + 1 === questions.length) {
            navigate("/quizresult", {
                state: { score: isCorrect ? score + 1 : score, total: questions.length },
            });
        }
    };

    const handleSkip = () => {
        dispatch(skipQuestion());
        if (currentQuestionIndex + 1 === questions.length) {
            navigate("/quizresult", { state: { score, total: questions.length } });
        }
    };

    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;


    return (
        <>
            <Text textAlign="center" color="gray.900" fontSize="xl" fontWeight="semibold">Welcome to Dashboard 🎉</Text>
            <Button ml={5} onClick={handleLogout}>Logout</Button>

            <Box
                maxW="600px"
                mx="auto"
                mt={10}
                p={6}
                boxShadow="lg"
                borderRadius="lg"
                bg="white"
            >
                {/* Progress Bar */}
                <Progress.Root value={progressPercent} mb={4} colorScheme="green" />

                <VStack spacing={5} align="stretch">
                    <Text fontSize="xl" fontWeight="bold">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </Text>
                    <Text fontSize="lg">{currentQuestion.question}</Text>

                    {/* Options */}
                    {currentQuestion.options.map((opt, idx) => (
                        <Button _hover={{ bg: "gray.300" }}
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            colorScheme="teal"
                            variant="outline"
                        >
                            {opt}
                        </Button>
                    ))}

                    <Button onClick={handleSkip} colorScheme="gray">
                        Skip
                    </Button>
                </VStack>
            </Box>

        </>
    );
}

export default Dashboard;
