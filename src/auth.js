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


// Function to update the password
export const doPasswordUpdate = (password) => {
    return new Promise((resolve, reject) => {
        // Check if there is a logged-in user
        const user = auth.currentUser;
        if (!user) {
            reject(new Error('No user is currently logged in.'));
            return;
        }

        // Update the password
        user.updatePassword(password).then(() => {
            resolve('Password updated successfully.');
        }).catch((error) => {
            reject(error);
        });
    });
};
