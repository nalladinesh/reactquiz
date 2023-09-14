import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],

  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  currQuestion: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_QUESTION };
    case "answer":
      const question = state.questions.at(state.currQuestion);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, currQuestion: state.currQuestion + 1, answer: null };

    case "finishScreen":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        currQuestion: 0,
        answer: null,
        points: 0,
        secondsRemaining: 300
      };

    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      currQuestion,
      answer,
      points,
      highScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  // const { questions, status } = state;

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((points, que) => points + que.points, 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              points={points}
              totalPoints={totalPoints}
              currQuestion={currQuestion}
              numQuestions={numQuestions}
              answer={answer}
            />
            <Question
              question={questions[currQuestion]}
              dispatch={dispatch}
              answer={answer}
            />
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            <NextButton
              answer={answer}
              dispatch={dispatch}
              numQuestions={numQuestions}
              currQuestion={currQuestion}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

/*

import "./styles.css";
import {useReducer} from 'react'

const initialState = {count: 0, step: 1}

function reducer(state, action) {
  console.log(state, action)
 switch (action.type) {
   case 'setStep':
     return {...state, step: action.payload}
   case 'setInput':
     return {...state, count: action.payload}
    case 'dec': 
    return {...state, count: state.count-state.step}
    case 'inc':
      return {...state, count: state.count+state.step}
    case 'reset' :
      return initialState
     
 
   default:
    throw new Error('Something went wrong')
 }
 
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {count, step} = state;
  const date = new Date()
 date.setDate( date.getDate()+count)

  function handleSetStep(e) {
    dispatch({type: 'setStep', payload: Number(e.target.value)})
  }

  function handleInputChange(e) {
    dispatch({type: "setInput", payload: Number(e.target.value)})
  }

  function handleDecrement() {
    dispatch({type: 'dec'})
  }

  function handleIncrement() {
    dispatch ({type: 'inc'})
  }

  function handleReset() {
    dispatch({type: 'reset'})
  }

  return (
    <div className="App">
     <SliderStep step = {step} onSetStep = {handleSetStep} />
     <Counter count = {count} onInputChange = {handleInputChange} 
     onDecrement = {handleDecrement} onIcrement = {handleIncrement}
     />
     <Output date = {date} />
     <button onClick = {handleReset} >Reset</button>
    </div>
  );
}

function SliderStep({step, onSetStep}) {
  return  <div>

   <input type = 'range' min = '1' max = '10' value = {step} 
   onChange = {onSetStep}
   />
   <span>{step} </span>
  </div>
}

function Counter({count, onInputChange, onDecrement, onIcrement }) {
  return <div>
    <button onClick = {onDecrement} >-</button>
    <input type = 'text' value = {count} onChange = {onInputChange} />
    <button onClick = {onIcrement} >+</button>
  </div>
}

function Output({date}) {
  return <div>{date.toDateString()} </div>
}


*/
