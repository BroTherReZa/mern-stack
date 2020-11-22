import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import UsersList from '../components/UsersList';

const Users = () =>{
    const [loadedUsers, setLoadedUsers] = useState()
    const { sendRequest } = useHttpClient()
    useEffect(()=>{
        const fetchUsers = async () => {
        try {
            const responseData = await sendRequest('http://localhost:5000/api/users')
            setLoadedUsers(responseData.userlist)
        } catch (err) {
            console.log(err)
        }
    }

    fetchUsers()
    },[sendRequest])
    
    return(
        <React.Fragment>
            {loadedUsers && <UsersList items={loadedUsers}/>}
        </React.Fragment>
    )
}
export default Users;