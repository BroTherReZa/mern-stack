import React, { useContext } from 'react'
import './MainNavigation.css'
import MainHeader from './MainHeader'
import {Link, NavLink} from 'react-router-dom'
import NavLinks from './NavLinks'
import { AuthContext } from '../../context/auth-context'

const MainNavigation = props =>{
    const auth = useContext(AuthContext)
    return(
        <MainHeader>
            <Link to="/">
                <div className="logo">
                    <img src="../images/BroTher.jpg" alt="Br"/>
                </div> 
            </Link>
            <nav>
                <NavLinks/>
            </nav>
            <div>
                {!auth.isLoggedIn && (<NavLink to="/auth">ورود و ثبت نام</NavLink>)}
                {auth.isLoggedIn && (<button onClick={auth.logout}>خروج</button>)}
            </div>
        </MainHeader>
    )
}
export default MainNavigation;