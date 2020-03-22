import React from 'react'
import './MainNavigation.css'
import MainHeader from './MainHeader'
import {Link} from 'react-router-dom'
import NavLinks from './NavLinks'

const MainNavigation = props =>{
    return(
        <MainHeader>
            <h1>
                <Link to="/"> your posts </Link>
            </h1>
            <nav>
                <NavLinks/>
            </nav>
        </MainHeader>
    )
}
export default MainNavigation;