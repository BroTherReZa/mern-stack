import React from 'react';
import './NewPost.css'
import Input from '../../shared/components/FormElements/Input';
import { validatorRequire } from '../../shared/components/util/validators';

const NewPost =() =>{
    return(
        <div>
            <h1>NewPost page </h1>
            <form>
                <Input 
                element="input" 
                type="text" 
                placeholder="Enter post title ... "
                errorText= "plese Enter a valid title "
                validators={[validatorRequire()]}
                 />
            </form>
        </div>
    )
}
export default NewPost;