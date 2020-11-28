import React, { useState, useContext } from 'react'

import './Auth.css'
import Input from '../../shared/components/FormElements/Input'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
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
                name: undefined,
                image: undefined
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
                    },
                    image: {
                        value: null,
                        isValid: false
                    }
                },false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    const authSubmitHandler = async event => {
        event.preventDefault()
        console.log(formState.inputs)
        if(isLoginMode){
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/login',
                    'POST',
                    JSON.stringify({
                        email : formState.inputs.email.value,
                        password : formState.inputs.password.value
                    }),
                    {'Content-Type' : 'application/json'}
                )
                auth.login(responseData.user.id) 
            } catch (err) {
                console.log(err)
            }
        }else {
            try {
                const formData = new FormData()
                formData.append('name',formState.inputs.name.value)
                formData.append('email',formState.inputs.email.value)
                formData.append('password',formState.inputs.password.value)
                formData.append('image',formState.inputs.image.value)
                
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'POST',
                    formData 
                )
                auth.login(responseData.user.id) 
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
                {!isLoginMode && 
                    <ImageUpload 
                    id="image"
                    onInput={inputHandler}
                    errorText="ivalid image"
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