import React, { useEffect, useRef, useState } from "react"; // Import useState
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../auth";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom"; // Import Navigate
import img from "../assets/images/login.jpg";

const SignIn = () => {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const formRef = useRef(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                if (error.code === "auth/invalid-credential") {
                    setError("User is not registered. Please sign up.");
                } else {
                    setError(error.message);
                }
            }
            setIsSigningIn(false);
        }
    }

    const onGoogleSignIn = async () => {
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
            } catch (error) {
                setError(error.message);
            }
            setIsSigningIn(false);
        }
    }

    useEffect(() => {
        const formHeight = formRef.current.clientHeight;
        document.documentElement.style.setProperty('--form-height', `${formHeight}px`);
    }, []);

    useEffect(() => {
        if (userLoggedIn) {
            navigate('/dashboard'); // Redirect to dashboard if user is already logged in
        }
    }, [userLoggedIn, navigate]);

    return (
        <div>
            {userLoggedIn && <Navigate to="/dashboard" />}
            <div className="flex justify-center items-center h-screen">
                <div ref={formRef} className="flex flex-col items-center justify-center w-auto p-10 bg-none md:bg-gray-100 rounded-none md:rounded-lg">
                    <div className="w-96 bg-white p-8 rounded-lg shadow-none md:shadow-lg">
                        <h1 className="text-2xl font-bold text-center mb-5">Sign In</h1>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <form className="flex flex-col space-y-5" onSubmit={onSubmit}>
                            <input
                                type="text"
                                placeholder="Email"
                                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-primary shadow-inner shadow-black/40"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-primary shadow-inner shadow-black/40"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <a href="/" className="text-primary text-sm text-right italic">Forgot Password?</a>
                            <button type="submit" className="bg-primary text-white p-3 rounded-lg hover:bg-primary/2 focus:outline-none transition duration-500">Sign In</button>
                            <p className="text-center text-sm mt-5">or</p>
                            <div className="flex border space-x-5 cursor-pointer justify-center bg-accent text-primary p-4 rounded-lg hover:bg-primary/2 focus:outline-none transition duration-500 shadow-lg" onClick={onGoogleSignIn}>
                                <FcGoogle className="text-2xl text-primary" />
                                <p>Sign In with Google</p>
                            </div>
                            <p className="text-center text-sm mt-5">
                                Don't have an account? <a href="/signup" className="text-primary">Sign Up</a>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="relative hidden md:block">
                    <img src={img} alt="Login" className="object-cover rounded-lg" style={{ height: "var(--form-height)", maxHeight: "100%", width: "auto" }} />
                </div>
            </div>
        </div>
    );
}

export default SignIn;
