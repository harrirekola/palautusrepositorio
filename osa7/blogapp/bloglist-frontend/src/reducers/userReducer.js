import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
        logoutUser(state, action) {
            return null
        }
    }
})

export const  { setUsers, logoutUser } = userSlice.actions

export const setTokens = (user) => {
    return async dispatch => {
        blogService.setToken(user.token)
    }
}

export default userSlice.reducer