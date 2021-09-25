import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { ACTIONS } from '../Reducers/action';
import { newBlogReducer } from '../Reducers/newBlogReducer';
import {
    Timestamp,
    collection,
    addDoc,
    getFirestore
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useHistory } from 'react-router-dom';


const BlogContext = createContext()

export function useNewBlog() {
    return useContext(BlogContext);
}

export function BlogProvider({ children }) {
    const db = getFirestore();
    const history = useHistory();
    const storage = getStorage();

    const [dImg, setDImg] = useState('');

    const [newBlog, dispatch] = useReducer(newBlogReducer, {
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
        dispatch({
            type: ACTIONS.CHANGE_NEW_BLOG_STATUS,
            payload: {
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
        const storageRef = ref(storage, `postImages/${dImg}`);
        const uploadTask = uploadBytes(storageRef, newBlog.coverImg, 'data_url');

        uploadTask.on('state_changed',
            (snapshot) => {
                console.log('Uploaded a blob or file!');
            },
            (error) => {
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
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    const updateBlog = { ...newBlog, coverImg: downloadURL }
                    console.log(updateBlog);
                    sendPostToFirebase(updateBlog);

                });
            }
        )
    }

    async function sendPostToFirebase(newBlog) {


        try {
            const docRef = await addDoc(collection(db, "users"), newBlog);
            history.replace('/')
            console.log("Document written with ID: ", docRef.id);
            resetBlog();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    function publishPost() {
        if (newBlog.published === false) {
            return console.log('Publish a post');
        }

        if (dImg === '') {
            // return sendPostToFirebase(newBlog)
            return console.log('setFirebase()');
        }

        // return uploadImg()
        return console.log('uploadimg()')


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
        changeStatus
    }

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
}
