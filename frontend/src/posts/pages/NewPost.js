import React from 'react';
import './NewPost.css'
import Input from '../../shared/components/FormElements/Input';
import { validatorRequire } from '../../shared/components/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/from-hook';

const NewPost =() =>{
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

    const postSubmitHandler = event => {
        event.preventDefault()
        console.log(fromState.inputs)
    }
    return(
        <div>
            <h1>NewPost page </h1>
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
                    Add Post
                </Button>
            </form>

        </div>
    )
}
export default NewPost;