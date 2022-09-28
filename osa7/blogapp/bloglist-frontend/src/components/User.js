import React from "react";
import {
    useParams
  } from "react-router-dom"
import { useSelector } from "react-redux";

const User = () => {
    const id = useParams().id
    const users = useSelector(state => state.users)
    const user = users.find(n => n.id === id)
    console.log(user)

    return (
        <div>
            <h2>{user.name}</h2>
            <b>added blogs</b>
            <div>
                {user.blogs.map(blog => {
                    return (
                        <li key={blog.id}>{blog.title}</li>
                    )
                })}
            </div>
        </div>
    )
}

export default User