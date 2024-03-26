import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import SimulatorComp from "../components/SimulatorsComp";
import microsoft from "../assets/images/microsoft.png";
import ibm from "../assets/images/ibm.jpeg";
import google from "../assets/images/google.jpeg";
import News from "../components/News";
import { Sidebar } from "../components/Sidebar";


function Dashboard() {
    const { currentUser } = useAuth(); // Access currentUser from auth context
    const navigate = useNavigate(); // Initialize navigate hook
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const newsCollection = collection(db, 'news');
                const newsSnapshot = await getDocs(newsCollection);
                const newsData = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Sort news by timestamp in descending order (latest first)
                const sortedNews = newsData.sort((a, b) => b.timestamp - a.timestamp);

                // Format timestamp to include day and month
                const formattedNews = sortedNews.map(item => {
                    const date = item.timestamp.toDate();
                    const formattedDate = `${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getDate()}`;
                    return { ...item, formattedDate };
                });

                setNews(formattedNews);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchNews();
    }, []);

    useEffect(() => {
        // Check if user is logged in
        if (!currentUser) {
            // If user is not logged in, redirect to login page
            navigate('/signin');
        }
    }, [currentUser, navigate]); // Add currentUser and navigate to dependency array

    return (
        <div className="">
            <Sidebar />
            <div className="md:mr-10 md:ml-10 mb-10 font-link">
                <div className="md:flex items-center justify-between border m-10 shadow-md rounded-md">
                    <div className="md:w-2/3 md:p-12 p-5">
                        <h1 className="text-2xl font-bold mb-2">Empowering Renewable Energy Innovation</h1>
                        <p className="text-md">Harness the power of quantum simulation to optimize renewable energy systems and drive sustainable innovation. QuantumRenew provides advanced simulation tools and real-time
                            data integration to help you unlock new insights and accelerate the transition to clean energy solutions. </p>
                    </div>
                    <div className="p-8">
                        <a href="https://simulato.streamlit.app/" target="_blank" rel="noopener noreferrer" className="text-white p-4 rounded-md shadow-md bg-primary">Start Simulation</a>
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
                        info="Start Simulation"
                    />
                    <SimulatorComp
                        image={ibm}
                        header="IBM Quantum"
                        paragraph="Run sophisticated quantum simulations tailored to any aspect, including renewable energy applications."
                        linkUrl="https://quantum-computing.ibm.com/"
                        info="Learn More"
                    />
                    <SimulatorComp
                        image={google}
                        header="Quantum AI"
                        paragraph="Run sophisticated quantum simulations tailored to any aspect, including renewable energy applications."
                        linkUrl="https://quantumai.google/"
                        info="Learn More"
                    />
                </div>
                <p className="text-md font-bold ml-10 mt-10">QuantumRenew News</p>
                <h3 className="text-md font-extralight ml-10 mb-10">Stay updated with the latest news and updates on QuantumRenew</h3>
                <div className="justify-around ml-10 mr-10">
                {news.map(item => (
                        <News
                            key={item.id}
                            header={`${item.header} - ${item.formattedDate}`} // Include formatted date in the header
                            paragraph={item.paragraph}
                            linkUrl={`/news/${item.id}`}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
