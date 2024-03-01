import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { IoIosArrowDown, IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

function EducationSide({ onOptionSelect }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false); // Set sidebarOpen to false by default
    const [expandedOptions, setExpandedOptions] = useState({});

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onOptionSelect(option);
        // setSidebarOpen(false); // Close the sidebar when a list item is clicked
    };

    const toggleOption = (option) => {
        setExpandedOptions(prevState => ({
            ...prevState,
            [option]: !prevState[option]
        }));
    };

    const toggleSidebar = () => {
        setSidebarOpen(prevState => !prevState);
    };

    const handleLinkClick = () => {
        setSidebarOpen(false); // Close the sidebar when a link within the expanded options is clicked
    };

    return (
        <div className={`relative ${sidebarOpen ? '' : 'w-0'}`}>
            <div className={`sidebar bg-primary w-60 md:w-96 h-auto font-link p-2 md:p-4 ${sidebarOpen ? '' : 'hidden'}`}>
                <div className="sidebar-content">
                    <div className="px-10 py-4 mb-10">
                        <ul className="list-none">
                            <li
                                className={`cursor-pointer flex gap-3 items-center text-accent mb-3 font-bold text-sm md:text-xl ${selectedOption === 'quantum_physics' ? 'text-accent' : ''}`}
                                onClick={() => handleOptionClick('quantum_physics')}
                            >
                                Quantum Physics
                                <IoIosArrowDown className='text-xs md:text-sm' onClick={() => toggleOption('quantum_physics')} />
                            </li>
                            {expandedOptions['quantum_physics'] && (
                                <ul className='justify-center text-accent ' >
                                    <li className="cursor-pointer mb-3" > <Link to='Classical Mechanics' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Classical Mechanics</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Mathematical Foundations' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Mathematical Foundations</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Wave Mechanics' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Wave Mechanics</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Quantum Theory Postulates' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Quantum Theory Postulates</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Schrödinger Equation' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Schrödinger Equation</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Quantum Operators' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Quantum Operators</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Quantum States and Wavefunctions' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Quantum States and Wavefunctions</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Quantum Systems' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Quantum Systems</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Quantum Entanglement' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Quantum Entanglement</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Interpretations of Quantum Mechanics' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Interpretations of Quantum Mechanics</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Experimental Basis' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Experimental Basis</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Advanced Topics' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Advanced Topics</Link></li>
                                </ul>
                            )}
                            <li
                                className={`cursor-pointer text-accent flex gap-3 mb-3 items-center font-bold text-sm md:text-xl ${selectedOption === 'quantum_computing' ? 'text-accent' : ''}`}
                                onClick={() => handleOptionClick('quantum_computing')}
                            >
                                Quantum Computing
                                <IoIosArrowDown className='text-sm items-center' onClick={() => toggleOption('quantum_computing')} />
                            </li>
                            {expandedOptions['quantum_computing'] && (
                                <ul className='justify-center text-accent'>
                                    <li className="cursor-pointer mb-3"> <Link to='Introduction to Classical Computing' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Introduction to Classical Computing</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Foundations of Quantum Mechanics' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Foundations of Quantum Mechanics</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Foundations of Quantum Mechanics' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Foundations of Quantum Mechanics</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Qubits and Quantum Gates' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Qubits and Quantum Gates</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Quantum Algorithms' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Quantum Algorithms</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Quantum Complexity Theory' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Quantum Complexity Theory</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Quantum Error Correction' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Quantum Error Correction</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Quantum Hardware' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Quantum Hardware</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Quantum Programming' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Quantum Programming</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Applications of Quantum Computing' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Applications of Quantum Computing</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Quantum Information Theory' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Quantum Information Theory</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Experimental Quantum Computing' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Experimental Quantum Computing</Link></li>
                                    <li className="cursor-pointer mb-3"> <Link to='Future Directions and Challenges' spy={true} smooth={true} offset={-70} duration={500} className='text-accent font-semibold font-link cursor-pointer hover:text-black duration-500' onClick={handleLinkClick}>Future Directions and Challenges</Link></li>
                                </ul>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div
                className={`w-20 fixed cursor-pointer rounded-full bg-primary/80 backdrop-blur-sm top-24 left-0 z-50 transition-all ${sidebarOpen ? 'transform rotate-180' : 'transform rotate-0'}`}
                onClick={toggleSidebar}
            >
                <div className='flex justify-center items-center h-full p-4 cursor-pointer text-2xl'>
                    {sidebarOpen ? <IoIosArrowDroprightCircle className='text-accent text-center' /> : <IoIosArrowDroprightCircle className='text-accent text-center' />}
                </div>
            </div>
        </div>
    );
}

export default EducationSide;
