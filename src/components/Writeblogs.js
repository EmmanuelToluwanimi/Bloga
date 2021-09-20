import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './writeblogs.css';
import { BsImage } from "react-icons/bs";
import bloglp from "../assets/image/bloglp.jpg";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function Writeblogs() {
    const [value, setValue] = useState('');
    const [previ, setPrevi] = useState(false);
    const blogPost = {
        title: '',
        coverImg: '',
        Category: '',
        content: '',
        likes: [],
        read: 0,
        published: false,
        author: {
            userId: '',
            displayName: '',
            imgUrl: ''
        },

    }

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
            ['code-block'],

        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'codeblock'
    ];

    // function handlePrevi() {
    //     setPrevi(!previ);
    // }

    function getText() {
        console.log(value);
    }

    function createMarkup() {
        return { __html: value };
    }

    return (
        <>
            <section className="writeblogs w-100">
                <div className="writeblogs-holder w-100 bg-white shadow p-4">
                    <div className="publish-container text-end">
                        <Button variant="primary" className="mx-3" onClick={() => { setPrevi(!previ) }}>{previ ? 'Edit' : 'Preview'}</Button>
                        <Button variant="outline-success" onClick={getText}>Publish</Button>
                    </div>

                    {previ ?
                        <div className="preview-blog" dangerouslySetInnerHTML={createMarkup()}>
                            
                        </div> :
                        <div className="editor-container p-3">

                            <div className="cp-container">

                                <label className="cp-btn btn btn-light text-muted text-center">
                                    <BsImage />
                                    <span className="px-3">Add a cover image</span>
                                    <input type="file" size="60" />
                                </label>

                                <div style={value === '' ? { display: 'none' } : { display: 'none' }} className="img-container my-3">
                                    <img src={bloglp} alt="coverimg" width="100%" height="100%" />
                                </div>

                            </div>

                            <input type="text" placeholder="Title..." className="title-inp my-4" />

                            <ReactQuill theme="snow"
                                value={value}
                                modules={modules}
                                formats={formats}
                                onChange={setValue}
                                placeholder="Write your blog post" />

                        </div>
                    }
                </div>
            </section>
        </>
    )
}
