import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

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
} from "@chakra-ui/react"
import { registerUser } from '../redux/actions/authActions';


const Register = () => {

    const dispatch = useDispatch();
    const { loading, token, error, user } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registerUser({ email, password }));
    }


    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate])



    return (
        <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            textAlign="center"

        >
            <form onSubmit={handleRegister}>
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
                            <Field.Label color="gray.500" >(use - eve.holt@reqres.in)</Field.Label>
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
                            <Field.Label color="gray.500" >(use - pistol)</Field.Label>
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
                        Submit
                    </Button>

                    <Text
                        color="gray.600"
                        fontSize="xs"
                        textAlign="left"
                    >Already have an Account?  <Link to="/login" >Login here</Link> </Text>
                </Fieldset.Root>

                {token && <Text color="green.700"
                    fontWeight="semibold"
                    fontSize="sm"
                    mt={5}
                    textAlign="left"
                >Register Successful</Text>}
                {error && <Text color="red.700"
                    fontWeight="semibold"
                    fontSize="sm"
                    mt={5}
                    textAlign="left"
                >Register Failed</Text>}
            </form>
        </Box>
    );
}

export default Register;
