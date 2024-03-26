import React from "react";
import ClassicalMechanics from "./ClassicalMechanics";
import MathematicalFoundation from "./MathematicalFoundation";
import WaveMechanics from "./WaveMechanics";
import QuantumTheoryPostulate from "./QuantumTheoryPostulate";
import SchrodingerEquation from "./SchrodingerEquation";
import QuantumOperators from "./QuantumOperators";
import QuantumStatesandWavefunctions from "./QuantumStatesandWavefunctions";
import QuantumSystems from "./QuantumSystems";
import QuantumEntanglement from "./QuantumEntanglement";
import InterpretationofQuantumMechanics from "./InterpretationofQuantumMechanics";
import ExperimentalBasis from "./ExperimentalBasis";
import AdvancedTopics from "./AdvancedTopics";
import image1 from "../assets/images/qp.jpg";
import Quiz from "../components/Quiz";
import SimulatorsComp from "../components/SimulatorsComp";
import harvard from "../assets/images/harvard.jpeg";
import ocw from "../assets/images/ocw.jpeg";
import caltech from "../assets/images/caltech.png";

const QP = () => {
    const questions = [
        {
            text: 'What is the capital of France?',
            options: ['London', 'Paris', 'Berlin', 'Madrid'],
            correctAnswer: 'Paris',
        },
        {
            text: 'Which planet is known as the Red Planet?',
            options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
            correctAnswer: 'Mars',
        },
        // Add more questions as needed
    ];

    return (
        <div className="font-link">

            <h2 className="font-bold text-center text-3xl">Quantum Physics</h2>
            <div className="md:flex items-center">
                <img
                    src={image1}
                    alt="Quantum Physics"
                    className="mt-10 mx-auto block w-96 rounded-md shadow-md"
                />
                <div>
                    <p className="mt-5 md:ml-10 text-lg text-justify">
                        Welcome to the fascinating world of quantum physics! In this section, we will embark on a journey to explore the fundamental principles and phenomena that govern the behavior of particles at the smallest scales of the universe. Quantum physics, also known as quantum mechanics, is a captivating field of study that delves into the mysteries of matter and energy at their most fundamental level.
                    </p>
                    <p className="mt-2 md:ml-10 text-lg text-justify"> Throughout our exploration, you will discover the following key concepts: </p>

                </div>


            </div>
            <ul className="mt-2 md:ml-10 text-lg list-disc list-inside">
                <li>Classical Mechanics vs. Quantum Mechanics</li>
                <li>Mathematical Foundation of Quantum Mechanics</li>
                <li>Wave Mechanics and Quantum Theory Postulates</li>
                <li>Introduction to the Schrödinger Equation</li>
                <li>Quantum Operators and Observables</li>
                <li>Quantum States and Wavefunctions</li>
                <li>Quantum Systems and Entanglement</li>
                <li>Interpretation of Quantum Mechanics</li>
                <li>Experimental Basis of Quantum Physics</li>
                <li>Advanced Topics in Quantum Physics</li>
            </ul>
            <p className="mt-10 text-lg text-justify">By the end of this journey, you will have gained a deeper understanding of the principles and phenomena that underpin quantum physics. Whether you are a beginner or an enthusiast in the field, join us as we unravel the mysteries of the quantum world and explore its profound implications for our understanding of nature. Let's dive in!
            </p>
            <p className="mt-10 text-lg text-justify"><b>What Is Quantum Physics? </b>
                Quantum physics aims to uncover the properties
                and behaviors of the very building blocks of nature.
                While many quantum experiments examine very small objects,
                such as electrons and photons,
                quantum phenomena are all around us, acting on every scale.</p>
            <p className="mt-10 text-lg text-justify">
                <b>Classical Bullets vs. Electrons in a Two-Slit Experiment:</b><br></br>
                Imagine a machine gun firing bullets at a wall with two parallel slits. If we block one slit, the bullets create a probability distribution curve (let’s call it P1). If we block the other slit, the curve is mirrored around the center (P2). When both slits are open, the total probability distribution P is the sum of P1 and P2.
                <br></br>Now, consider the same experiment with electrons. At the very small scale, quantum mechanics takes over. Unlike classical mechanics, where everything is deterministic, quantum mechanics only allows us to determine probabilities. Electrons exhibit wave-like behavior, creating interference patterns when passing through the slits. The result is vastly different from the classical bullet scenario2.
            </p>

            <Quiz questions={questions} />

            <div className="mt-10 mb-10 h-0.5 w-full bg-primary"></div>
            < ClassicalMechanics />
            <div className="mt-10 mb-10 h-0.5 w-full bg-primary"></div>
            < MathematicalFoundation />
            <div className="mt-10 mb-10 h-0.5 w-full bg-primary"></div>
            < WaveMechanics />
            <div className="mt-10 mb-10 h-0.5 w-full bg-primary"></div>
            < QuantumTheoryPostulate />
            <div className="mt-10 mb-10 h-0.5 w-full bg-primary"></div>
            < SchrodingerEquation />
            <div className="mt-10 mb-10 h-0.5 w-full bg-primary"></div>
            < QuantumOperators />
            <div className="mt-10 mb-10 h-0.5 w-full bg-primary"></div>
            < QuantumStatesandWavefunctions />
            <div className="mt-10 mb-10 h-0.5 w-full bg-primary"></div>
            < QuantumSystems />
            <div className="mt-10 mb-10 h-0.5 w-full bg-primary"></div>
            < QuantumEntanglement />
            <div className="mt-10 mb-10 h-0.5 w-full bg-primary"></div>
            < InterpretationofQuantumMechanics />
            <div className="mt-10 mb-10 h-0.5 w-full bg-primary"></div>
            < ExperimentalBasis />
            <div className="mt-10 mb-10 h-0.5 w-full bg-primary"></div>
            < AdvancedTopics />

            <p className="text-red-900 font-bold mt-10 text-lg">Learn More:</p>
            <div className="flex justify-center items-center mt-5">    
            <SimulatorsComp
                image={harvard}
                header="Introduction to quantum
                    mechanics"
                paragraph="Learn the fundamental principles of quantum mechanics and explore the quantum world through interactive simulations."
                linkUrl="https://scholar.harvard.edu/files/david-morin/files/waves_quantum.pdf"
                info="Learn More"
            />
            <SimulatorsComp
                image={ocw}
                header="Quantum Physics I"
                paragraph="Explore the principles of quantum physics through MIT's OpenCourseWare, covering topics such as wave-particle duality and quantum entanglement."
                linkUrl="https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/"
                info="Learn More"
            />
            <SimulatorsComp
                image={caltech}
                header="Quantum Science Explained"
                paragraph="Gain in-depth insights into quantum science and explore the mysteries of quantum physics through Caltech's Science Exchange."
                linkUrl="https://scienceexchange.caltech.edu/topics/quantum-science-explained/quantum-physics"
                info="Learn More"
            />
            </div>
            <ol className="underline font-bold">
                <li><a href="https://quantumphysicsmadesimple.com/introduction-for-beginners/" target="_blank" rel="noopener noreferrer">Quantum Physics Made Simple (An introduction for beginners)</a></li>
            </ol>
        </div>
    );
}

export default QP;
