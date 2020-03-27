import React, { useContext } from 'react'
import './NavLinks.css'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'

const NavLinks = props =>{
    const auth = useContext(AuthContext)
    return(
        <div>
            <ul>
                <li>
                    <NavLink to="/">All Users</NavLink>
                </li>
                {   
                    auth.isLoggedIn && (
                        <li>
                            <NavLink to="/u1/posts">My Posts</NavLink>
                        </li>
                    )
                }
                                {   
                    auth.isLoggedIn && (
                        <li>
                            <NavLink to="/posts/new">Create New Post </NavLink>
                        </li>
                    )
                }
                {
                    !auth.isLoggedIn && (
                        <li>
                            <NavLink to="/auth">Authenticate</NavLink>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
export default NavLinks;