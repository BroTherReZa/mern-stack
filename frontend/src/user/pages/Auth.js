import React, { useState, useContext } from 'react'

import './Auth.css'
import Input from '../../shared/components/FormElements/Input'
import { validatorRequire } from '../../shared/components/util/validators'
import { useForm } from '../../shared/hooks/from-hook'
import Button from '../../shared/components/FormElements/Button'
import { AuthContext } from '../../shared/context/auth-context'

const Auth = () => {
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [formState, inputHandler, setFormData] = useForm({
        email:{
            value: '',
            isValid: false
        },
        password:{
            value: '',
            isValid: false
        }
    }, false)
    const switchModeHandler = () => {
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name: undefined
            },
                formState.inputs.email.isValid &&
                formState.inputs.password.isValid
            )
        }else {
                setFormData({
                    ...formState.inputs,
                    name:{
                        value: '',
                        isValid: false
                    }
                },false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }
    const authSubmitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs)
        auth.login()
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && 
                    <Input
                        id="name"
                        type="text"
                        element="input"
                        placeholder="name"
                        validators={[validatorRequire()]}
                        errorText="Enter a valid name"
                        onInput={inputHandler}
                    />
                }
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
                >
                    {isLoginMode ? 'Login' : 'Signup'}
                </Button>
            </form>
            <Button 
            onClick={switchModeHandler}
            >
                Swith to {!isLoginMode ? 'Login' : 'Signup'}
            </Button>
        </div>
    )
}

export default Auth