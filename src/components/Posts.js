import React from "react";
import image from "../assets/images/qtp.jpg";
import image2 from "../assets/images/qtp2.jpg";
import Likes from "./Likes";
import Comments from "./Comments";
import LikePost from "./LikePost";
import CommentPost from "./CommentPost";

const Posts = () => {
    return (
        <div className="pl-5 md:pl-96 pr-5 md:pr-96 pb-28 md:pb-10">
            <div className="border rounded-md w-full h-auto p-5 shadow-md">
                <div className="flex items-center">
                    <img src={image} alt="Quantum Theory Postulate" className="rounded-full w-16 h-16 md:w-24 md:h-24 mr-3 md:mr-5 shadow-md" />
                    <div>
                        <p className="font-bold md:text-md text-sm">Sheldon Lee</p>
                        <p className="md:text-sm text-xs">2 hours ago</p>
                    </div>
                </div>
                <p className="mt-2 md:mt-4 text-sm md:text-md text-justify">
                Classical mechanics, also known as Newtonian mechanics, forms the cornerstone of physics, providing a framework to understand the motion of objects ranging from everyday phenomena to celestial bodies. Developed by Isaac Newton in the 17th century, classical mechanics describes the behavior of objects under the influence of forces and has profound implications for our understanding of the physical world.
                </p>
                <img src={image2} alt="Quantum Theory Postulate" className="mt-2 md:mt-4 mx-auto block w-96 rounded-md shadow-md" />
                <div className="flex mt-2 md:mt-4 justify-between items-center">
                <Likes />
                <Comments />
                </div>
                <div className="w-full h-0.5 mt-3 bg-black/30"></div>
                <div className="flex mt-2 md:mt-4 justify-between items-center">
                <LikePost />
                <CommentPost />
                </div>
            </div>
            
        </div>
    );
}

export default Posts;