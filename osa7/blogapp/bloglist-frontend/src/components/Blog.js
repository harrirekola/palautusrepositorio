import React, { useEffect, useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const [showAll, setShowAll] = useState(false);
  const [visibilityState, setVisibilityState] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    if (blog.user.username === currentUser.username) {
      setVisibilityState(true);
    }
  });

  const updateLike = () => {
    console.log("liked blog: ", blog.id);
    updateBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    });
  };

  const removeBlog = () => {
    console.log(blog);
    deleteBlog(blog.id, blog.user);
  };

  return showAll ? (
    <div id="blog" style={blogStyle}>
      <p>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setShowAll((isShowAll) => !isShowAll)}>
          hide
        </button>
      </p>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}{" "}
        <button id="like-button" onClick={updateLike}>
          like
        </button>
      </p>
      <p>{blog.user.name}</p>
      <button
        id="remove-button"
        onClick={removeBlog}
        style={{ display: visibilityState ? "block" : "none" }}
      >
        remove
      </button>
    </div>
  ) : (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}{" "}
        <button
          id="view-button"
          onClick={() => setShowAll((isShowAll) => !isShowAll)}
        >
          view
        </button>
      </p>
    </div>
  );
};

export default Blog;
