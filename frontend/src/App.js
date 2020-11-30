import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPost from './posts/pages/NewPost';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPosts from './posts/pages/UserPosts';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

const App =()=>{
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)
  const login = useCallback((uid, token)=>{
    setToken(token)
    setUserId(uid)
  },[])
  const logout = useCallback(()=>{
    setToken(null)
    setUserId(null)
  },[])
let routes
if(token){
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
        <div className="center">
          <h1>خوش آمدید ... </h1>
        </div>
      </Route>
      <Route path="/users" exact>
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
        isLoggedIn : !!token,
        token: token,
        userId: userId,
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