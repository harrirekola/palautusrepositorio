import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { notify, clear } from "./reducers/notificationReducer";
import { setUsers, logoutUser } from "./reducers/userReducer";
import { initializeBlogs, addBlogs, updateBlogs, deleteBlogs } from "./reducers/blogReducer";
import userService from './services/user'

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const sortLikes = [...blogs].sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(setUsers(userFromStorage))
    }
  }, [])

  const login = async (username, password) => {
    loginService.login({
      username, password,
    }).then(user => {
      dispatch(setUsers(user))
      userService.setUser(user)
      dispatch(notify(`${user.name} logged in!`))
      setTimeout(() => {
        dispatch(clear());
      }, 3500);
    }).catch(() => {
      dispatch(notify('wrong username/password'))
      setTimeout(() => {
        dispatch(clear());
      }, 3500);
    })
  }

  const logout = () => {
    dispatch(logoutUser())
    userService.clearUser()
    dispatch(notify('good bye!'))
    setTimeout(() => {
      dispatch(clear());
    }, 3500);
  }

  const updateBlog = async (id, blogObject) => {
    dispatch(updateBlogs(id, blogObject))
  };

  const deleteBlog = async (id, blogUser) => {
    dispatch(deleteBlogs(id, blogUser))
  };

  const addBlog = async blogObject => {
    dispatch(addBlogs(blogObject))
  };

  if (user === null) {
    return <>
      <Notification />
      <LoginForm onLogin={login} />
    </>
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        Logged in as {user.name}
        <button onClick={logout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {sortLikes.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          currentUser={user}
        />
      ))}
    </div>
  );
};

export default App;
