import React from "react";
import Hero from "../assets/images/hero.png";
import Hero2 from "../assets/images/hero-small.png";
import { IoArrowForwardOutline } from "react-icons/io5";


function HeroSection() {
    return (
        <section className="relative overflow-hidden md:flex items-center justify-start h-full md:h-screen">
            <img
                src={Hero2}
                alt="Hero"
                className="md:hidden w-full h-full object-cover"
            />
            <div className="flex flex-col pl-5 md:pl-16 md:pt-16 pr-7 md:pr-0">
                <h1 className="text-2xl text-left font-link md:text-4xl font-bold">Empowering Sustainable Futures through Quantum Innovation</h1>
                <button className="bg-primary w-36 md:w-48 flex-shrink-0 text-accent text-sm md:text-md font-medium font-link px-5 md:px-5 py-3 rounded-lg hover:shadow-lg border duration-500 mt-5">
                    Get Started
                    <IoArrowForwardOutline className="inline ml-2" />
                </button>
            </div>
            <img
                src={Hero}
                alt="Hero"
                className="hidden md:block w-full h-full object-cover"
            />
            
        </section>
    );
}

export default HeroSection;
