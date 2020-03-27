import React from 'react';
import './Button.css'
import {Link} from 'react-router-dom'

const Button = props =>{
        if(props.href){
            return(
                <a href={props.href}>
                    {props.children}
                </a>
            )
        }
        if(props.to){
            return(
                <Link
                to={props.to}
                exact={props.exact}
                className={`button`}
                >
                    {props.children}
                </Link>
            )
        }
        return(
            <button
            className={`button`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
            >
                {props.children}
            </button>
        )
    
}
export default Button;