import React from "react";
import QuestionItem from "./QuestionItem";
import { useState, useEffect } from "react";


function QuestionList() {
  const [questions, setQuestions] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((resp) => resp.json())
    .then((questions) => {
      setQuestions(questions)
    });
  }, [])

  function handleUpdateQuestion(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
    .then((resp) => resp.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((question) => {
        if (question.id === updatedQuestion.id) {
          return updatedQuestion
        } else {
          return question
        }
      })
      setQuestions(updatedQuestions)
    })
  }
  
  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((resp) => resp.json())
    .then(() => {
      const updatedQuestions = questions.filter((question) => question.id !== id)
      setQuestions(updatedQuestions)
    });
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul  className="questions">
      {/* display QuestionItem components here after fetching */}
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onUpdateQuestion={handleUpdateQuestion}
            onDeleteQuestion={handleDeleteQuestion}
          />
        ))}
      </ul>
    </section>
  );
}


export default QuestionList;