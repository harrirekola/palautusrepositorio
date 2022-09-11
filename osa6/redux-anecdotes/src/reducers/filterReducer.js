import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterAnecdotes(state, action) {
            console.log('action', action)
            const keyword = action.payload
            console.log(keyword)
            console.log(state)
            return keyword
        }
    }
})

export const { filterAnecdotes} = filterSlice.actions
export default filterSlice.reducer