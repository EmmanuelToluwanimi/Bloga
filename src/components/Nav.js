import React from 'react';
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import bloglp from "../assets/image/bloglp.jpg";

export default function Nav() {


    const user = {
        name: 'Adekunle Ajasin',
        imagep: bloglp
    }

    let navmenu;

    if (user) {
        navmenu = <Link className="text-white d-flex gap-2 btn border-white" to="/dashboard">
            <img src={user.imagep} alt="userimage" width="45px" className="img img-fluid rounded-circle" />
            <span>{user.name}</span>
        </Link>
    } else {
        navmenu = <div className="d-flex gap-2">
            <Link className="btn btn-outline-primary text-white" to="/login" >
                Log In
            </Link>

            <Link className="btn btn-outline-success text-white" to="/signup" >
                Sign In
            </Link>
        </div>
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" className="p-0" sticky="top">
                <Container>
                    <Navbar.Brand href="/">
                        <h2 className="pb-1">
                            <span style={{ color: 'lightblue' }}>B</span>loga
                        </h2>
                    </Navbar.Brand>

                    {navmenu}
                </Container>
            </Navbar>
        </>
    )
}
