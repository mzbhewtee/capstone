import React from "react";
import { BiSolidLike } from "react-icons/bi";

const Likes = () => {
    return (
        <div className='flex items-center mt-2 md:mt-5'>
            <BiSolidLike className='text-xl md:text-2xl text-primary' />
            <span className='text-primary text-sm md:text-md ml-2'>12 Likes</span>
        </div>

    )
}

export default Likes;