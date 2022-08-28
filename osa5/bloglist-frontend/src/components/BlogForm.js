import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
                title:
          <input
            id='title'
            type='text'
            name='Title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='placeholder title'
          />
        </div>
        <div>
                author:
          <input
            id='author'
            type='text'
            name='Author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='placeholder author'
          />
        </div>
        <div>
                url:
          <input
            id='url'
            type='text'
            name='Url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='placeholder url'
          />
        </div>
        <button id='submit-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm