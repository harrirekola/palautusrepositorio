import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const blogFormRef = useRef();

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll();
    const sortLikes = [...blogs].sort((a, b) => b.likes - a.likes);
    setBlogs(sortLikes);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3500);
    }
  };

  const updateBlog = async (id, blogObject) => {
    try {
      await blogService.updateLike(id, blogObject);
      getAllBlogs();
    } catch (exception) {
      console.log(exception);
    }
  };

  const deleteBlog = async (id, blogUser) => {
    try {
      await blogService.removeBlog(id, blogUser);
      getAllBlogs();
    } catch (exception) {
      console.log(exception);
    }
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const newBlog = await blogService.create(blogObject);
      console.log("Added a new blog ", JSON.stringify(newBlog));
      setErrorMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} has been added`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 3500);
      getAllBlogs();
      setBlogs(blogs.concat(newBlog));
    } catch (exception) {
      console.log(exception);
    }
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
        <Notification message={errorMessage} />
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
      <Notification message={errorMessage} />
      <p>
        Logged in as {user.name}
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
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
