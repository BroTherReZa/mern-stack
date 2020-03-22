import React from 'react';
import './NewPost.css'
import Input from '../../shared/components/FormElements/Input';

const NewPost =() =>{
    return(
        <div>
            <h1>NewPost page </h1>
            <form>
                <Input element="input" type="text" placeholder="Enter post title ... " />
            </form>
        </div>
    )
}
export default NewPost;