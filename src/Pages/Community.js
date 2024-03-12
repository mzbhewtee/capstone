// Community.js
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Comments from "../components/Comments";
import LikePost from "../components/LikePost";
import CommentPost from "../components/CommentPost";
import Post from "../components/Post";
import Posts from "../components/Posts";
import { db, auth } from "../firebase"; // Import auth and db from Firebase
import { collection, query, orderBy, getDocs, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore"; // Import Firestore functions

function Community() {
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
                console.log("Fetched posts:", fetchedPosts); // Add this line
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts(); // Fetch posts when component mounts

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
            if (unsubscribeUser) unsubscribeUser();
        };
    }, []);

    return (
        <div className="font-link">
            <Sidebar /> 
            <Post /> {/* Add the Post component */}
            <Posts posts={posts} /> {/* Pass the fetched posts as props */}
        </div>
    );
}

export default Community;
