import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    updatePassword,
    updateEmail
} from "firebase/auth";
import {
    Timestamp,
    collection,
    addDoc,
    getFirestore
} from "firebase/firestore";
import app from '../../config/firebase';
import { authReducer } from '../Reducers/authReducer';
import { ACTIONS } from '../Reducers/action';
import { useHistory } from 'react-router-dom';



const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const db = getFirestore();
    const auth = getAuth(app);
    const history = useHistory();
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false);
    const [currentUser, dispatch] = useReducer(authReducer);
    const userdata = {
        uid: '',
        displayName: '',
        email: '',
        password: '',
        imgUrl: '',
        createdAt: '',
        followers: [],
        following: [],
        noOfPostRead: 0,
        likedPosts: [],
        postCreated: []
    }

    function signup(email, password, username) {
        setLoading(!loading);
        const userdata = { displayName: username };

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                setLoading(false);
                updateuser(userdata);
                const user = userCredential.user;
                dispatch({ type: ACTIONS.SET_USER, payload: { user: user } });
                addUserdata(user, password, username)
                // console.log(user.email);  
                history.push("/");

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage);
                setLoading(!loading)
                setError('Failed to create account')
            });


    }

    async function addUserdata(user, password, username) {
        const updateUserdata = {
            ...userdata,
            uid: user.uid,
            email: user.email,
            password: password,
            createdAt: Timestamp.now().toDate(),
            displayName: username
        }


        try {
            const docRef = await addDoc(collection(db, "users"), updateUserdata);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    function login(email, password) {
        setLoading(!loading);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                setLoading(false);
                const user = userCredential.user;
                dispatch({ type: ACTIONS.SET_USER, payload: { user: user } })
                // console.log(user);        
                history.push("/");
            })
            .catch((error) => {
                setLoading(!loading);
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage);
                console.log(loading);
                setError('Incorrect user details')
            });
    }

    function updateuser(userdata) {
        setLoading(!loading);

        updateProfile(auth.currentUser, userdata).then(() => {
            // Profile updated!
            // ...

            // history.listen()
            console.log('Updated successfully');
            setLoading(!loading);
        }).catch((error) => {
            // An error occurred
            // ...
            setLoading(!loading);
            setError('Failed to update profile');
        });
    }

    function changePassword(newpassword) {
        updatePassword(auth.currentUser, newpassword).then(() => {
            // Update successful.
            console.log('password changed');
        }).catch((error) => {
            // An error ocurred
            // ...
            console.log(error);
        });
    }

    function changeEmail(newemail) {

        updateEmail(auth.currentUser, newemail).then(() => {
            // Email updated!
            console.log('email changed');
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
            console.log(error);
        });
    }


    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            setLoading(false)
            dispatch({ type: ACTIONS.SET_USER, payload: { user: undefined } })
            // history.push("/login");
            history.replace("/login")
            console.log('Sign-out successful');
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }



    useEffect(() => {
        const unsubscribe = () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // const uid = user.uid;
                    dispatch({ type: ACTIONS.GET_CURRENT_USER, payload: { user: user } })
                    console.log(JSON.stringify(user.email) + 'is Signed In');
                    // console.log(userdata);
                    // ...
                } else {
                    // User is signed out
                    // ...
                    console.log('No current user Signed In');
                }
            });
        };

        return unsubscribe();

    }, [auth])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        error,
        setError,
        loading,
        updateuser,
        changeEmail,
        changePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
