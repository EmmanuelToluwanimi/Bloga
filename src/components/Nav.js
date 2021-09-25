import { Avatar } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import React from 'react';
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
// import bloglp from "../assets/image/bloglp.jpg";
import { useAuth } from '../models/Contexts/Authcontext';

export default function Nav() {
    const { currentUser } = useAuth();

    // const user = {
    //     name: 'Adekunle Ajasin',
    //     imagep: bloglp
    // }


    let navmenu;
    // if (currentUser) {
    //     console.log(currentUser.displayName);
    // }

    if (currentUser) {
        navmenu = <Link className="text-white d-flex align-items-center gap-2 btn py-0" to="/dashboard">
            <Avatar alt="Remy Sharp">
                <Person />
            </Avatar>
            <span>
                {
                    currentUser.displayName === null ? "Dashboard" : currentUser.displayName
                }
            </span>
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
                    <Navbar.Brand>
                        <Link to="/" className="btn">
                            <h2 className="pb-1 text-white">
                                <span style={{ color: 'lightblue' }}>B</span>loga
                            </h2>
                        </Link>
                    </Navbar.Brand>

                    {navmenu}
                </Container>
            </Navbar>
        </>
    )
}
