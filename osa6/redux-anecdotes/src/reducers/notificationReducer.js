import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        notify(state, action) {
            console.log("action", action)
            const message = action.payload
            return message
        },
        resetNotification(state, action) {
            console.log("action", action)
            return null
        }
    }

})

export const { notify, resetNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(notify(message))
        setTimeout(() => {
            dispatch(resetNotification())
          }, time * 1000)
    }
}

export default notificationSlice.reducer