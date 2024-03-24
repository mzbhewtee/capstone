import React, { useState } from "react";

// Quiz component
const Quiz = ({ questions }) => {
    // State for tracking current question index, selected answer, score, and completion status
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Function to handle answer selection
    const handleAnswerSelect = (selectedOption) => {
        setSelectedAnswer(selectedOption);
    };

    // Function to handle moving to the next question
    const handleNextQuestion = () => {
        // Check if the selected option is correct
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            // Increment correctAnswers count if the answer is correct
            setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
        }

        // Move to the next question
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(""); // Clear selected answer for the next question
        } else {
            // If it's the last question, mark the quiz as completed
            setQuizCompleted(true);
        }
    };

    // Function to reset the quiz
    const handleRedoQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer("");
        setCorrectAnswers(0);
        setQuizCompleted(false);
    };

    // Render quiz questions and answers
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Quiz</h1>
            {quizCompleted ? (
                // Render questions and answers if the quiz is completed
                <div className="border p-3 md:p-5 shadow-md">

                    <h2 className="font-bold text-lg">Quiz Completed</h2>
                    <p className="text-green-900 font-bold mb-3">Final Score: {correctAnswers} out of {questions.length}</p>
                    {/* Display questions and their corresponding answers */}
                    {questions.map((question, index) => (
                        <div key={index}>
                            <h3 className="font-bold">Question {index + 1}</h3>
                            <div className="mb-2">
                                <p>{question.text}</p>
                                <p><b>Correct Answer:</b> {question.correctAnswer}</p>
                            </div>
                        </div>
                    ))}
                    {/* Button to redo the quiz */}
                    <button onClick={handleRedoQuiz} className="py-3 px-10 h-14 bg-primary text-accent rounded-md mt-4">
                        Redo Quiz
                    </button>
                </div>
            ) : (
                // Render quiz questions if the quiz is not completed
                <div className="border p-3 md:p-10 shadow-md">
                    <div>
                        <h2 className="font-bold">Question {currentQuestion + 1}</h2>
                        <p>{questions[currentQuestion].text}</p>
                        {/* Render answer options as radio buttons */}
                        <ul>
                            {questions[currentQuestion].options.map((option, index) => (
                                <li key={index}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="answer"
                                            value={option}
                                            checked={selectedAnswer === option}
                                            onChange={() => handleAnswerSelect(option)}
                                        />
                                        {option}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Render "Next" or "Submit" button based on the current question */}
                    <button onClick={handleNextQuestion} className="py-3 px-10 h-14 bg-primary text-accent rounded-md mt-4">
                        {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
