import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const updateLike = async event => {
    event.preventDefault()
    const newBlog = {
      author: blog.author,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      id: blog.user.id
    }
    await blogService.updateLike(blog.id, newBlog)
  }
  return (
    showAll ? 
    <div style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={() => setShowAll(isShowAll => !isShowAll)}>hide</button></p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={updateLike}>like</button></p>
      <p>{blog.user.name}</p>
    </div>
    :
    <div style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={() => setShowAll(isShowAll => !isShowAll)}>view</button></p>
    </div>
  )
}

export default Blog