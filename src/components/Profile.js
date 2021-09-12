import React from 'react';
import bloglp from "../assets/image/bloglp.jpg";
import './profile.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Profile() {
    return (
        <>
            <section className="user-profile">
                <div className="profile-container bg-white p-4 rounded shadow">





                    <Form className="">

                        <div className="user-img-container">

                            <div className="img-div">
                                <img src={bloglp} alt="bloglp" className="user-img thumbnail img img-fluid" />
                            </div>

                        </div>

                        <Form.Group className="my-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                            <Form.Text className="text-muted">
                                Useename goes here
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="my-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>


                </div>
            </section>
        </>
    )
}
