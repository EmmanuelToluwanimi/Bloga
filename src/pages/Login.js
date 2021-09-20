import React, { useRef } from 'react';
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useAuth } from '../models/Contexts/Authcontext';
// import Nav from '../components/Nav';


export default function Login() {


    const emailRef = useRef();
    const passwordRef = useRef();
    const { loading, login, error } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();


        await login(
            emailRef.current.value,
            passwordRef.current.value
        );



    }

    return (
        <>
            ]
            <Container
                className="d-flex align-items-center justify-content-center mt-5">

                <div className="w-100" style={{ maxWidth: '400px' }}>

                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">
                                Login
                            </h2>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form onSubmit={handleSubmit}>

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
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <div className="w-100 text-center mt-2">
                        Create new account here -  <Link to="/signup">Sign Up</Link>
                    </div>

                </div>

            </Container>
        </>
    )
}
