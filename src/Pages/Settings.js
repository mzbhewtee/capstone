import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { doSignOut } from "../auth";
import { useNavigate } from "react-router-dom";
import profile from "../assets/images/profile.png";
import { FaCamera, FaSignOutAlt } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

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
    <div>
        < Sidebar />
    
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Main content */}
          {userLoggedIn && currentUser && (
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center mb-4">
                <div className="relative w-20 h-20 overflow-hidden rounded-full mr-4">
                  <img
                    src={selectedImage || profile}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <label htmlFor="image-upload">
                    <FaCamera
                      alt="Change profile image"
                      className="absolute bottom-4 right-4 w-6 h-6 text-white bg-green-500 rounded-full cursor-pointer"
                    />
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
                <div>
                  <p className="text-gray-700 text-xl font-bold">{currentUser.email}</p>
                </div>
              </div>
              <p className="text-gray-700 text-xs md:text-md md:font-medium mt-4">
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="text-sm bg-transparent border-none focus:ring-2 focus:ring-blue-500 rounded-md p-0.5 ml-2"
                />
              </p>
              <p className="text-gray-700 text-xs md:text-md md:font-medium mt-2">
                Phone:
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="text-sm bg-transparent border focus:ring-2 focus:ring-blue-500 rounded-md p-0.5 ml-2"
                />
              </p>
            </div>
          )}
        </div>
        </div>
  );
}

export default Settings;
