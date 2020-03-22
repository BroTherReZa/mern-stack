import React from 'react'
import './PostList.css'
import PostItem from './PostItem'

const PostList = props =>{
    if(props.items.length === 0){
        return(
            <div className="center">
                <h2>No Post Found. </h2>
            </div>
        )
    }
    return(
        <div>
            <ul>
                {
                    props.items.map(post =>{
                        return(<PostItem
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        image={post.image}
                        description={post.description}
                        creatorId={post.creator}
                        />)
                    })
                }
            </ul>
        </div>
    )
}

export default PostList;