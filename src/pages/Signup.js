import React, { useRef } from 'react';
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useAuth } from '../models/Contexts/Authcontext';


export default function Signup() {


    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup, error, setError, loading } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await signup(
                emailRef.current.value,
                passwordRef.current.value,
                usernameRef.current.value,
            );

        } catch (err) {
            console.log(err);
            setError('Failed to create account');
        }

    }



    return (
        <>

            <Container
                className="d-flex align-items-center justify-content-center mt-5">

                <div className="w-100" style={{ maxWidth: '400px' }}>

                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">
                                Sign Up
                            </h2>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" ref={usernameRef} required />
                                    <Form.Text className="text-muted">
                                        Provide a unique name
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                    <Form.Text className="text-muted">
                                        Enter a valid a email address
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} minLength="6" maxLength="12" required />
                                    <Form.Text className="text-muted">
                                        New password must be 6 - 12 strings
                                    </Form.Text>
                                </Form.Group>

                                <Button className="w-100 mt-4"
                                    type="submit"
                                    disabled={loading}>
                                    {loading ? 'Creating account...' : 'Sign Up'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>

                </div>

            </Container>
        </>
    )
}
