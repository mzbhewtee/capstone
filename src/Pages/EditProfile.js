import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { doc, updateDoc } from "firebase/firestore";
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FaUpload, FaArrowLeft } from "react-icons/fa";

const EditProfileForm = () => {
    const { currentUser } = useAuth();
    const [fullname, setFullname] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePictureURL, setProfilePictureURL] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        if (currentUser) {
            setFullname(currentUser.fullname || "");
            setPronouns(currentUser.pronouns || "");
            setBio(currentUser.bio || "");
            setProfilePictureURL(currentUser.profilePictureURL || "");
        }
    }, [currentUser]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (profilePicture) {
                const storageRef = ref(storage, `profilePictures/${currentUser.uid}/${profilePicture.name}`);
                const uploadTask = uploadBytesResumable(storageRef, profilePicture);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        setUploadProgress(progress);
                    },
                    (error) => {
                        console.error("Error uploading profile picture:", error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            setProfilePictureURL(downloadURL); // Update profile picture URL
                            await updateUserData({
                                fullname,
                                pronouns,
                                bio,
                                profilePictureURL: downloadURL,
                            });
                        });
                    }
                );
            } else {
                await updateUserData({
                    fullname,
                    pronouns,
                    bio,
                });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const updateUserData = async (userData) => {
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, userData);
            navigate(`/profile/${currentUser.uid}`);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <div className="md:mr-10 md:ml-10 font-link p-4 flex justify-center overflow-y-auto h-screen items-center">
            <div className="rounded-lg p-24 relative shadow-lg border">
                <FaArrowLeft className="text-xl absolute top-6 left-4 text-primary mb-5 cursor-pointer" onClick={() => navigate(-1)} />
                <form onSubmit={handleSubmit}>
                    {profilePictureURL && (
                        <div className="justify-center flex mb-5 items-end">
                            <img src={profilePictureURL} alt="Profile" style={{ width: 100, height: 100 }} className="rounded-full" />
                            <label htmlFor="profilePicture" className="cursor-pointer">
                                <FaUpload className="text-xl text-primary" />
                            </label>
                        </div>
                    )}

                    <div className="flex items-center w-auto mb-3 gap-2">
                        <label htmlFor="fullname" className="font-bold">Full Name</label>
                        <input
                            className="border-2 w-64 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-primary shadow-inner shadow-black/40 bg-transparent"
                            type="text"
                            id="fullname"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center w-auto mb-3 gap-2">
                        <label htmlFor="pronouns" className="font-bold">Pronouns</label>
                        <input
                            className="border-2 w-64 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-primary shadow-inner shadow-black/40 bg-transparent"
                            type="text"
                            id="pronouns"
                            value={pronouns}
                            onChange={(e) => setPronouns(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center w-auto mb-3 gap-2">
                        <label htmlFor="bio" className="font-bold">Bio</label>
                        <textarea
                            className="border-2 w-norm border-gray-300 p-2 rounded-lg focus:outline-none focus:border-primary shadow-inner shadow-black/40 bg-transparent"
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        ></textarea>
                    </div>
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        id="profilePicture"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <div className="flex justify-end mt-5">
                        <button type="submit" className="bg-primary p-3 rounded-lg text-white">Update Profile</button>
                    </div>
                    {uploadProgress > 0 && <p className="italic text-xs text-red-200">Upload Progress: {uploadProgress}%</p>}
                </form>
            </div>
        </div>
    );
};

export default EditProfileForm;
