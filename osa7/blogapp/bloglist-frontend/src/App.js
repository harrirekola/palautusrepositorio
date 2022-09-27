import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from 'react-redux'
import { notify, clear } from "./reducers/notificationReducer";
import { initializeBlogs, addBlogs, updateBlogs, deleteBlogs } from "./reducers/blogReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const sortLikes = [...blogs].sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(notify("wrong username or password"))
      setTimeout(() => {
        dispatch(clear());
      }, 3500);
    }
  };

  const updateBlog = async (id, blogObject) => {
    dispatch(updateBlogs(id, blogObject))
  };

  const deleteBlog = async (id, blogUser) => {
    dispatch(deleteBlogs(id, blogUser))
  };

  const addBlog = async blogObject => {
    dispatch(addBlogs(blogObject))
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    console.log("logging out...");
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <div>
              <button id="login-button" type="submit">
                login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        Logged in as {user.name}
        <button onClick={handleLogout}>logout</button>
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
