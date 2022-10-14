import {initializeApp} from 'firebase/app';
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updatePassword,
} from "firebase/auth";

const config = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_APP_ID}`,
    measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`
};

class Firebase {
    constructor() {
        this.app = initializeApp(config);
        this.auth = getAuth();
    }

    // *** Auth API ***

    // todo: change error message based on error received - not here, in login/singup/forgotpass pages

    // todo: error handling when a creating a user that already exists
    doCreateUserWithEmailAndPassword = (email, password) =>
        createUserWithEmailAndPassword(this.auth,email,password)

    // todo: error handling when a user doesn't exists
    doSignInWithEmailAndPassword = (email, password) =>
        signInWithEmailAndPassword(this.auth, email, password);

    // todo: add nav("/login")
    doSignOut = () => signOut(this.auth);

    // todo: error handling - email doesn't exists
    doPasswordReset = email => sendPasswordResetEmail(this.auth, email);

    doPasswordUpdate = password =>
        updatePassword(this.auth.currentUser, password);
}

export default Firebase;