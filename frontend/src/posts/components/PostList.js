import React from 'react'
import './PostList.css'
import PostItem from './PostItem'

const PostList = props =>{
    if(props.items.length === 0){
        return(
            <div className="center">
                <h2>هیج پستی پیدا نشد.</h2>
            </div>
        )
    }
    return(
        <div className="center">
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