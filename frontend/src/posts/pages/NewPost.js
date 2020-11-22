import React, { useContext } from 'react';
import './NewPost.css'
import Input from '../../shared/components/FormElements/Input';
import { validatorRequire } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/from-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHistory } from 'react-router-dom';

const NewPost =() =>{
    const auth = useContext(AuthContext)
 
    const { sendRequest } = useHttpClient()

    const [fromState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    },false)

    const history = useHistory()
    const postSubmitHandler = async event => {
        event.preventDefault()
        //console.log(fromState.inputs)
        try {
            await sendRequest(
                'http://localhost:5000/api/posts/',
                'POST',
                JSON.stringify({
                    title: fromState.inputs.title.value,
                    description: fromState.inputs.description.value,
                    creator: auth.userId
                }),
                {'Content-Type' : 'application/json'}
            )
            history.push('/')
        } catch (err) {
            console.log(err)
            
        }
    }
    return(
        <div className="newPost">
            <h1>افزودن پست جدید</h1>
            <form onSubmit={postSubmitHandler}>
                <Input 
                id="title"
                element="input" 
                type="text" 
                placeholder="Enter post title ... "
                errorText= "plese Enter a valid title "
                validators={[validatorRequire()]}
                onInput={inputHandler}
                 />
                <Input 
                id="description"
                element="textarea" 
                placeholder="Enter post description ... "
                errorText= "plese Enter a valid description ... "
                validators={[validatorRequire()]}
                onInput={inputHandler}
                 />
                <Button
                    type='submit'
                    disabled={!fromState.isValid}
                >
                    افزودن پست
                </Button>
            </form>

        </div>
    )
}
export default NewPost;