function Progress({ points, totalPoints, currQuestion, numQuestions, answer }) {
  return (
    <>
      <header className="progress">
        <progress
          value={currQuestion + Number(answer !== null)}
          min="0"
          max={numQuestions}
        ></progress>
        <span>
          Questions <strong>{currQuestion + 1} </strong> / {numQuestions}
        </span>
        <span>
          {" "}
          <strong>{points} </strong> /{totalPoints} points{" "}
        </span>
      </header>
    </>
  );
}

export default Progress;
