import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteQuestion() {
    onDeleteQuestion(id);
  }

  function handleUpdateQuestion(event) {
    const correctIndex = parseInt(event.target.value);
    onUpdateQuestion(id, correctIndex);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
        defaultValue={correctIndex}
        onChange={handleUpdateQuestion}
        >
        {options}</select>
      </label>
      <button
      onClick={handleDeleteQuestion}
      >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
