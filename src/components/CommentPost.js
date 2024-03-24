import React, { useState, useEffect } from 'react';
import { db, auth } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";

function AllComments({ postId }) {
    const [commentsCount, setCommentsCount] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommentsCount = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    setError('You must be logged in to view comments.');
                    return;
                }
        
                if (!postId) {
                    setError('Post ID is required to fetch comments.');
                    return;
                }
        
                const commentsCollection = collection(db, `posts/${postId}/comments`);
                const q = query(commentsCollection);
                const querySnapshot = await getDocs(q);
        
                setCommentsCount(querySnapshot.size);
            } catch (error) {
                console.error('Error fetching comments count:', error);
                setError('Failed to fetch comments count. Please try again later.');
            }
        };

        fetchCommentsCount();
    }, [postId]);

    return (
        <div>
            {error && <p>{error}</p>}
            <p>{commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}</p>
        </div>
    );
}

export default AllComments;
