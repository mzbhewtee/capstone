import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/images/login.jpg";
import { FcGoogle } from "react-icons/fc";
import { doCreateUserWithEmailAndPassword, doSignUpWithGoogle } from "../auth";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const formRef = useRef(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const formHeight = formRef.current.clientHeight;
        document.documentElement.style.setProperty('--form-height', `${formHeight}px`);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningUp) {
            setIsSigningUp(true);
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                setIsSigningUp(false);
                return;
            }
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/signin');
            } catch (error) {
                setError(error.message);
            }
            setIsSigningUp(false);
        }
    }

    const onGoogleSignUp = async () => {
        if (!isSigningUp) {
            setIsSigningUp(true);
            try {
                await doSignUpWithGoogle();
            } catch (error) {
                setError(error.message);
            }
            setIsSigningUp(false);
        }
    }



    return (
        <div className="flex justify-center items-center h-screen">
            <div ref={formRef} className="flex flex-col items-center justify-center w-auto p-10 bg-none md:bg-gray-100 rounded-none md:rounded-lg">
                <div className="w-96 bg-white p-8 rounded-lg shadow-none md:shadow-lg">
                    <h1 className="text-2xl font-bold text-center mb-5">Sign Up</h1>
                    <form className="flex flex-col space-y-5" onSubmit={onSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-primary shadow-inner shadow-black/40"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-primary shadow-inner shadow-black/40"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-primary shadow-inner shadow-black/40"
                            required
                        />
                        <button type="submit" className="bg-primary text-white p-3 rounded-lg hover:bg-primary/2 focus:outline-none transition duration-500">
                            {isSigningUp ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <p className="text-center text-sm mt-5">or</p>
                        <div className="flex border space-x-5 cursor-pointer justify-center bg-accent text-primary p-4 rounded-lg hover:bg-primary/2 focus:outline-none transition duration-500 shadow-lg" onClick={onGoogleSignUp}>
                            <FcGoogle className="text-2xl text-primary" />
                            <p>Sign Up with Google</p>
                        </div>
                        <p className="text-center text-sm mt-5">
                            Already have an account? <a href="/signin" className="text-primary">Sign In</a>
                        </p>
                    </form>
                </div>
            </div>
            <div className="relative hidden md:block">
                <img src={img} alt="Login" className="object-cover rounded-lg" style={{ height: "var(--form-height)", maxHeight: "100%", width: "auto" }} />
            </div>
        </div>
    );
}

export default Signup;
