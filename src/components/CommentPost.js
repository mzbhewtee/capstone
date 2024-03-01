import React from "react";
import { BiCommentDetail } from "react-icons/bi";

const CommentPost = () => {
    return (
        <div className='flex items-center mt-2 md:mt-5'>
            <BiCommentDetail className='text-xl md:text-2xl text-primary' />
            <span className='text-primary text-sm md:text-md ml-2'>Comment</span>
        </div>

    )
}

export default CommentPost;