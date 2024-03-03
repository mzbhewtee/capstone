import React from "react";
import image from "../assets/images/profile.png";
import Sidebar from "../components/Sidebar";

function Notification() {
    return (
        <div>
            < Sidebar />
            <div className="pl-5 md:pl-96 pr-5 mt-5 md:pr-96 pb-20 md:pb-10">
                <div className="border rounded-md w-full h-auto p-5">
                    <div className="items-center justify-center">
                        <h1 className="text-2xl font-bold text-center mb-3">Notifications</h1>
                        <div className="h-0.5 w-full bg-primary"></div>
                        <div className="flex items-center mt-5 w-full">
                            <img src={image} alt="Quantum Theory Postulate" className="rounded-full w-16 h-16 md:w-16 md:h-16 mr-3 md:mr-5 shadow-md" />
                            <div className="w-full">
                                <div className="flex justify-between">
                                    <p className="font-bold md:text-md text-sm">Sheldon Lee</p>
                                    <p className="md:text-sm text-xs">2 hours ago</p>
                                </div>
                                <p className=" text-xs md:text-md text-justify">Liked your post</p>
                
                            </div>
                            
                        </div>
                        <div className="h-0.5 w-full mt-4 bg-primary/30"></div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notification;