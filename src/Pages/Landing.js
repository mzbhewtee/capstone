import React from "react";
import Navbar from "../components/NavBar";
import HeroSection from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Education from "./Education";
import Footer from "../components/Footer";

function Landing() {
    return (
        <div>
            < Navbar />
            < HeroSection />
            < Features />
            < About />
           
            < Footer />
        </div>
    );
}

export default Landing;