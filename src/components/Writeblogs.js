import React from 'react';
import Button from 'react-bootstrap/Button';
import './writeblogs.css';
import { BsImage } from "react-icons/bs";
import bloglp from "../assets/image/bloglp.jpg";

export default function Writeblogs() {
    return (
        <>
            <section className="writeblogs w-100">
                <div className="writeblogs-holder w-100 bg-white shadow p-4 rounded">
                    <div className="publish-container text-end">
                        <Button variant="outline-primary" size="lg">Publish</Button>
                    </div>

                    <div className="editor-container p-3">

                        <div className="cp-container">
            
                            <label className="cp-btn btn btn-light text-muted text-center">
                                <BsImage />
                                <span className="px-3">Add a cover image</span>
                                <input type="file" size="60" />
                            </label>

                            <div className="img-container  my-3">
                                <img src={bloglp} alt="coverimg"  width="100%" height="100%" />
                            </div>

                        </div>

                        <input type="text" placeholder="Title..." className="title-inp mt-4" />

                        

                    </div>
                </div>
            </section>
        </>
    )
}
