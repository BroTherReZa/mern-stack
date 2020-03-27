import React from 'react'
import './UserPosts.css'
import PostList from '../components/PostList'
import {useParams} from 'react-router-dom'


const posts=[{
        id:'p1',
        title:'post 1',
        description:'post 1 description ... ',
        image:'../images/Backtrack_Br.jpg',
        creator:'u1'
    },{
        id:'p2',
        title:'post 2',
        description:'post 2 description ... ',
        image:'../images/Backtrack_Br2.jpg',
        creator:'u2'
    },{
        id:'p3',
        title:'post 3',
        description:'post 3 description ... ',
        image:'../images/Backtrack_Br.jpg',
        creator:'u2'
    }]
const UserPosts = () =>{
    const userId = useParams().userId
    const loadedPosts = posts.filter(post => post.creator === userId)
    return(
        
        <PostList items={loadedPosts}/>
    )
}

export default UserPosts;