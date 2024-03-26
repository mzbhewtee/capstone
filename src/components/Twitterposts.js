import React from "react";
import Pepsi from '../assets/images/pepsi.png';
import AS from '../assets/images/AS.png';
import FL from '../assets/images/FL.png';
import P1 from '../assets/images/P1.png';

const Twitterposts = () => {
    return (
        <div className="fixed right-5 w-80 top-16 h-100vh overflow-y-auto mb-10">
            <h2 className="text-lg text-primary text-center font-bold p-3">Sponsored</h2>
            <div className="bg-white flex p-3 rounded-md shadow-md border">
                <div className="flex items-center">
                    <img src={Pepsi} alt="Twitter Post" className="w-full h-20 rounded" />
                </div>
                <div>
                <h3 className="font-bold text-sm mt-3"> Formula 1</h3>
                <p className="text-justify text-xs mt-1">
                    🏁Feel the speed. Experience Formula 1. 🏎️</p>
                </div>
            </div>
            <div className="bg-white p-3 rounded-md shadow-md border mt-3">
                <div className="flex items-center">
                    <img src={AS} alt="Twitter Post" className="w-full h-20 rounded" />
                </div>
                <div>
                <h3 className="font-bold text-sm mt-3"> Aston Martin</h3>
                <p className="text-justify text-xs mt-1">
                    🚗 Unleash elegance and power with Aston Martin. Elevate your drive to new heights of luxury and performance. Experience the epitome of automotive excellence with Aston Martin</p>
                </div>
            </div>
            <div className="bg-white p-3 rounded-md shadow-md border mt-3">
                <div className="flex items-center">
                    <img src={FL} alt="Twitter Post" className="w-full h-20 rounded" />
                </div>
                <h3 className="font-bold text-sm mt-3"> Ferrari</h3>
                <p className="text-justify text-xs mt-1">
                Experience the thrill of pure speed and Italian craftsmanship with Ferrari. Feel the pulse of racing heritage in every curve and roar of the engine. Drive with passion, drive with Ferrari.</p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-md border mt-3">
                <div className="flex items-center">
                    <img src={P1} alt="Twitter Post" className="w-full h-20 rounded" />
                </div>
                <div>
                <h3 className="font-bold text-sm mt-3"> Pepsi</h3>
                <p className="text-justify text-xs mt-1">
                    🥤Quench your thirst with Pepsi. The perfect companion for every moment. Refresh, revitalize, and enjoy the bold taste of Pepsi.</p>
                </div>
            </div>
        </div>
    );
};

export default Twitterposts;
