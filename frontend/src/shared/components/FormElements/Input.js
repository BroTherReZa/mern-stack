import React, { useReducer, useEffect } from 'react';
import './Input.css'
import { validate } from '../../util/validators';



const inputReducer =(state, action)=>{
    switch(action.type){
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val,action.validators)
            }
        case 'BLUR':
            return {
                ...state,
                isBlured: true
            }
        default:
            return state 

    }
}
const Input = props =>{
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false,
        isBlured: false
    })
const { id, onInput } = props
const { value, isValid } = inputState
    useEffect(()=>{
        onInput(id, value, isValid)
    },[id, value, isValid, onInput])
    const changeHandler = event =>{
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        })
    }
    const blurHandler = () => {
        dispatch({
            type: 'BLUR'
        })
    }
    const element = props.element === 'input'?(
        <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value= {inputState.value}
        onBlur={blurHandler}
        />
    ) : (
        <textarea
        id={props.id}
        row={props.row || 3}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={blurHandler}
        />
    )
    return(
        <div className={`form-control`}>
            {element}
            {
                !inputState.isValid && 
                inputState.isBlured &&
                <p>{props.errorText}</p>
            }
        </div>
    )
}
export default Input;