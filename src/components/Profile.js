import React, { useRef, useState } from 'react';
import bloglp from "../assets/image/bloglp.jpg";
import './profile.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Delete } from '@material-ui/icons';
import { AddAPhoto } from '@material-ui/icons';
import { useAuth } from '../models/Contexts/Authcontext';



export default function Profile() {
    const imgRef = useRef();
    const [imgvalue, setImgvalue] = useState(false);
    const { currentUser } = useAuth();

    function getImage() {

        if (imgRef.current.value) {
            console.log(imgRef.current.value);
            setImgvalue(!imgvalue)
        } else {
            return
        }
    }

    function removeImage() {
        // imgRef.current.reset();
        setImgvalue(!imgvalue);
    }

    let imageDiv;

    if (imgvalue) {
        imageDiv = <>
            <img src={bloglp} alt="bloglp" className="user-img thumbnail img img-fluid" />
            <span className="btn del-btn text-muted border p-1" onClick={removeImage}>
                <Delete />
            </span>
        </>

    } else {
        imageDiv = <label className="add-img-btn btn btn-light text-muted" onChange={getImage}>
            <AddAPhoto />
            <input type="file" size="60" ref={imgRef} />
        </label>

    }


    return (
        <>
            <section className="user-profile">
                <div className="profile-container bg-white p-4 rounded shadow">


                    <Form className="">

                        <div className="user-img-container">

                            <div className="img-div">
                                {imageDiv}
                            </div>

                        </div>

                        <Form.Group className="my-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" defaultValue={currentUser && currentUser.displayName}/>
                            <Form.Text className="text-muted">
                                Username goes here
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="my-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" defaultValue={currentUser && currentUser.email}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="button">
                            Update Profile
                        </Button>
                    </Form>


                </div>
            </section>
        </>
    )
}
