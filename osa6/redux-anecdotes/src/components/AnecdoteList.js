import { useSelector, useDispatch } from 'react-redux'
import { votedAnecdote } from '../reducers/anecdoteReducer'
import { notify, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes}) => {
		const arrangedByVotes = [...anecdotes].sort((a, b) => (a.votes > b.votes) ? -1 : 1)
		return arrangedByVotes
	})

  const vote = anecdote => {
    dispatch(votedAnecdote(anecdote.id))
    dispatch(notify(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  const dispatch = useDispatch()
    return (
        <div>
          {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList