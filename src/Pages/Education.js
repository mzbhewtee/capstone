import React, { useState } from "react";
import Navigator from "../components/Navigator";
import EducationSide from "../components/EducationSide";
import QP from "../Quantum Physics/QP";

function Education() {
    const [selectedContent, setSelectedContent] = useState('quantum_physics'); // Set default selectedContent to 'quantum_physics'

    const handleContentSelect = (content) => {
        setSelectedContent(content);
    };

    return (
        <div>
            <Navigator />
            <div className="flex pt-16 md:pt-32">
                <EducationSide onOptionSelect={handleContentSelect} /> 
                
                <div className="flex flex-col ml-10 mr-10 mb-40 md:ml-20 md:mr-20">
                    <div className="flex flex-col md:flex-row justify-center items-center mt-10">
                        {/* Render content based on selectedContent */}
                        {selectedContent === 'quantum_physics' && (
                            <>
                                <QP />
                            </>
                        )}
                        {selectedContent === 'quantum_computing' && (
                            <>
                                <h1>Quantum Computing</h1>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Education;
