import React, { useState, useEffect } from 'react';
import { db, auth } from "../firebase";
import { collection, query, orderBy, getDocs, doc, getDoc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { FaPaperPlane } from 'react-icons/fa';


function AllComments({ postId }) {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [loadMoreCount, setLoadMoreCount] = useState(3); // Initial number of comments to load

    useEffect(() => {
        const fetchComments = async () => {
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
                const q = query(commentsCollection, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const commentsData = [];
                for (const docRef of querySnapshot.docs) {
                    const commentData = docRef.data();
                    // Fetch user data for each comment
                    const userDoc = await getDoc(doc(db, 'users', commentData.userId)); // Corrected here
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

                // Fetch user data to ensure profilePictureURL and fullname are available
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                const userData = userDoc.data();

                // Update comments state with new comment data
                setComments(prevComments => [...prevComments, {
                    text: commentText,
                    userId: user.uid,
                    user: {
                        profilePictureURL: userData.profilePictureURL,
                        fullname: userData.fullname
                    },
                    createdAt: new Date()
                }]);
            }
        } catch (error) {
            console.error("Error commenting on post:", error);
        }
    };


    const getTimeDifference = (timestamp) => {
        if (!(timestamp instanceof Date)) {
            timestamp = timestamp.toDate();
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

    const handleLoadMore = () => {
        // Increase loadMoreCount to load more comments
        setLoadMoreCount(prevCount => prevCount + 3); // Load 3 more comments
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteDoc(doc(db, `posts/${postId}/comments`, commentId));
            setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <div>
            <h3 className='font-bold text-lg mb-3'>Comments</h3>
            
            <div className='flex items-center gap-3 mb-3'>
                {/* Add profile picture */}
                {auth.currentUser && auth.currentUser.photoURL && (
                    <img src={auth.currentUser.photoURL} alt="Profile" className="rounded-full w-8 h-8" />
                )}
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder='Add a comment...'
                    className='w-full p-2 border rounded-md'
                />
                <FaPaperPlane onClick={handleComment} className="text-primary cursor-pointer" />
            </div>



            {error && <p>{error}</p>}
            {comments.slice(0, loadMoreCount).map((comment, index) => (
                <div key={index} className='mb-3'>
                    <div className='flex items-center'>
                        {comment.user.profilePictureURL && (
                            <img src={comment.user.profilePictureURL} alt="Profile" className="rounded-full w-8 h-8 mr-2" />
                        )}
                        <div>
                            {comment.user.fullname && (
                                <>
                                    <p className='text-xs font-bold'>{comment.user.fullname}</p>
                                    <p className='text-xs'>{getTimeDifference(comment.createdAt)}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <p className='mt-2 mb-2 text-sm'>{comment.text}</p>
                        {comment.userId === auth.currentUser.uid && (
                            <button onClick={() => handleDeleteComment(comment.id)} className="text-sm text-red-500">Delete</button>
                        )}
                    </div>
                    <hr />
                </div>
            ))}
            {comments.length > loadMoreCount && (
                <button onClick={handleLoadMore} className="text-blue-900 underline text-sm py-3 rounded-md">Load More</button>
            )}
        </div>
    );
}

export default AllComments;
