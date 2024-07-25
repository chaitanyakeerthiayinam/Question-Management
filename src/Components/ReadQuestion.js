/*import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ReadQuestion() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuestion();
    });

    function fetchQuestion() {
        axios.get(`http://localhost:5000/questions/${id}`)
            .then(response => {
                setQuestion(response.data);
            })
            .catch(error => {
                console.log('There was an error fetching the Questions data!', error);
            });
    }

    return (
        <div className="container mt-4">
            <h2>Question Details</h2>
            <div className="row">
                {question ? (
                    <div className="col-md-12" key={question.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Question No: {question.id}</h5>
                                <p className="card-text">Question Text: {question.questiontext}</p>
                                <div className="card-text">
                                    {question.options.map((option, index) => (
                                        <p key={index}>Option {index + 1}: {option}</p>
                                    ))}
                                </div>
                                <p className="card-text">Correct Answer: {question.correctanswer}</p>
                                <p className="card-text">Category: {question.category}</p>
                                <button type="button" className="btn btn-info" onClick={() => navigate('/listquestions')}>Go back</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default ReadQuestion;*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './ReadQuestion.css'; // Import the CSS file

function ReadQuestion() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuestion();
    }, []);

    function fetchQuestion() {
        axios.get(`http://localhost:5000/questions/${id}`)
            .then(response => {
                setQuestion(response.data);
            })
            .catch(error => {
                console.log('There was an error fetching the Questions data!', error);
            });
    }

    function toggleAnswerVisibility() {
        setShowAnswer(prevShowAnswer => !prevShowAnswer);
    }

    return (
        <div className="container2">
            <h2>Question Details</h2>
            <div className="question-details">
                {question ? (
                    <div key={question.id}>
                        <div className="question-header">
                            <h5>Question No: {question.id}</h5>
                        </div>
                        <h5 className="question-text">Question Text: {question.questiontext}</h5>
                        <div className="options">
                            {question.options.map((option, index) => (
                                <p className="option" key={index}>Option {index + 1}: {option}</p>
                            ))}
                        </div>
                        {showAnswer && (
                            <h6 className="correct-answer">Correct Answer: {question.correctanswer}</h6>
                        )}
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={toggleAnswerVisibility}
                        >
                            {showAnswer ? 'Hide Correct Answer' : 'Show Correct Answer'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/listquestions')}
                        >
                            Go back
                        </button>
                    </div>
                ) : (
                    <p className="loading">Loading...</p>
                )}
            </div>
        </div>
    );
}

export default ReadQuestion;

