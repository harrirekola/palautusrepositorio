import { useSelector, useDispatch } from 'react-redux'
import { votedAnecdote } from '../reducers/anecdoteReducer'
import { notify, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes}) => {
		const arrangedByVotes = [...anecdotes].sort((a, b) => (b.votes - a.votes))
		return arrangedByVotes
	})
  const keyword = useSelector(state => state.filter)
  const filtered = anecdotes.filter(item => item.content.includes(keyword))
  console.log(anecdotes)

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
          {filtered.map(anecdote =>
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