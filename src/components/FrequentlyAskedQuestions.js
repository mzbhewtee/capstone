import React from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

export function FrequentlyAskedQuestions() {
    const [open, setOpen] = React.useState(0);
    const [alwaysOpen, setAlwaysOpen] = React.useState(true);

    const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <div className="bg-primary/5 p-3 md:p-5">
            <p className="text-center font-link text-sm md:text-lg mb-1 text-primary">FAQ</p>
            <h1 className="text-xl md:text-2xl font-link font-bold text-center mb-5">Frequently Asked Questions</h1>
            <div className="p-5 md:p-10 border m-5 md:m-10 shadow-md bg-white rounded-md">
                <Accordion open={alwaysOpen}>
                    <AccordionHeader onClick={handleAlwaysOpen} className="font-link">What is QuantumRenew?</AccordionHeader>
                    <AccordionBody className="font-link">
                    QuantumRenew is an innovative platform that combines quantum simulation technology with renewable energy applications. 
                    It allows researchers, engineers, and stakeholders in the renewable energy sector to model and optimize complex physical 
                    systems using advanced quantum computing techniques.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 1}>
                    <AccordionHeader onClick={() => handleOpen(1)} className="font-link">
                    How does QuantumRenew work?
                    </AccordionHeader>
                    <AccordionBody className="font-link">
                    QuantumRenew utilizes quantum simulation algorithms to emulate the behavior of renewable energy systems, such as solar panels, 
                    wind turbines, and energy storage devices. 
                    Users input parameters, run simulations, and analyze results to optimize energy production, storage, and grid management.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2}>
                    <AccordionHeader onClick={() => handleOpen(2)} className="font-link">
                    Who can use QuantumRenew?
                    </AccordionHeader>
                    <AccordionBody className="font-link">
                    QuantumRenew is designed for anyone involved in renewable energy research, 
                    development, and implementation, including researchers, engineers, educators, and policymakers.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 3}>
                    <AccordionHeader onClick={() => handleOpen(3)} className="font-link">
                    What are the benefits of using QuantumRenew?
                    </AccordionHeader>
                    <AccordionBody className="font-link">
                    QuantumRenew offers a range of benefits, including faster and more accurate simulations, 
                    reduced computational costs, and the ability to optimize complex energy systems to maximize performance and efficiency.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 4}>
                    <AccordionHeader onClick={() => handleOpen(4)} className="font-link">
                    How can I get started with QuantumRenew?
                    </AccordionHeader>
                    <AccordionBody className="font-link">
                    To get started with QuantumRenew, simply sign up for an account, 
                    and you will gain access to the platform's powerful quantum simulation tools and renewable energy applications.
                    </AccordionBody>
                </Accordion>
            </div>
        </div>
    );
}