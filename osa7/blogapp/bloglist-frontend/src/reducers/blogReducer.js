import { createSlice } from "@reduxjs/toolkit";
import { notify, clear } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        updateBlog(state, action) {
            return state.map(blog => {
                if (blog.id === action.payload.id) {
                    return {...blog, likes: blog.likes + 1}
                }
                return blog
            })
        },
        removeBlog(state, action) {
            return state.filter(blog =>
                blog.id === action.payload.id)
        }
    }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const addBlogs = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
        console.log("Added a new blog ", JSON.stringify(content));
        dispatch(notify(
        `a new blog ${content.title} by ${content.author} has been added`
        ));
        setTimeout(() => {
          dispatch(clear());
        }, 3500);
    }
}

export const updateBlogs = (id, blogObject) => {
    return async dispatch => {
        const updatedBlog = await blogService.updateLike(id, blogObject);
        dispatch(updateBlog(updatedBlog))
    }
}

export const deleteBlogs = (id, blogUser) => {
    return async dispatch => {
        const toBeRemoved = await blogService.removeBlog(id, blogUser)
        dispatch(removeBlog(toBeRemoved))
    }
}

export default blogSlice.reducer