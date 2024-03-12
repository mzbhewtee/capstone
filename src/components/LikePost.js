import React, { useState, useEffect } from "react";
import { BiSolidLike } from "react-icons/bi";
import { db, auth } from "../firebase";
import { collection, query, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";

const LikePost = ({ postId }) => {
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const likesCollection = collection(db, `posts/${postId}/likes`);
                const querySnapshot = await getDocs(likesCollection);
                const likesData = [];
                querySnapshot.forEach((doc) => {
                    likesData.push({ id: doc.id, ...doc.data() });
                });
                setLikes(likesData);

                const user = auth.currentUser;
                if (user) {
                    // Check if the user has already liked the post
                    const likeDocRef = doc(db, `posts/${postId}/likes`, user.uid);
                    const likeDocSnap = await getDocs(likeDocRef);
                    setLiked(likeDocSnap.exists());
                }
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };

        fetchLikes();
    }, [postId]);

    const handleLike = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const likeDocRef = doc(db, `posts/${postId}/likes`, user.uid);
                if (!liked) {
                    await setDoc(likeDocRef, { userId: user.uid });
                    setLiked(true);
                    setLikes([...likes, { userId: user.uid }]);
                } else {
                    await deleteDoc(likeDocRef);
                    setLiked(false);
                    setLikes(likes.filter(like => like.userId !== user.uid));
                }
            }
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLike}>
                <BiSolidLike color={liked ? 'blue' : 'gray'} />
            </button>
            <span>{likes.length} Likes</span>
        </div>
    );
}

export default LikePost;
