import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => unsubscribe();
    }, []);

    async function initializeUser(user) {
        console.log("User:", user);
        if (user) {
            setCurrentUser(user);
            setUserLoggedIn(true);
            try {
                const userData = await getUserData(user.uid);
                if (userData) {
                    // If user data exists, merge it with the currentUser object
                    setCurrentUser({ ...user, ...userData });
                } else {
                    // If user data doesn't exist, create a profile with default values
                    await createUserProfile(user.uid, user.email);
                }
            } catch (error) {
                console.error("Error initializing user:", error);
            }
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }
    
    

    async function createUserProfile(uid, email) {
        try {
            const userRef = doc(db, "users", uid);
            const userDoc = await getDoc(userRef);
            if (!userDoc.exists()) {
                await setDoc(userRef, {
                    email: email,
                    fullname: "",
                    pronouns: "",
                    bio: "",
                    profilePictureURL: ""
                });
            }
        } catch (error) {
            console.error("Error creating user profile:", error);
        }
    }

    

    async function getUserData(uid) {
        try {
            const userRef = doc(db, "users", uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                return userDoc.data();
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
    }

    const value = {
        currentUser,
        loading,
        userLoggedIn,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
