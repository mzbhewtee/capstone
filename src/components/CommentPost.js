import React, { useState, useEffect } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { db, auth } from "../firebase"; // Import Firebase db, auth, and doc
import { doc, deleteDoc, setDoc, collection, getDocs, getDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore doc and getDoc

const CommentPost = ({ postId }) => {
    const [commented, setCommented] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const [showTextArea, setShowTextArea] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the comments for the post
                const q = collection(db, `posts/${postId}/comments`);
                const querySnapshot = await getDocs(q);
                const fetchedComments = [];
                querySnapshot.forEach((doc) => {
                    fetchedComments.push({ id: doc.id, ...doc.data() });
                });
                setComments(fetchedComments);
                setCommentCount(querySnapshot.size);
            } catch (error) {
                console.error("Error fetching comment data:", error);
            }
        };

        fetchData();
    }, [postId]);

    const handleComment = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const commentDocRef = doc(collection(db, `posts/${postId}/comments`));
                await setDoc(commentDocRef, {
                    userId: user.uid,
                    text: commentText,
                    createdAt: serverTimestamp()
                });
                setCommentText(""); // Clear the comment text after sending
                setCommentCount((prevCount) => prevCount + 1); // Increment comment count
            }
        } catch (error) {
            console.error("Error commenting on post:", error);
        }
    };


    return (
        <div className='flex items-center flex-col mt-2 md:mt-5'>
            
            <span className={`text-sm md:text-md ${commented ? 'text-primary' : 'text-gray-400'}`} >{commentCount} Comments</span>
            
        </div>
    );
}

export default CommentPost;
