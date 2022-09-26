import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notify(state, action) {
            console.log(action)
            const message = action.payload
            return message
        },
        clear(state, action) {
            console.log(action)
            return null
        }
    }
})

export const { notify, clear } = notificationSlice.actions
export default notificationSlice.reducer