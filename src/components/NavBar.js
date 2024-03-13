import { useState } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import Logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of Navigate
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";



function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (section) => {
        scroll.scrollTo(section, {
            duration: 800,
            smooth: 'easeInOutQuad',
        });
        setMenuOpen(false);
    };

    const handleSignInClick = () => {
        navigate('/signin'); // Use navigate function for navigation
    };

    const handleSignUpClick = () => {
        navigate('/signup'); // Use navigate function for navigation
    }

    return (
        <nav className="overflow-hidden z-30 fixed shadow-md w-full bg-white">
            <div className='flex justify-between items-center p-7 lg:pt-10 lg:pb-7 lg:pl-10 lg:pr-10 shadow-md'>
                <img src={Logo} alt='Quantum Renew' className='w-24 lg:w-32 md:w-32 cursor-pointer' />
                <div className='hidden lg:flex items-center space-x-10'>
                    <Link
                        to='about-section'
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        className='text-black font-semibold font-link cursor-pointer hover:text-primary duration-500'
                    >
                        About
                    </Link>
                    <Link
                        to='education-section'
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        className='text-black font-semibold font-link cursor-pointer hover:text-primary duration-500'
                    >
                        Education
                    </Link>
                    <Link
                        to='contact-section'
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        className='text-black font-semibold font-link cursor-pointer hover:text-primary duration-500'
                    >
                        Contact
                    </Link>
                    <button
                        className='bg-accent text-primary font-semibold font-link px-10 py-2 rounded-lg hover:shadow-lg border duration-500' onClick={handleSignInClick}
                    >
                        Sign In
                    </button>

                    <button
                        className='bg-primary text-accent font-semibold font-link px-10 py-2 rounded-lg hover:shadow-lg border border-primary duration-500' onClick={handleSignUpClick}
                    >
                        Sign Up
                    </button>

                </div>
            </div>
            <div
                className={`lg:hidden fixed cursor-pointer top-4 right-10 z-40 transition-all ${isMenuOpen ? 'transform rotate-180' : 'transform rotate-0'}`}
                onClick={toggleMenu}
            >
                <div className='flex justify-center items-center h-full p-2 text-primary cursor-pointer text-xl'>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {isMenuOpen && (
                <div className='fixed z-30 right-0 bg-accent border backdrop-blur-sm w-1/2 h-screen text-secondary font-link text-md lg:text-lg justify-center text-center tracking-wider transition-all'>
                    <ul className={`mt-36 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in`}>
                        <li className='mb-7 hover:text-primary duration-500 cursor-pointer'>
                            <Link
                                to='about-section'
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={() => isMenuOpen && setMenuOpen(false)}
                            >
                                About
                            </Link>
                        </li>

                        <li className='mb-7 hover:text-primary duration-500 cursor-pointer'>
                            <Link
                                to='education-section'
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={() => isMenuOpen && setMenuOpen(false)}
                            >
                                Education
                            </Link>
                        </li>
                        <li className='mb-7 hover:text-primary duration-500 cursor-pointer'>
                            <Link
                                to='contact-section'
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={() => isMenuOpen && setMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <button
                                className='bg-accent text-primary font-semibold font-link px-10 py-2 mb-7 rounded-lg hover:shadow-md border duration-500' onClick={handleSignInClick}
                            >
                                Sign In
                            </button>

                        </li>
                        <li>
                            <button
                                className='bg-primary text-accent font-semibold font-link px-10 py-2 rounded-lg hover:shadow-md border border-primary duration-500' onClick={handleSignUpClick}
                            >
                                Sign Up
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
