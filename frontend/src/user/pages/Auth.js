import React from 'react'

import './Auth.css'
import Input from '../../shared/components/FormElements/Input'
import { validatorRequire } from '../../shared/components/util/validators'
import { useForm } from '../../shared/hooks/from-hook'
import Button from '../../shared/components/FormElements/Button'

const Auth = () => {
    const [formState, inputHandler] = useForm({
        email:{
            value: '',
            isValid: false
        },
        password:{
            value: '',
            isValid: false
        }
    }, false)
    const autSubmitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={autSubmitHandler}>
                <Input 
                id="email"
                type="email"
                element="input"
                placeholder="Email ..."
                validators={[validatorRequire]}
                errorText="Enter a valid Email Address!"
                onInput={inputHandler}
                />
                <Input 
                id="password"
                type="password"
                element="input"
                placeholder="password ..."
                validators={[validatorRequire]}
                errorText="Enter a valid password"
                onInput={inputHandler}
                />
                <Button 
                    type="submit"
                    disabled={!formState.isValid}
                >Login</Button>
            </form>
        </div>
    )
}

export default Auth