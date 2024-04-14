import React, { useState, useEffect } from 'react';
import Button from './Button';
import { FcStackOfPhotos } from "react-icons/fc";
import { db, auth, storage } from "../firebase";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Post() {
    const [postContent, setPostContent] = useState('');
    const [userProfilePicture, setUserProfilePicture] = useState('');
    const [userDisplayName, setUserDisplayName] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [uploading, setUploading] = useState(false); // Loading state

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserProfilePicture(userData.profilePictureURL);
                        setUserDisplayName(userData.fullname); // Update state with user's display name
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handlePostChange = (event) => {
        setPostContent(event.target.value);
    };

    const handleImageChange = (event) => {
        setPostImage(event.target.files[0]);
    };

    const handlePostSubmit = async () => {
        try {
            setUploading(true); // Start loading
            const user = auth.currentUser;
            const postRef = collection(db, 'posts');
            let imageUrl = '';

            if (postImage) {
                const storageRef = ref(storage, `postImages/${postImage.name}`);
                const uploadTask = uploadBytesResumable(storageRef, postImage);

                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {},
                        (error) => {
                            console.error("Error uploading post image:", error);
                            setUploading(false); // Stop loading on error
                            reject(error);
                        },
                        async () => {
                            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve();
                        }
                    );
                });
            }

            await addDoc(postRef, {
                content: postContent,
                profilePictureURL: userProfilePicture,
                fullname: userDisplayName, // Use user's display name for the post
                userId: user.uid,
                imageUrl: imageUrl,
                createdAt: new Date(),
            });

            // Clear post content and image
            setPostContent('');
            setPostImage(null);
            setUploading(false); // Stop loading after successful upload
        } catch (error) {
            console.error("Error saving post data:", error);
            setUploading(false); // Stop loading on error
        }
    };

    return (
        <>
            <div className='overflow-hidden p-5 lg:pl-96 lg:pr-96 font-link'>
                <div className='w-full border rounded-md p-4 md:p-8 shadow-md'>
                    <div className='flex items-center'>
                        {userProfilePicture && (
                            <img src={userProfilePicture} alt="Profile" className="rounded-full w-32 h-24 mr-3 md:mr-10 shadow-md" />
                        )}
                        <div className="w-full p-5 border rounded-md h-32">
                            <textarea className='w-full h-full resize-none outline-none border-none'
                                placeholder="Write your post here..."
                                value={postContent}
                                onChange={handlePostChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className='flex mt-5 justify-between items-center'>
                        <input
                            type="file"
                            id="postImage"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <label htmlFor="postImage" className="cursor-pointer">
                            <FcStackOfPhotos className='mt-5 ml-16 md:ml-40 text-4xl text-primary' />
                        </label>
                        <div onClick={handlePostSubmit} className="cursor-pointer">
                            <Button disabled={uploading}>{uploading ? 'Uploading...' : 'Post'}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;
