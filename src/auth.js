import { auth } from './firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword,  signInWithPopup } from 'firebase/auth';

export const doCreateUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const doSignUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const doSignOut = () => {
    return auth.signOut();
};