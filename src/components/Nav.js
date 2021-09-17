import React from 'react';
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import bloglp from "../assets/image/bloglp.jpg";
import { useAuth } from '../models/Contexts/Authcontext';

export default function Nav() {
    const { currentUser } = useAuth();

    // const user = {
    //     name: 'Adekunle Ajasin',
    //     imagep: bloglp
    // }

    let navmenu;
    console.log(currentUser);

    if (currentUser) {
        navmenu = <Link className="text-white d-flex gap-2 btn border-white" to="/dashboard">
            <img src={bloglp} alt="userimage" width="45px" className="img img-fluid rounded-circle" />
            <span>{currentUser.displayName}</span>
        </Link>
    } else {
        navmenu = <div className="d-flex gap-2">
            <Link className="btn btn-outline-primary text-white" to="/login" >
                Log In
            </Link>

            <Link className="btn btn-outline-success text-white" to="/signup" >
                Sign Up
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
