import React from "react";
import FeaturesComponent from "./FeaturesComponent";
import feature1 from "../assets/images/feature1.png";
import feature3 from "../assets/images/feature3.png";
import feature4 from "../assets/images/feature4.png";

function Features() {
  
  return (
    <section className="flex flex-col lg:h-auto items-center justify-center pb-16 p-5 md:pr-10 md:pl-10 lg:pr-10 mt-10 lg:mt-10 bg-primary/5">
      <p className="text-center font-link text-sm md:text-lg mb-1 text-primary">Features We Offer</p>
      <h1 className="text-xl md:text-2xl font-link font-bold text-center mb-5">Key Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-16 lg:gap-10 lg:grid-cols-3">
        <FeaturesComponent
          image={feature1}
          alt="Key Feature"
          header="Advanced Simulation"
          paragraph="Run sophisticated quantum simulations tailored to renewable energy applications."
        />
        <FeaturesComponent
          image={feature3}
          alt="Key Feature"
          header="Optimization Algorithms"
          paragraph="Utilize quantum algorithms to optimize energy production, storage, and grid management."
        />
        <FeaturesComponent
          image={feature4}
          alt="Key Feature"
          header="Collaboration and Insights"
          paragraph="Collaborate with peers, share insights, and gain actionable insights to drive sustainable energy innovation."
        />
      </div>
    </section>
  );
}

export default Features;
