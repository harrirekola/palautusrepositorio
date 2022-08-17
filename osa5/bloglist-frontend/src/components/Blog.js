import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const updateLike = () => {
    console.log('liked blog: ', blog.id)
    updateBlog(blog.id,
      {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
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