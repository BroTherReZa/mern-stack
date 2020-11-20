import React, { useState, useContext } from 'react'

import './Auth.css'
import Input from '../../shared/components/FormElements/Input'
import { validatorRequire } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/from-hook'
import Button from '../../shared/components/FormElements/Button'
import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'

const Auth = () => {
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const { sendRequest } = useHttpClient()
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
    const authSubmitHandler = async event => {
        event.preventDefault()
        //console.log(formState.inputs)
        if(isLoginMode){
            try {
                await sendRequest(
                    'http://localhost:5000/api/users/login',
                    'POST',
                    JSON.stringify({
                        email : formState.inputs.email.value,
                        password : formState.inputs.password.value
                    }),
                    {'Content-Type' : 'application/json'}
                )
                auth.login() 
            } catch (err) {
                console.log(err)
            }
        }else {
            try {
                await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'POST',
                    JSON.stringify({
                        name : formState.inputs.name.value,
                        email : formState.inputs.email.value,
                        password : formState.inputs.password.value
                    }),
                    {'Content-Type' : 'application/json'}
                )
                auth.login() 
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <div className="auth">
            <h2>ورود و ثبت نام</h2>
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
                    {isLoginMode ? 'ورود' : 'ثبت نام'}
                </Button>
            </form>
            <Button 
            onClick={switchModeHandler}
            >
                 {!isLoginMode ? 'ورود' : 'ثبت نام'}
            </Button>
        </div>
    )
}

export default Auth