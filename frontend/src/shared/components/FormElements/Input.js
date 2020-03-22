import React from 'react';
import './Input.css'

const Input = props =>{
    const element = props.element === 'input'?(
        <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        />
    ) : (
        <textarea
        id={props.id}
        row={props.row || 3}
        />
    )
    return(
        <div className={`form-control`}>
            {element}
        </div>
    )
}
export default Input;