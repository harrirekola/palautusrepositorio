import { useSelector, useDispatch } from 'react-redux'
import { votedAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes}) => {
		const arrangedByVotes = [...anecdotes].sort((a, b) => (a.votes > b.votes) ? -1 : 1)
		return arrangedByVotes
	})
  console.log(anecdotes)
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
                <button onClick={() => dispatch(votedAnecdote(anecdote.id))}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList