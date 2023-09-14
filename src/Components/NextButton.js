function NextButton({ answer, dispatch, currQuestion, numQuestions }) {
  
  if (answer === null) return;

  if (currQuestion < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
  if (currQuestion === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finishScreen" })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
