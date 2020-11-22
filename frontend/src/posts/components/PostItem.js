import React, { useContext } from 'react'
import './PostItem.css'
import Button from '../../shared/components/FormElements/Button'
import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'

const PostItem = props =>{
    const {sendRequest} = useHttpClient()
    const auth = useContext(AuthContext)

    const deleteHandler = async () => {
        //console.log(props.id)
        try {
            await sendRequest(
                `http://localhost:5000/api/posts/${props.id}`,
                'DELETE'
            )
            props.onDelete(props.id)
        } catch (err) {
            console.log(err)
        }
    }
    return(
        <li>
            <div>
                <img src={props.image} alt={props.title}/>
            </div>
            <div>
                <h1>{props.title}</h1>
                <h3>{props.description}</h3>
            </div>
            <div>
                <h4>{props.creatorId}</h4>
            </div>
            <div>
                    {
                        auth.isLoggedIn &&
                        <Button onClick={deleteHandler} >Remove</Button>
                    }
           </div>
        </li>
    )
}

export default PostItem;