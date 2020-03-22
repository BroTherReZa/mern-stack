import React from 'react';
import UsersList from '../components/UsersList';

const Users =() =>{
    const users =[{
        id:'u1',
        name:'marmar',
        image:'',
        posts: 4
    },{
        id:'u2',
        name:'reza',
        image:'',
        posts: 7
    }]
    return(
        <UsersList items={users}/>
    )
}
export default Users;