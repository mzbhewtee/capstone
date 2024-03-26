import React from "react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { IoIosPeople } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { IoSchoolSharp, IoNotifications } from "react-icons/io5";
import { UserCircleIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../auth";
import { useAuth } from "../context/authContext";
import Logo from "../assets/images/logo.png";

export function Sidebar() {
    const [open, setOpen] = React.useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const [openEducation, setOpenEducation] = React.useState(0);
    const [openQuantumPhysics, setOpenQuantumPhysics] = React.useState(false);
    const [openQuantumComputing, setOpenQuantumComputing] = React.useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth(); // Access currentUser from context

    const handleOpenEducation = (value) => {
        setOpenEducation(openEducation === value ? 0 : value);
    };

    const handleLogout = async () => {
        try {
            await doSignOut();
            navigate("/"); // Redirect to the home page after logout
        } catch (error) {
            console.log("Error signing out: ", error);
        }
    };

    const navigateToProfile = () => {
        if (currentUser) {
            navigate(`/profile/${currentUser.uid}`); // Navigating to the profile page with the user's UID
        }
    };

    const handleOpenQuantumPhysics = () => {
        setOpenQuantumPhysics(!openQuantumPhysics);
    };

    const handleOpenQuantumComputing = () => {
        setOpenQuantumComputing(!openQuantumComputing);
    };

    const navigateTo = (path) => {
        window.location.href = path;
    };

    return (
        <React.Fragment>
            <div className="z-30 p-5 ml-5 mt-5 font-link fixed rounded-full bg-primary/10 backdrop-blur-sm">
                <Bars3Icon className="h-8 w-8 text-primary cursor-pointer" onClick={openDrawer} />
            </div>
            <Drawer open={open} onClose={closeDrawer} className="overflow-y-auto">
                <div className="mb-2 flex items-center justify-between p-4">
                    <img src={Logo} alt="QuantumRenew" className="w-10 h-10" />
                    <Typography color="blue-gray" className="text-lg font-bold">QuantumRenew</Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <List>
                    <ListItem onClick={() => navigateTo('/dashboard')}>
                        <ListItemPrefix>
                            <MdSpaceDashboard className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-normal">Dashboard</Typography>
                    </ListItem>

                    <Accordion
                        open={openEducation === 2}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${openEducation === 2 ? 'rotate-180' : ''}`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={openEducation === 2}>
                            <AccordionHeader onClick={() => handleOpenEducation(2)} className="border-b-0 p-3">
                                <ListItemPrefix>
                                    <IoSchoolSharp className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" onClick={() => navigateTo('/education')} className="mr-auto font-normal">
                                    Education
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem onClick={handleOpenQuantumPhysics}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray">Quantum Physics</Typography>
                                </ListItem>
                                {/* Other items within the Quantum Physics list */}
                            </List>
                            {openQuantumPhysics && (
                                <List className="p-0 ml-4">
                                    {/* Your list of Quantum Physics sub-items here */}
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Classical Mechanics" spy={true} smooth={true} offset={-70} duration={500}>
                                            Classical Mechanics
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Mathematical Foundations" spy={true} smooth={true} offset={-70} duration={500}>
                                            Mathematical Foundations
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Wave Mechanics" spy={true} smooth={true} offset={-70} duration={500}>
                                            Wave Mechanics
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Quantum Theory Postulates" spy={true} smooth={true} offset={-70} duration={500}>
                                            Quantum Theory Postulates
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Schrödinger Equation" spy={true} smooth={true} offset={-70} duration={500}>
                                            Schrödinger Equation
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Quantum Operators" spy={true} smooth={true} offset={-70} duration={500}>
                                            Quantum Operators
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Quantum States and Wavefunctions" spy={true} smooth={true} offset={-70} duration={500}>
                                            Quantum States and Wavefunctions
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Quantum Systems" spy={true} smooth={true} offset={-70} duration={500}>
                                            Quantum Systems
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Quantum Entanglement" spy={true} smooth={true} offset={-70} duration={500}>
                                            Quantum Entanglement
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Interpretations of Quantum Mechanics" spy={true} smooth={true} offset={-70} duration={500}>
                                            Interpretations of Quantum Mechanics
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Experimental Basis" spy={true} smooth={true} offset={-70} duration={500}>
                                            Experimental Basis
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Advanced Topics" spy={true} smooth={true} offset={-70} duration={500}>
                                            Advatnced Topics
                                        </Link>
                                    </ListItem>
                                </List>
                            )}
                            <List className="p-0">
                                <ListItem onClick={handleOpenQuantumComputing}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray">Quantum Computing</Typography>
                                </ListItem>
                                {/* Other items within the Quantum Computing list */}

                            </List>
                            {openQuantumComputing && (
                                <List className="p-0 ml-4">
                                    {/* Your list of Quantum Computing sub-items here */}
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Introduction to Classical Computing" spy={true} smooth={true} offset={-70} duration={500}>
                                            Introduction to Classical Computing
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Foundations of Quantum Mechanics" spy={true} smooth={true} offset={-70} duration={500}>
                                            Foundations of Quantum Mechanics
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Qubits and Quantum Gates" spy={true} smooth={true} offset={-70} duration={500}>
                                            Qubits and Quantum Gates
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Quantum Algorithms" spy={true} smooth={true} offset={-70} duration={500}>
                                            Quantum Algorithms
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Quantum Complexity Theory" spy={true} smooth={true} offset={-70} duration={500}>
                                            QQuantum Complexity Theory
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Quantum Error Correction" spy={true} smooth={true} offset={-70} duration={500}>
                                            Quantum Error Correction
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Quantum Hardware" spy={true} smooth={true} offset={-70} duration={500}>
                                            Quantum Hardware
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Quantum Programming" spy={true} smooth={true} offset={-70} duration={500}>
                                            Quantum Programming
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Applications of Quantum Computing" spy={true} smooth={true} offset={-70} duration={500}>
                                            Applications of Quantum Computing
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Quantum Information Theory" spy={true} smooth={true} offset={-70} duration={500}>
                                            Quantum Information Theory
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Experimental Quantum Computing" spy={true} smooth={true} offset={-70} duration={500}>
                                            Experimental Quantum Computing
                                        </Link>
                                    </ListItem>
                                    <ListItem className="cursor-pointer mb-3">
                                        <Link to="Future Directions and Challenges" spy={true} smooth={true} offset={-70} duration={500}>
                                            Future Directions and Challenges
                                        </Link>
                                    </ListItem>
                                </List>
                            )}
                        </AccordionBody>
                    </Accordion>
                    <hr className="my-2 border-blue-gray-50" />
                    <ListItem onClick={() => navigateTo('/notifications')}>
                        <ListItemPrefix>
                            <IoNotifications className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-normal">Notifications</Typography>
                    </ListItem>
                    <ListItem onClick={() => navigateTo('/community')}>
                        <ListItemPrefix>
                            <IoIosPeople className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-normal">Community</Typography>
                    </ListItem>
                    <ListItem onClick={navigateToProfile}>
                        <ListItemPrefix>
                            <UserCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-normal">Profile</Typography>
                    </ListItem>
                    <ListItem onClick={() => navigateTo('/settings')}>
                        <ListItemPrefix>
                            <Cog6ToothIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-normal">Settings</Typography>
                    </ListItem>
                    <ListItem onClick={handleLogout}>
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-normal">Log Out</Typography>
                    </ListItem>
                </List>
                <Button className="mt-3 ml-5" size="sm">
                    Documentation
                </Button>
            </Drawer>
        </React.Fragment>
    );
}