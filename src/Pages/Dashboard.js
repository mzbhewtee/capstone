import React from "react";
import { Sidebar } from "../components/Sidebar";
import SimulatorComp from "../components/SimulatorsComp";
import microsoft from "../assets/images/microsoft.png";
import ibm from "../assets/images/ibm.jpeg";
import google from "../assets/images/google.jpeg";
import News from "../components/News";

function Dashboard() {
    return (
        <div className="">
            < Sidebar />
            <div className="md:mr-10 md:ml-10 mb-10 font-link">
                <div className="md:flex items-center justify-between border m-10 shadow-md rounded-md">
                    <div className="md:w-2/3 md:p-12 p-5">
                        <h1 className="text-2xl font-bold mb-2">Empowering Renewable Energy Innovation</h1>
                        <p className="text-md">Harness the power of quantum simulation to optimize renewable energy systems and drive sustainable innovation. QuantumRenew provides advanced simulation tools and real-time
                            data integration to help you unlock new insights and accelerate the transition to clean energy solutions. </p>
                    </div>
                    <div className="p-8">
                        <button className="bg-primary hover:shadow-md text-white text-sm py-4 px-4 rounded-xl md:mt-4">Start Simulation</button>
                    </div>
                </div>

                <p className="text-md font-bold ml-10 mr-10">Try Other Simulators</p>
                <h3 className="text-md font-extralight ml-10 mr-10 md:mb-10 mb-20">Check out other quantum computer simulator from wellknown organizations</h3>
                <div className="md:flex justify-around ml-10 mr-10">
                    <SimulatorComp
                        image={microsoft}
                        header="Azure Quantum"
                        paragraph="Run sophisticated quantum simulations tailored to any aspect, including renewable energy applications."
                        linkUrl="https://quantum.microsoft.com/en-us/experience/quantum-coding"
                    />
                    <SimulatorComp
                        image={ibm}
                        header="IBM Quantum"
                        paragraph="Run sophisticated quantum simulations tailored to any aspect, including renewable energy applications."
                        linkUrl="https://quantum-computing.ibm.com/"
                    />
                    <SimulatorComp
                        image={google}
                        header="Quantum AI"
                        paragraph="Run sophisticated quantum simulations tailored to any aspect, including renewable energy applications."
                        linkUrl="https://quantumai.google/"
                    />
                </div>
                <p className="text-md font-bold ml-10 mt-10">QuantumRenew News</p>
                <h3 className="text-md font-extralight ml-10 mb-10">Stay updated with the latest news and updates on QuantumRenew</h3>
                <div className="justify-around ml-10 mr-10">
                    <News
                        header="Quantum Computing: The Next Big Thing in Renewable Energy"
                        paragraph="Quantum computing has the potential to revolutionize the renewable energy sector. It can help in optimizing renewable energy systems and drive sustainable innovation."
                        linkUrl="https://quantum.microsoft.com/en-us/experience/quantum-coding"
                    />
                    <News
                        header="Quantum Computing: The Next Big Thing in Renewable Energy"
                        paragraph="Quantum computing has the potential to revolutionize the renewable energy sector. It can help in optimizing renewable energy systems and drive sustainable innovation."
                        linkUrl="https://quantum.microsoft.com/en-us/experience/quantum-coding"
                    />
                    <News
                        header="Quantum Computing: The Next Big Thing in Renewable Energy"
                        paragraph="Quantum computing has the potential to revolutionize the renewable energy sector. It can help in optimizing renewable energy systems and drive sustainable innovation."
                        linkUrl="https://quantum.microsoft.com/en-us/experience/quantum-coding"
                    />
                </div>

            </div>
        </div>
    );
}

export default Dashboard;