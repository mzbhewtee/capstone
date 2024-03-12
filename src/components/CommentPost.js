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

    const handleTextAreaChange = (event) => {
        setCommentText(event.target.value);
    };

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
        <div className='flex items-center flex-col mt-2 md:mt-5'>
            
            <span className={`text-sm md:text-md ${commented ? 'text-primary' : 'text-gray-400'}`} onClick={() => setShowTextArea(true)}>{commentCount} Comments</span>
            {showTextArea && (
                <div className="mt-2 flex items-center">
                    <textarea
                        value={commentText}
                        onChange={handleTextAreaChange}
                        placeholder="Write your comment..."
                        className="flex-grow border border-gray-300 rounded-md p-2"
                    />
                    <button onClick={handleComment} className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md">Send</button>
                </div>
            )}
            
        </div>
    );
}

export default CommentPost;
