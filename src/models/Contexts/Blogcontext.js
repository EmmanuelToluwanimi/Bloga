import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { ACTIONS } from '../Reducers/action';
import { newBlogReducer } from '../Reducers/newBlogReducer';
import { v4 as uuidv4 } from 'uuid';
import {
    Timestamp,
    collection,
    addDoc,
    getFirestore
} from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadString,
    getDownloadURL,
} from "firebase/storage";
import { useHistory } from 'react-router-dom';


const BlogContext = createContext()

export function useNewBlog() {
    return useContext(BlogContext);
}

export function BlogProvider({ children }) {
    const db = getFirestore();
    const history = useHistory();
    const storage = getStorage();

    const [btnLoadn, setBtnLoadn] = useState(false);
    const [writeError, setWriteError] = useState('');
    const [dImg, setDImg] = useState('');

    const [newBlog, dispatch] = useReducer(newBlogReducer, {
        postId: '',
        title: '',
        coverImg: '',
        Category: '',
        content: '',
        likes: [],
        read: 0,
        published: false,
        createdAt: '',
        author: {
            userId: '',
            displayName: '',
            photoUrl: ''
        },
    })

    function getUserDetail(currentUser) {
        dispatch({
            type: ACTIONS.SET_NEW_BLOG_USER,
            payload: {
                uid: currentUser.uid,
                displayName: currentUser.displayName
            }
        })
    }

    function addCoverImg(e) {
        const reader = new FileReader();
        const imgfile = e.target.files[0]
        setDImg(imgfile.name);

        if (imgfile) {
            reader.readAsDataURL(imgfile)
        };

        reader.onload = (readerEvent) => {
            // send img data to firebase storage
            dispatch({
                type: ACTIONS.ADD_NEW_BLOG_COVER_IMG,
                payload: {
                    coverImg: readerEvent.target.result
                }
            })
        }

    }

    function addTitle(title) {
        dispatch({
            type: ACTIONS.ADD_NEW_BLOG_TITLE,
            payload: {
                title
            }
        })
    }

    function addContent(content) {
        dispatch({
            type: ACTIONS.ADD_NEW_BLOG_CONTENT,
            payload: {
                content
            }
        })
    }

    function changeStatus() {

        const contentX = newBlog.content === '';
        const titleX = newBlog.title === '';

        if (contentX || titleX) {
            return setWriteError('Post must contain atleast a title and content');
        }

        dispatch({
            type: ACTIONS.CHANGE_NEW_BLOG_STATUS,
            payload: {
                postId: uuidv4(),
                published: true,
                createdAt: Timestamp.now().toDate()
            }
        });

    }

    function resetBlog() {
        dispatch({
            type: ACTIONS.RESET_BLOG,
            payload: {
                title: '',
                coverImg: '',
                content: '',
                createdAt: '',
                published: false
            }
        });
    }

    function uploadImg() {
        setBtnLoadn(true);
        const storageRef = ref(storage, `postImages/${dImg}`);
        const uploadTask = uploadString(storageRef, newBlog.coverImg, 'data_url');

        uploadTask.then((snapshot) => {
            console.log('Uploaded a data_url string!');
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(storageRef).then((downloadURL) => {
                console.log('File available at', downloadURL);
                const updateBlog = { ...newBlog, coverImg: downloadURL }
                console.log(updateBlog);
                sendPostToFirebase(updateBlog);

            });
        })
            .catch((error) => {
                setBtnLoadn(false);
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log(`User doesn't have permission to access the object`);
                        break;
                    case 'storage/canceled':
                        console.log(`User canceled the upload`);
                        break;

                    case 'storage/unknown':
                        console.log(`Unknown error occurred, inspect error.serverResponse`);
                        break;
                    default: return error;
                }
            })
    }

    async function sendPostToFirebase(newBlog) {
        setBtnLoadn(true);

        try {
            const docRef = await addDoc(collection(db, "posts"), newBlog);
            resetBlog();
            setBtnLoadn(false);
            history.replace('/');
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            setBtnLoadn(false);
            console.error("Error adding document: ", e);
        }
    }

    function publishPost() {
        // console.log(newBlog);
        if (newBlog.published === false) {
            return;
        }

        if (dImg === '') {
            return sendPostToFirebase(newBlog)
        }

        return uploadImg()

    }

    useEffect(() => {

        publishPost();
        // eslint-disable-next-line
    }, [newBlog.published])

    const value = {
        newBlog,
        getUserDetail,
        addCoverImg,
        addTitle,
        addContent,
        changeStatus,
        writeError,
        btnLoadn
    }

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
}
