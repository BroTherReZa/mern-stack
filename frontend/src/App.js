import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPost from './posts/pages/NewPost';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPosts from './posts/pages/UserPosts';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

const App =()=>{
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login = useCallback(()=>{
    setIsLoggedIn(true)
  },[])
  const logout = useCallback(()=>{
    setIsLoggedIn(false)
  },[])
let routes
if(isLoggedIn){
  routes = (
        <Switch>
            <Route path="/" exact>
              <Users/>
            </Route>
            <Route path="/:userId/posts">
              <UserPosts/>
            </Route>
            <Route path="/posts/new" exact>
              <NewPost/>
            </Route>
            <Redirect to="/"/>
        </Switch>
  )
}else {
  routes = (
    <Switch>
      <Route path="/" exact>
        <Users/>
      </Route>
      <Route path="/:userId/posts">
              <UserPosts/>
            </Route>
      <Route path="/auth">
        <Auth/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}

  return(
    <AuthContext.Provider
      value = {{
        isLoggedIn : isLoggedIn,
        login: login,
        logout: logout
      }}
    >
        <Router>
          <MainNavigation/>
          {routes}
        </Router>
    </AuthContext.Provider>
  )
}
export default App;