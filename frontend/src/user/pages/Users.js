import React from 'react';
import UsersList from '../components/UsersList';

const Users =() =>{
    const users =[{
        id:'u1',
        name:'مریم',
        image:'../images/MarMar.jpeg',
        posts: 4
    },{
        id:'u2',
        name:'رضا',
        image:'../images/BroTher.jpg',
        posts: 7
    }]
    return(
        <UsersList items={users}/>
    )
}
export default Users;