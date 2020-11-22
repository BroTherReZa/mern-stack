import React, { useEffect, useState } from 'react'
import './UserPosts.css'
import PostList from '../components/PostList'
import {useParams} from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'

    
const UserPosts = () =>{
    
    const [loadedPosts,setLoadedPosts] = useState()
    const uid = useParams().userId
    const { sendRequest } = useHttpClient()

    useEffect(()=>{
        const fetchPosts = async () =>{
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/posts/user/${uid}`)
                    setLoadedPosts(responseData.postsList)
            } catch (err) {
                console.log(err)
            }
        }
        fetchPosts()
    },[sendRequest, uid])
    
    const postDeletedHandler = (deletedPostId) =>{
        setLoadedPosts(prevPosts => {
            prevPosts.filter(post => post.id !== deletedPostId)
        })
    }

    return(
        <React.Fragment>
            {loadedPosts && <PostList items={loadedPosts} 
            onDeletedPost={postDeletedHandler}
            />}
        </React.Fragment>
    )
    /*
    const userId = useParams().userId
    const loadedPosts = posts.filter(post => post.creator === userId)
    return(
        <PostList items={loadedPosts}/>
    )
    */
}

export default UserPosts;