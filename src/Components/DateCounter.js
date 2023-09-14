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
    <div className="counter">
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
