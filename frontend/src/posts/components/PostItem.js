import React from 'react'
import './PostItem.css'

const PostItem = props =>{
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
                    <button>Delete</button>
                </div>
        </li>
    )
}

export default PostItem;