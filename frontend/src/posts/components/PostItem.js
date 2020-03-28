import React, { useContext } from 'react'
import './PostItem.css'
import Button from '../../shared/components/FormElements/Button'
import { AuthContext } from '../../shared/context/auth-context'

const PostItem = props =>{
    const auth = useContext(AuthContext)
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
                        <Button>Remove</Button>
                    }
           </div>
        </li>
    )
}

export default PostItem;