import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import LikePost from "./LikePost";
import CommentPost from "./CommentPost";
import AllComments from './Comments';
import { formatDistanceToNow } from 'date-fns'; // Import function to format time distance

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsCollection = collection(db, 'posts');
                const q = query(postsCollection, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const postsData = [];
                querySnapshot.forEach((doc) => {
                    const postData = doc.data();
                    postData.id = doc.id;
                    postsData.push(postData);
                });
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            {posts.map((post, index) => (
                <div key={index} className='overflow-hidden p-5 lg:pl-32 lg:pr-96 font-link'>
                    <div className='w-full border rounded-md p-4 md:p-8 shadow-md'>
                        <div className='flex items-center'>
                            <img src={post.profilePictureURL} alt="Profile" className="rounded-full w-12 h-12 mr-3 shadow-md" />
                            <div>
                            <p className="text-sm font-semibold">{post.userDisplayName} {post.fullname}</p>
                            <p className="ml-auto text-xs text-gray-500">{formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true })}</p>
                            </div>
                        </div>
                        <p className='mt-5 mb-3 text-justify'>{post.content}</p>
                        {post.imageUrl && <img src={post.imageUrl} alt="Post" className='rounded-md shadow-md mb-5' />}
                        {/* Like button */}
                        <div className='flex items-end justify-between'>
                            <LikePost postId={post.id} />
                            {/* Comment button */}
                            <CommentPost postId={post.id}/>
                        </div>
                        <div className='h-0.5 w-full bg-gray-200 mt-5 mb-5'></div>
                        <AllComments postId={post.id} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllPosts;
