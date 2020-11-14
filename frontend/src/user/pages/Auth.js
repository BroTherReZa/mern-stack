import React, { useState, useContext } from 'react'

import './Auth.css'
import Input from '../../shared/components/FormElements/Input'
import { validatorRequire } from '../../shared/util/validators'
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
    const authSubmitHandler = async event => {
        event.preventDefault()
        //console.log(formState.inputs)
        if(isLoginMode){
            try {
                const response = await fetch('http://localhost:5000/api/users/login', {
                    method:'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        email : formState.inputs.email.value,
                        password : formState.inputs.password.value
                    })
                })
                const responseData = await response.json()
                if(!response.ok){
                    throw new Error(responseData.message)
                }
                auth.login() 
            } catch (err) {
                console.log(err)
            }
        }else {
            try {
                const response = await fetch('http://localhost:5000/api/users/signup', {
                    method:'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        name : formState.inputs.name.value,
                        email : formState.inputs.email.value,
                        password : formState.inputs.password.value
                    })
                })
                const responseData = await response.json()
                if(!response.ok){
                    throw new Error(responseData.message)
                }
                console.log(responseData)
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