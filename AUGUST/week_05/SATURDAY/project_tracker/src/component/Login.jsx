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
import { AuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router';


const Login = () => {

    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setmessage] = useState("");
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            setmessage("Login successful!");
            navigate("/dashboard");
        } catch (err) {
            setmessage("Invalid email or password");
        }
    };

    return (
        <Box
            position="absolute"
            top="50%"
            left="50%"
            margin="auto"
            transform="translate(-50%, -50%)"
            textAlign="center"
            w={{ base: "250px", sm: "300px", lg: "400px" }}

        >
            <form onSubmit={handleSubmit}>
                <Fieldset.Root size="lg" maxW="md" >
                    <Stack>
                        <Fieldset.Legend>Login</Fieldset.Legend>
                        <Fieldset.HelperText>

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
                        Login
                    </Button>

                    <Text
                        color="gray.600"
                        fontSize="xs"
                        textAlign="left"
                    >Already have an Account?  <Link to="/login" >Create here</Link> </Text>
                </Fieldset.Root>

                {message && <Text>{message}</Text>}
            </form>
        </Box>
    );
}

export default Login;
