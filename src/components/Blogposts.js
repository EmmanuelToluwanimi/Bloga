import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './blogpost.css';
import bloglp from "../assets/image/bloglp.jpg";

export default function Blogposts() {
    return (
        <>
            <div className="blog-section mt-4">
                <h3 className="blog-nav p-2 border-bottom">Blogposts</h3>
                <div className="blog-wrapper">

                    <div className="blog-holder">
                        <Card>
                            <Card.Img variant="top" src={bloglp} />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="blog-holder">
                        <Card>
                            <Card.Img variant="top" src={bloglp} />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="blog-holder">
                        <Card>
                            <Card.Img variant="top" src={bloglp} />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>


                </div>
            </div>
        </>
    )
}
