import React from 'react';
import './UserItem.css'
import { Link } from 'react-router-dom'

const UserItem = props =>{
    return(
        <li>
            <Link to={`/${props.id}/posts`}>
                <div className="userAvatar">
                    <img src={`http://localhost:5000/${props.image}`} alt={props.name}/>
                </div>
                <div className="userName">
                    <h2>{props.name}</h2>
                </div>
                <div className="userInfo">
                    <p> شناسه کاربر  : <b> {props.id} </b></p>
                    <p> تعداد پست ها : <b> {props.postCount} </b></p>
                </div>
            </Link>
        </li>
    )
}
export default UserItem;