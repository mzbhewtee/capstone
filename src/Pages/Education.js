import React, { useState, useEffect } from "react";
import QP from "../Quantum Physics/QP";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { auth } from "../firebase"; // Import auth from Firebase
import { Sidebar } from "../components/Sidebar";
import SimulatorsComp from "../components/SimulatorsComp";
import ocw from "../assets/images/ocw.svg";
import harvard from "../assets/images/harvard.svg";
import caltech from "../assets/images/caltech.png";

function Education() {
    const [selectedContent] = useState('quantum_physics'); // Set default selectedContent to 'quantum_physics'
    const navigate = useNavigate(); // Initialize navigate hook


    useEffect(() => {
        // Check if user is logged in
        const unsubscribeAuth = auth.onAuthStateChanged(user => {
            if (!user) {
                // If user is not logged in, redirect to login page
                navigate('/signin');
            }
        });

        return () => {
            // Unsubscribe from auth state changes
            unsubscribeAuth();
        };
    }, [navigate]); // Add navigate to dependency array

    return (
        <div className="">
            <Sidebar />
            <div className=" mr-10 ml-10 font-link flex flex-col mb-40 md:ml-20 md:mr-20">
                <div className="flex flex-col md:flex-row justify-center items-center mt-10">
                    {/* Render content based on selectedContent */}
                    {selectedContent === 'quantum_physics' && (
                        <>
                            <QP />
                        </>
                    )}
                    {selectedContent === 'quantum_computing' && (
                        <>
                            <h1>Coming Soon</h1>
                        </>
                    )}
                </div>

            </div>
        </div>

    );
}

export default Education;
