import React from 'react';
import { Navbar, Container } from "react-bootstrap";

export default function Nav() {
    return (
        <>
            <Navbar bg="dark" variant="dark" className="p-0" sticky="top">
                <Container>
                    <Navbar.Brand href="#home">
                        <h2 className="pb-1">
                            <span style={{color: 'lightblue'}}>B</span>loga
                        </h2>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}
