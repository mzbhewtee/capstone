import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { doPasswordUpdate } from "../auth";
import { Sidebar } from "../components/Sidebar";

function Settings() {
  const { currentUser, updatePassword, deleteUser } = useAuth(); // Access currentUser, updatePassword, and deleteUser from auth context
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    // Check if user is logged in
    if (!currentUser) {
      // If user is not logged in, redirect to login page
      navigate('/signin');
    }
  }, [currentUser, navigate]); // Add currentUser and navigate to dependency array

  const handlePasswordChange = async () => {
    const newPassword = document.getElementById("newPassword").value;
    try {
      await doPasswordUpdate(newPassword); // Use doPasswordUpdate function
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again later.");
    }
  };


  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteUser();
        alert("Your account has been deleted.");
        // Redirect to the sign-in page after successful account deletion
        navigate('/signin');
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again later.");
      }
    }
  };

  return (
    <div className="">
      <Sidebar />
      <div className="items-center ml-96 mr-96">
        <h1 className="text-2xl font-bold text-center mb-3">Settings</h1>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentUser.fullname}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={currentUser.email}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handlePasswordChange}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              By using this service, you agree to our{" "}
              <a href="/privacy-policy" className="text-blue-500">Privacy Policy</a>{" "}
              and <a href="/terms-and-conditions" className="text-blue-500">Terms & Conditions</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
