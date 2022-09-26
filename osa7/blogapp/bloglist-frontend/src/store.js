import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
    reducer: {
        notifications: notificationReducer,
        blogs: blogReducer,
    },
})

export default store