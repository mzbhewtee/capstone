import React, { useState, useEffect } from "react";
import { BiSolidLike } from "react-icons/bi";
import { db, auth } from "../firebase"; // Import Firebase db, auth, and doc
import { doc, getDoc, deleteDoc, setDoc, collection, addDoc, where, query, getDocs } from "firebase/firestore"; // Import Firestore doc and getDoc
import Likes from "./Likes";

const LikePost = ({ postId }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the like count
                const q = query(collection(db, `posts/${postId}/likes`));
                const querySnapshot = await getDocs(q);
                setLikeCount(querySnapshot.size);
                
                const user = auth.currentUser;
                if (user) {
                    // Check if the user has already liked the post
                    const likeDocRef = doc(db, `posts/${postId}/likes`, `${user.uid}`);
                    const likeDocSnap = await getDoc(likeDocRef);
                    setLiked(likeDocSnap.exists());
                }
            } catch (error) {
                console.error("Error fetching like data:", error);
            }
        };

        fetchData();
    }, [postId]);

    const handleLike = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const likeDocRef = doc(db, `posts/${postId}/likes`, `${user.uid}`);
                const likeDocSnap = await getDoc(likeDocRef);
                if (likeDocSnap.exists()) {
                    // Unlike the post if already liked
                    await deleteDoc(likeDocRef);
                    setLiked(false);
                    setLikeCount((prevCount) => Math.max(0, prevCount - 1));
                } else {
                    // Like the post if not already liked
                    await setDoc(likeDocRef, { likedAt: new Date() });
                    setLiked(true);
                    setLikeCount((prevCount) => prevCount + 1);
                }
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    return (
        <Likes likeCount={likeCount} onLike={handleLike} liked={liked} />
    );
}

export default LikePost;
