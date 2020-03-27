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
                    <NavLink to="/">فهرست کاربران</NavLink>
                </li>
                {   
                    auth.isLoggedIn && (
                        <li>
                            <NavLink to="/u1/posts">پست های من</NavLink>
                        </li>
                    )
                }
                                {   
                    auth.isLoggedIn && (
                        <li>
                            <NavLink to="/posts/new">افزودن پست جدید</NavLink>
                        </li>
                    )
                }
                {
                    !auth.isLoggedIn && (
                        <li>
                            <NavLink to="/auth">ورود و ثبت نام</NavLink>
                        </li>
                    )
                }
                {auth.isLoggedIn && (
                    <li>
                        <button
                            onClick={auth.logout}
                        >
                            خروج
                        </button>
                    </li>
                )}
            </ul>
        </div>
    )
}
export default NavLinks;