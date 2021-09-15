import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
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
    const [currentUser, dispatch] = useReducer(authReducer);

    function signup(email, password) {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch({ type: ACTIONS.SET_USER, payload: { user: user } })
                console.log(user.email);
                history.push("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage);
            });
    }

    function login(email, password) {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch({ type: ACTIONS.SET_USER, payload: { user: user } })
                // console.log(user);
                history.push("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage);
            });
    }

    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch({ type: ACTIONS.SET_USER, payload: { user: undefined } })
            history.push("/login");
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
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
