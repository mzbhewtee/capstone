import React, { useState } from 'react';
import image from "../assets/images/qtp.jpg";
import Button from './Button';
import { FcStackOfPhotos } from "react-icons/fc";


function Post() {
    const [postContent, setPostContent] = useState('');

    const handlePostChange = (event) => {
        setPostContent(event.target.value);
    };

    const handlePostSubmit = () => {
        // Add logic to handle post submission
        console.log('Post submitted:', postContent);
        // Clear the post content
        setPostContent('');
    };

    return (
        <div className='overflow-hidden p-5 md:pl-96 md:pr-96'>
        <div className='w-full border rounded-md p-4 md:p-8 shadow-md'>
            <div className='flex items-center'>
            <img src={image} alt="Quantum Theory Postulate" className="rounded-full w-16 h-16 md:w-24 md:h-24 mr-3 md:mr-10 shadow-md" />
            <div className="w-full p-5 border rounded-md h-32">
                <textarea className='w-full h-full resize-none outline-none border-none'
                    placeholder="Write your post here..."
                    value={postContent}
                    onChange={handlePostChange}
                ></textarea>
            </div>
            </div>
            <div className='flex mt-5 justify-between items-center'>
            <FcStackOfPhotos className='mt-5 ml-16 md:ml-40 text-4xl text-primary' /> 
            <Button onClick={handlePostSubmit}>Post</Button>
            </div>
        </div>
        </div>
    );
}

export default Post;