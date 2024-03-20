import React from "react";
import { Tweet } from "react-tweet";

const Twitterposts = () => {
    return (
        <div className="absolute right-0 w-80 top-28">
        <Tweet
            tweetId="1767726079744074045"
            options={{ theme: "light" }}
        />
        </div>
    );
    };  

export default Twitterposts;