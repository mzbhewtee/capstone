import React from "react";
import about from "../assets/images/about.png";

function About() {
    return (
        <section id="about-section" className="h-auto">
            <div className="flex flex-col lg:h-auto items-center justify-center pb-16 p-5 md:pr-10 md:pl-10 lg:pr-10 mt-10 lg:mt-10 ">
                <p className="text-center font-link text-sm md:text-lg mb-1 text-primary">What We Do</p>
                <h1 className="text-xl md:text-2xl font-link font-bold text-center mb-5">About Us</h1>
                <div className="md:flex mt-5 md:mt-10 justify-center align-middle">
                    <img className="rounded-lg shadow-xl border h-60 w-96 md:w-full md:h-gee" src={about} alt="About Us" />
                    <div className="flex flex-col justify-center md:ml-10">
                        <h2 className="font-link md:text-lg text-justify mt-5 md:mt-0 md:justify-center">QuantumRenew harnesses the power of quantum simulation to model complex physical systems inherent in renewable energy technologies. From optimizing solar panel configurations to designing catalysts for energy conversion processes, QuantumRenew provides cutting-edge tools to explore, analyze, and optimize renewable energy solutions.</h2>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;
