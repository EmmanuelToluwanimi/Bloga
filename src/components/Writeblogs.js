import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './writeblogs.css';
import { BsImage } from "react-icons/bs";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../models/Contexts/Authcontext';


export default function Writeblogs() {
    const { currentUser } = useAuth();
    const titleRef = useRef();
    const imgRef = useRef();
    const quillRef = useRef();
    const [coverImga, setCoverImga] = useState(null);
    const [value, setValue] = useState('');
    const [previ, setPrevi] = useState(false);
    const [blogPost, setBlogPost] = useState(
        {
            title: '',
            coverImg: coverImga,
            Category: '',
            content: value,
            likes: [],
            read: 0,
            published: false,
            author: {
                userId: currentUser.uid,
                displayName: currentUser.displayName,
                photoUrl: ''
            },

        }
    )

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

    function addCoverImg(e) {
        const reader = new FileReader();
        const imgfile = e.target.files[0]

        if (imgfile) {
            reader.readAsDataURL(imgfile)
        };

        reader.onload = (readerEvent) => {
            setCoverImga(readerEvent.target.result)
        }

    }

    function getText() {
        const updatepost = {
            ...blogPost,
            published: !blogPost.published,
            content: quillRef.current.state.value
        }
        setBlogPost(updatepost);

        handlePost(updatepost)
    }

    function handlePost(updatepost) {
        console.log(updatepost);
    }

    const placeHolder = () => {
        return value === '' ? `<h1 id="placeholder">Nothing to preview here</h1>` : value
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
                                    <input
                                        type="file"
                                        size="60"
                                        ref={imgRef}
                                        onChange={addCoverImg}
                                    />
                                </label>

                                {
                                    coverImga && (
                                        <div className="img-container my-3">
                                            <img src={coverImga} alt="coverimg" width="100%" height="100%" />
                                        </div>
                                    )
                                }

                            </div>

                            <input
                                type="text"
                                placeholder="Title..."
                                ref={titleRef}
                                onChange={() => setBlogPost(
                                    {
                                        ...blogPost,
                                        title: titleRef.current.value
                                    }
                                )}
                                className="title-inp my-4" />

                            <ReactQuill theme="snow"
                                value={value}
                                modules={modules}
                                formats={formats}
                                onChange={setValue}
                                ref={quillRef}
                                placeholder="Write your blog post" />

                        </div>
                    }
                </div>
            </section>
        </>
    )
}
