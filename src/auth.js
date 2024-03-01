import { auth } from './firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';

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

export const doSignOut = () => {
    return auth.signOut();
};

// export const doPasswordReset = (email) => {
//     return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordUpdate = (password) => {
//     return updatePassword(auth.currentUser, password);
// };

// export const doEmailUpdate = (email) => {
//     return updateEmail(auth.currentUser, email);
// };

// export const doEmailVerification = () => {
//     return sendEmailVerification(auth.currentUser);
// };