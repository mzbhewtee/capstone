import React from "react";
import AboutComponent  from "./AboutComponent";

function About() {
    return (
        <section id="about-section" className="h-auto">
            <div className="flex flex-col lg:h-auto items-center justify-center pb-16 p-5 md:pr-10 md:pl-10 lg:pr-10 mt-10 lg:mt-10 ">
                <p className="text-center font-link text-sm md:text-lg mb-1 text-primary">What We Do</p>
                <h1 className="text-xl md:text-2xl font-link font-bold text-center mb-5">About Us</h1>
                <div className="md:flex mt-3 md:mt-5 justify-center align-middle space-x-2">
                    <AboutComponent
                        header="Our Mission"
                        paragraph="Our mission is to provide a platform for renewable energy researchers and engineers to leverage quantum computing to solve complex problems in the renewable energy industry."
                    />
                    <AboutComponent
                        header="Our Vision"
                        paragraph="Our vision is to drive sustainable energy innovation by enabling researchers and engineers to model, optimize, and analyze renewable energy systems using advanced quantum simulation technology."
                    />
                    <AboutComponent
                        header="Our Values"
                        paragraph="Our core values are innovation, collaboration, and sustainability. We are committed to fostering a culture of innovation, collaboration, and sustainability to drive positive change in the renewable energy sector."
                    />
                </div>
            </div>
        </section>
    )
}

export default About;
