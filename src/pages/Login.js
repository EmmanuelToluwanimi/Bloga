import React, { useRef } from 'react';
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
// import Nav from '../components/Nav';


export default function Login() {


    const emailRef = useRef();
    const passwordRef = useRef();



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
                            {'' && <Alert variant='danger'>{''}</Alert>}
                            <Form onSubmit={''}>

                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} min="6" max="12" required />
                                </Form.Group>

                                <Button className="w-100 mt-4"
                                    type="submit"
                                    disabled={''}>
                                    login
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
