import React from 'react';
import { Navbar, Container } from "react-bootstrap";

export default function Nav() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <h2>
                            <span style={{color: 'skyblue'}}>B</span>loga
                        </h2>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}
