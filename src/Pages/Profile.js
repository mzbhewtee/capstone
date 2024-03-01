import React from "react";
import { useAuth } from "../context/authContext";
import { doSignOut } from "../auth";
import { useNavigate } from "react-router-dom";
import profile from "../assets/images/profile.png";

function Profile() {
    const { currentUser, userLoggedIn } = useAuth();
    const navigate = useNavigate(); 

    const handleLogout = async () => {
        try {
            await doSignOut();
            navigate('/'); // Redirect to the home page after logout
        } catch (error) {
            console.log("Error signing out: ", error);
        }
    };

    return (
        <div>
            {userLoggedIn && currentUser && (
                    <>
                    <div className="flex items-center space-x-4">
                        <img src={profile} alt="Profile" className="w-7 md:w-10 h-7 md:h-10 rounded-full" />
                        <p className="text-gray-700 text-xs md:text-md md:font-medium">{currentUser.email}</p>
                        <button onClick={handleLogout} className="text-gray-700 text-xs md:text-md md:font-medium">Logout</button>
                    </div>
                    </>
                )}
        </div>
    );
}

export default Profile;