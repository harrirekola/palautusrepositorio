import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BlogView = () => {
    const blogs = useSelector(state => state.blogs)
    const id = useParams().id
    const blog = blogs.find(n => n.id === id)

    return (
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.url}</p>
            <p>{blog.likes} likes</p>
            <p>added by {blog.user.name}</p>
        </div>
    )
}

export default BlogView