import React from "react";
import { BiSolidLike } from "react-icons/bi";

const Likes = ({ likeCount, onLike, liked }) => {
    return (
        <div className='flex items-center mt-2 md:mt-5' onClick={onLike}>
            <BiSolidLike className={`text-xl md:text-2xl ${liked ? 'text-primary' : 'text-gray-400'}`} />
            <span className={`text-sm md:text-md ml-2 ${liked ? 'text-primary' : 'text-gray-400'}`}>{likeCount} Likes</span>
        </div>
    );
}

export default Likes;
