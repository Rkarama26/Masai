import { Box, Button, Input, Textarea, NumberInput } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import type { AppDispatch } from "./app/store";
import { addFeedback } from "./redux/feedbackSlice";

export default function FeedbackForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState<number>(5);

    const handleSubmit = () => {
        dispatch(addFeedback({
            id: Date.now().toString(),
            name,
            comment,
            rating,
            date: new Date().toISOString(),
        }));

        setName("");
        setComment("");
        setRating(5);
    };

    return (
        <Box p="4" maxW="md" mx="auto">
            <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                mb="3"
            />
            <Textarea
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                mb="3"
            />
            <NumberInput.Root
                value={rating}
                min={1}
                max={5}
                onChange={(_, value) => setRating(value)}  // Correct event handler signature
                mb="3"
            >
            </NumberInput.Root>

            <Button colorScheme="blue" onClick={handleSubmit}>
                Submit Feedback
            </Button>
        </Box>
    );
}