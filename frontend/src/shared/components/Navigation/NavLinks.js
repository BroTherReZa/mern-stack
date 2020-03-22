import React from 'react'
import './NavLinks.css'
import {NavLink} from 'react-router-dom'

const NavLinks = props =>{
    return(
        <div>
            <ul>
                <li>
                    <NavLink to="/">All Users</NavLink>
                </li>
                <li>
                    <NavLink to="/u1/posts">My Posts</NavLink>
                </li>
                <li>
                    <NavLink to="/posts/new">Create New Post </NavLink>
                </li>
                <li>
                    <NavLink to="/auth">Authenticate</NavLink>
                </li>
            </ul>
        </div>
    )
}
export default NavLinks;