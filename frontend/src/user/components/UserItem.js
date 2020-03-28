import React from 'react';
import './UserItem.css'
import { Link } from 'react-router-dom'

const UserItem = props =>{
    return(
        <li>
            <Link to={`/${props.id}/posts`}>
                <div className="user-avatar">
                    <img src={props.image} alt={props.name}/>
                </div>
                <div>
                    <p> شناسه : <span> {props.id} </span></p>
                </div>
                <div>
                    <h2>{props.name}</h2>
                </div>
                <div>
                <p> تعداد پست : <span> {props.postCount} </span></p>
                </div>
            </Link>
        </li>
    )
}
export default UserItem;