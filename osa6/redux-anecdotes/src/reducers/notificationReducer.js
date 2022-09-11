import { createSlice } from '@reduxjs/toolkit'

const initialState = "TESTING!!!"

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        notify(state, action) {
            console.log("action", action)
            const message = action.payload
            state.push(message)
        }
    }

})

export const { notify } = notificationSlice.actions
export default notificationSlice.reducer