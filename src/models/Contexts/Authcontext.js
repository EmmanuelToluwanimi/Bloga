import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import app from '../../config/firebase';
import { authReducer } from '../Reducers/authReducer';
import { ACTIONS } from '../Reducers/action';
import { useHistory } from 'react-router-dom';



const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const auth = getAuth(app);
    const history = useHistory();
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false);
    const [currentUser, dispatch] = useReducer(authReducer);

    function signup(email, password, username) {
        setLoading(!loading);
        const userdata = { displayName: username };

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                updateuser(userdata);
                const user = userCredential.user;
                dispatch({ type: ACTIONS.SET_USER, payload: { user: user } });
                console.log(user.email);
                setLoading(!loading);
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

    function login(email, password) {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                setLoading(!loading);
                const user = userCredential.user;
                dispatch({ type: ACTIONS.SET_USER, payload: { user: user } })
                // console.log(user);
                history.push("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage);
                setLoading(!loading)
                setError('Failed to login')
            });
    }

    async function updateuser(userdata) {
        await updateProfile(auth.currentUser, userdata).then(() => {
            // Profile updated!
            // ...
            setLoading(!loading);
        }).catch((error) => {
            // An error occurred
            // ...
            setLoading(!loading);
            setError('Failed to update profile');
        });
    }

    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
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
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
