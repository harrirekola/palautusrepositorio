import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes}) => {
		const arrangedByVotes = [...anecdotes].sort((a, b) => (b.votes - a.votes))
		return arrangedByVotes
	})
  const keyword = useSelector(state => state.filter)
  const filtered = anecdotes.filter(item => item.content.includes(keyword))
  console.log(anecdotes)

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
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