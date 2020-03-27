import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPost from './posts/pages/NewPost';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPosts from './posts/pages/UserPosts';
import Auth from './user/pages/Auth';

const App =()=>{
  return(
    <Router>
      <MainNavigation/>
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
        <Route path="/auth">
          <Auth/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    </Router>
  )
}
export default App;