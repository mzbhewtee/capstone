import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { doSignOut } from "../auth";
import { useNavigate } from "react-router-dom";
import profile from "../assets/images/profile.png";
import Navigator from "../components/Navigator";

function Settings() {
    const { currentUser, userLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState(currentUser.name); // Assuming name is stored in currentUser
    const [phone, setPhone] = useState(currentUser.phone); // Assuming phone is stored in currentUser

    const handleLogout = async () => {
        try {
            await doSignOut();
            navigate("/"); // Redirect to the home page after logout
        } catch (error) {
            console.log("Error signing out: ", error);
        }
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    return (
        <div className="relative top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-100">
            < Navigator />
            <div>
                {userLoggedIn && currentUser && (
                    <div className="bg-white rounded-lg w-96 h-96 shadow-md px-4 py-5 flex flex-col items-center">
                        <div className="w-20 h-20 overflow-hidden rounded-full">
                            <img
                                src={selectedImage || profile}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            <label htmlFor="image-upload">
                                <p className="cursor-pointer text-primary z-30"
                                >
                                    Edit
                                </p>
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                        </div>
                        

                        <p className="text-gray-700 text-xs md:text-md md:font-medium mt-4">
                            {currentUser.email}
                        </p>
                        <p className="text-gray-700 text-xs md:text-md md:font-medium mt-2">
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                className="text-sm bg-transparent border-none focus:ring-2 focus:ring-blue-500 rounded-md p-0.5"
                            />
                        </p>
                        <p className="text-gray-700 text-xs md:text-md md:font-medium mt-2">
                            <input
                                type="tel"
                                value={phone}
                                onChange={handlePhoneChange}
                                className="text-sm bg-transparent border-none focus:ring-2 focus:ring-blue-500 rounded-md p-0.5"
                            />
                        </p>
                        <button
                            onClick={handleLogout}
                            className="text-gray-700 text-xs md:text-md md:font-medium mt-2"
                        >
                            Logout
                        </button>
                    </div>

                )}
            </div>
        </div>
    );
}

export default Settings;
