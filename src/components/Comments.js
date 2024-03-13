import React, { useState, useEffect } from 'react';
import { db, auth } from "../firebase";
import { collection, query, orderBy, getDocs, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

function AllComments({ postId }) {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [commentText, setCommentText] = useState(""); // Define state for comment input

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    setError('You must be logged in to view comments.');
                    return;
                }

                // Make sure postId is not empty
                if (!postId) {
                    setError('Post ID is required to fetch comments.');
                    return;
                }

                const commentsCollection = collection(db, `posts/${postId}/comments`);
                const q = query(commentsCollection, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const commentsData = [];
                for (const docRef of querySnapshot.docs) {
                    const commentData = docRef.data();
                    // Fetch user data for each comment
                    const userDoc = await getDoc(doc(db, 'users', commentData.userId));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        commentsData.push({
                            id: docRef.id,
                            ...commentData,
                            user: {
                                profilePictureURL: userData.profilePictureURL,
                                fullname: userData.fullname
                            }
                        });
                    }
                }

                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError('Failed to fetch comments. Please try again later.');
            }
        };

        fetchComments();
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
                setComments(prevComments => [...prevComments, { 
                    text: commentText, 
                    user: { 
                        fullname: user.displayName, // Use displayName instead of fullname
                        profilePictureURL: user.photoURL // Use photoURL instead of profilePictureURL
                    }, 
                    createdAt: new Date() 
                }]);
            }
        } catch (error) {
            console.error("Error commenting on post:", error);
        }
    };
    

    const handleTextAreaChange = (event) => {
        setCommentText(event.target.value);
    };

    const getTimeDifference = (timestamp) => {
        if (!(timestamp instanceof Date)) {
            timestamp = timestamp.toDate(); // Convert Firestore Timestamp to Date object
        }

        const now = new Date();
        const differenceInSeconds = Math.floor((now - timestamp) / 1000);
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
        <div>
            <div className="mt-2 mb-4 flex items-center">
                <textarea
                    value={commentText}
                    onChange={handleTextAreaChange}
                    placeholder="Write your comment..."
                    className="flex-grow border border-gray-300 rounded-md p-2"
                />
                <button onClick={handleComment} className="ml-2 bg-primary hover:shadow-md text-white px-4 py-3 rounded-md">Send</button>
            </div>
            {error && <p>{error}</p>}
            {comments.map((comment, index) => (
                <div key={index} className='mb-3'>
                    <div className='flex items-center'>
                        <img src={comment.user.profilePictureURL} alt="Profile" className="rounded-full w-8 h-8 mr-2" />
                        <div>
                            <p className='text-xs font-bold'>{comment.user.fullname}</p>
                            <p className='text-xs'>{getTimeDifference(comment.createdAt)}</p>
                        </div>
                    </div>
                    <p className='mt-2 mb-2 text-sm'>{comment.text}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default AllComments;
