import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Import auth and db from Firebase
import { collection, query, orderBy, getDocs, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore"; // Import Firestore functions
import Comments from "./Comments";
import LikePost from "./LikePost";
import Likes from "./Likes";
import CommentPost from "./CommentPost";

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsCollection = collection(db, "posts");
                const q = query(postsCollection, orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const fetchedPosts = [];
                querySnapshot.forEach((doc) => {
                    fetchedPosts.push({ id: doc.id, ...doc.data() });
                });
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        const postsCollection = collection(db, "posts");
        const q = query(postsCollection, orderBy("createdAt", "desc"));
        fetchPosts();

        const unsubscribePosts = onSnapshot(q, () => {
            fetchPosts();
        });

        // Subscribe to changes in user's profile data
        const user = auth.currentUser;
        let unsubscribeUser;
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            unsubscribeUser = onSnapshot(userDocRef, () => {
                // Update posts when user's profile data changes
                fetchPosts();
            });
        }

        return () => {
            unsubscribePosts();
            if (unsubscribeUser) unsubscribeUser();
        };
    }, []);

    // Function to calculate time difference in seconds, minutes, hours, or days
    const getTimeDifference = (timestamp) => {
        const now = new Date();
        const createdAt = timestamp.toDate();
        const differenceInSeconds = Math.floor((now - createdAt) / 1000);
        if (differenceInSeconds < 60) {
            return `${differenceInSeconds} seconds ago`;
        } else if (differenceInSeconds < 3600) {
            return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
        } else if (differenceInSeconds < 86400) {
            return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
        } else {
            return `${Math.floor(differenceInSeconds / 86400)} days ago`;
        }
    };

    return (
        <div className="pl-5 md:pl-96 pr-5 md:pr-96 pb-28 md:pb-10">
            HI
            {posts.map((post) => (
                <div key={post.id} className="border rounded-md w-full h-auto p-5 shadow-md mb-5">
                    <div className="flex items-center">
                        <img src={post.profilePictureURL} alt="Profile" className="rounded-full w-16 h-16 md:w-24 md:h-24 mr-3 md:mr-5 shadow-md" />
                        <div>
                            <p className="font-bold md:text-md text-sm">{post.fullname}</p>
                            <p className="md:text-sm text-xs">{getTimeDifference(post.createdAt)}</p> {/* Use getTimeDifference function */}
                        </div>
                    </div>
                    <p className="mt-2 md:mt-4 text-sm md:text-md text-justify">{post.content}</p>
                    {post.imageUrl && <img src={post.imageUrl} alt="Post" className="mt-2 md:mt-4 mx-auto block w-96 rounded-md shadow-md" />}
                    <div className="flex mt-2 md:mt-4 justify-between items-center">

                        <Comments postId={post.id} />
                    </div>
                    <div className="w-full h-0.5 mt-3 bg-black/30"></div>
                    <div className="flex mt-2 md:mt-4 justify-between items-center">
                        <LikePost postId={post.id} />
                        <CommentPost postId={post.id} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Posts;
