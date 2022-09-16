import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdotes(state, action) {
      return state.map(anecdote => {
        if (anecdote.id === action.payload.id) {
          return {...anecdote, votes: anecdote.votes + 1}
        }
        return anecdote
      })
    }
  }
})

export const { votedAnecdote, appendAnecdote, setAnecdotes, updateAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    console.log(anecdote)
    const updatedAnecdote = await anecdoteService.updateVote({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(updateAnecdotes(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer