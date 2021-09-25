import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './writeblogs.css';
import { BsImage } from "react-icons/bs";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../models/Contexts/Authcontext';
import { useNewBlog } from '../models/Contexts/Blogcontext';



export default function Writeblogs() {
    const { currentUser } = useAuth();
    const {
        newBlog,
        getUserDetail,
        addCoverImg,
        addTitle,
        addContent,
        changeStatus

    } = useNewBlog();

    const imgRef = useRef();
    const quillRef = useRef();
    
    const [value, setValue] = useState('');
    const [previ, setPrevi] = useState(false);

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean'],

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
        'link', 'image',
    ];

    useEffect(() => {
        getUserDetail(currentUser)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        addContent(value)
        // eslint-disable-next-line
    }, [value])

    const placeHolder = () => {
        const content = newBlog.content === '';
        const title = newBlog.title === '';
        const img = newBlog.coverImg === '';

        if (content && title && img) {
            return `<h1 id="placeholder">Nothing to preview here</h1>`
        }

        return newBlog.content;
    }

    function createMarkup() {
        return { __html: placeHolder() };
    }

    return (
        <>
            <section className="writeblogs w-100">
                <div className="writeblogs-holder w-100 bg-white shadow p-4">
                    <div className="publish-container text-end">
                        <Button variant="primary" className="mx-3" onClick={() => { setPrevi(!previ) }}>{previ ? 'Edit' : 'Preview'}</Button>
                        <Button variant="outline-success" onClick={changeStatus}>Publish</Button>
                    </div>

                    {previ ?
                        (
                            <div className="post-preview-wrapper">

                                <h1 className="my-3 text-center">{newBlog.title}</h1>

                                {
                                    newBlog.coverImg && (
                                        <div className="p-img-block">
                                            <img src={newBlog.coverImg} alt="coverimg" />
                                        </div>
                                    )
                                }

                                <div className="preview-blog" dangerouslySetInnerHTML={createMarkup()}></div>
                            </div>
                        ) :
                        (
                            <div className="editor-container p-3">

                                <div className="cp-container">

                                    <label className="cp-btn btn btn-light text-muted text-center">
                                        <BsImage />
                                        <span className="px-3">Add a cover image</span>
                                        <input
                                            type="file"
                                            size="60"
                                            ref={imgRef}
                                            onChange={addCoverImg}
                                        />
                                    </label>

                                    {
                                        newBlog.coverImg && (
                                            <div className="img-container my-3">
                                                <img src={newBlog.coverImg} alt="coverimg" width="100%" height="100%" />
                                            </div>
                                        )
                                    }

                                </div>

                                <input
                                    type="text"
                                    placeholder="Title..."
                                    value={newBlog.title}
                                    onChange={(e) => addTitle(e.target.value)}
                                    className="title-inp my-4" />

                                <ReactQuill theme="snow"
                                    value={value}
                                    modules={modules}
                                    formats={formats}
                                    onChange={setValue}
                                    ref={quillRef}
                                    placeholder="Write your blog post" />

                            </div>
                        )
                    }
                </div>
            </section>
        </>
    )
}
