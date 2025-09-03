import React, { useContext, useState } from 'react';

import {
    Button,
    Field,
    Fieldset,
    For,
    Input,
    NativeSelect,
    Stack,
    Box,
    Text,
    Link,
} from "@chakra-ui/react"
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router';

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setmessage] = useState("");
    const { register } = useContext(AuthContext)
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, password);
            setmessage("User registered successfully!");
            navigate("/dashboard");
        } catch (err) {
            setmessage("Registering failed");
        }
    };

    return (
        <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            textAlign="center"
            w={{ base: "250px", sm: "300px", lg: "400px" }}


        >
            <form onSubmit={handleSubmit}>
                <Fieldset.Root size="lg" maxW="md" >
                    <Stack>
                        <Fieldset.Legend>Register</Fieldset.Legend>
                        <Fieldset.HelperText>
                            Please provide your contact details below.
                        </Fieldset.HelperText>
                    </Stack>


                    <Fieldset.Content>


                        <Field.Root>
                            <Field.Label>Email Address</Field.Label>
                            <Field.Label color="gray.500" >(use - demo@gmail.com)</Field.Label>
                            <Input border="sm"
                                name="Email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Password </Field.Label>
                            <Field.Label color="gray.500" >(use - demo)</Field.Label>
                            <Input border="sm"
                                name="password"
                                type="password"
                                placeholder="******"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Field.Root>

                    </Fieldset.Content>

                    <Button type="submit" alignSelf="flex-start">
                        Register
                    </Button>

                    <Text
                        color="gray.600"
                        fontSize="xs"
                        textAlign="left"
                    >Don't have an Account  <Link to="/register" >Login here</Link> </Text>
                </Fieldset.Root>

                {message && <Text>{message}</Text>}
            </form>
        </Box>
    );
}

export default Register;
