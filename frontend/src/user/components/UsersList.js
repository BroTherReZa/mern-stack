import React from 'react';
import './UsersList.css'
import UserItem from './UserItem';

const UsersList = props =>{
    if(props.items.length === 0){
        return(
            <div className="center">
                <h2>User not Found. </h2>
            </div>
        )
    }
    return(
        <div>
            <ul>
                {
                    props.items.map(user=>{
                        return <UserItem
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        image={user.image}
                        postCount={user.posts}
                        />
                    })
                }
            </ul>
        </div>
    )
}
export default UsersList;