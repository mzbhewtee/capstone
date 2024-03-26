import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import Posts from "../components/Posts";
import { db, auth } from "../firebase"; // Import auth and db from Firebase
import { collection, query, orderBy, getDocs } from "firebase/firestore"; // Import Firestore functions
import Twitterposts from "../components/Twitterposts";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Sidebar } from "../components/Sidebar";

function Community() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate(); // Initialize navigate hook

    useEffect(() => {
        // Check if user is logged in
        const unsubscribeAuth = auth.onAuthStateChanged(user => {
            if (!user) {
                // If user is not logged in, redirect to login page
                navigate('/signin');
            }
        });

        // Fetch posts when component mounts
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

        fetchPosts();

        return () => {
            // Unsubscribe from auth state changes
            unsubscribeAuth();
        };
    }, [navigate]); // Add navigate to dependency array

    return (
        <div className="font-link">
            <Sidebar />
            <div className="flex">
                <div>
                    <Post />
                    <Posts posts={posts} />
                </div>
                <div className="hidden md:block">
                    <Twitterposts />
                </div>
            </div>
        </div>
    );
}

export default Community;
