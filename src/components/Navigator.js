import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosPeople, IoIosSearch, IoIosSettings } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { IoSchoolSharp, IoNotifications } from "react-icons/io5";
import Logo from "../assets/images/logo.png";



function Navigator() {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate

    const sections = [
        { path: "/dashboard", text: "Home", icon: MdSpaceDashboard },
        { path: "/education", text: "Education", icon: IoSchoolSharp },
        { path: "/notifications", text: "Notifications", icon: IoNotifications },
        { path: "/community", text: "Community", icon: IoIosPeople },
        { path: "/settings", text: "Settings", icon: IoIosSettings}
    ];

    return (
        <div className="fixed w-full lg:z-50 bg-white top-0 lg:top-0 border-b">
        <div className="flex justify-between border overflow-hidden">
            <div>
                <div className="flex items-center space-x-2 p-4 md:p-10">
                    <img src={Logo} alt="Quantum Renew" className="w-12 md:w-24 cursor-pointer" />
                    <div className="flex items-center space-x-3 border-2 border-gray-300 p-1 md:p-2 rounded-lg focus:outline-none focus:border-primary shadow-black/40 w-60 md:w-auto">
                        <input type="text" placeholder="Search" className="focus:outline-none" />
                        <IoIosSearch className="text-gray-700 cursor-pointer md:text-md" />
                    </div>
                </div>
            </div>
            {/* Spacer */}
            <div className="md:w-1/6"></div>

            <div className="hidden lg:flex justify-end space-x-12 p-10">
                {sections.map(section => (
                    <Link key={section.path} to={section.path} className="flex flex-col items-center cursor-pointer">
                        <section.icon className={`text-2xl ${location.pathname === section.path ? 'text-primary' : 'text-gray-700'}`} />
                        <p className={`${location.pathname === section.path ? 'text-primary' : 'text-gray-700'} text-xs`}>{section.text}</p>
                    </Link>
                ))}
            </div>
        </div>
        <div className="flex lg:hidden z-20 justify-between p-5 fixed bottom-0 bg-white border w-full">
                {sections.map(section => (
                    <Link key={section.path} to={section.path} className="flex flex-col items-center cursor-pointer">
                        <section.icon className={`text-2xl ${location.pathname === section.path ? 'text-primary' : 'text-gray-700'}`} />
                        <p className={`${location.pathname === section.path ? 'text-primary' : 'text-gray-700'} text-xs`}>{section.text}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Navigator;
