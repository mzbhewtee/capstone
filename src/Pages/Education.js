import React, { useState } from "react";
import QP from "../Quantum Physics/QP";
import Sidebar from "../components/Sidebar";

function Education() {
    const [selectedContent, setSelectedContent] = useState('quantum_physics'); // Set default selectedContent to 'quantum_physics'

    const handleContentSelect = (content) => {
        setSelectedContent(content);
    };

    return (
        <div>
            
            <Sidebar />                
                <div className="flex flex-col mr-4 ml-4 mb-40 md:ml-20 md:mr-20">
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
    );
}

export default Education;
