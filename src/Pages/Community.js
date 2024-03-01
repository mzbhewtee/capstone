import React from "react";
import Post from "../components/Post";
import Navigator from "../components/Navigator";
import Posts from "../components/Posts";

function Community() {
    return (
        <div className="pt-16 md:pt-32">
            < Navigator />
            < Post  />
            < Posts />
            
        </div>
    );
}

export default Community;