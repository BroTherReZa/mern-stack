import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';

const Users =() =>{
    const [loadedUsers, setLoadedUsers] = useState()
    useEffect(()=>{
        try {
            const sendRequest = async () => {
                const response = await fetch('http://localhost:5000/api/users')
                const responseData = await response.json()
                if(!response.ok){
                    throw new Error(responseData.message)
                }
                setLoadedUsers(responseData.userlist)
            }
            sendRequest()
        } catch (err) {
            console.log(err)
        }
    },[])
    
    return(
        <React.Fragment>
            {loadedUsers && <UsersList items={loadedUsers}/>}
        </React.Fragment>
    )
}
export default Users;