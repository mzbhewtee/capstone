import React from "react";
import Navbar from "../components/NavBar";
import HeroSection from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Footer from "../components/Footer";
import { FrequentlyAskedQuestions } from "../components/FrequentlyAskedQuestions";

function Landing() {
    return (
        <div className="md:mr-10 md:ml-10 font-link">
            < Navbar />
            < HeroSection />
            < Features />
            < About />
            < FrequentlyAskedQuestions />
            < Footer />
        </div>
    );
}

export default Landing;