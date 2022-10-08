import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries.js'

const Authors = props => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [ changeBorn ] = useMutation(EDIT_AUTHOR)

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 500
  })
  
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const submit = async event => {
    event.preventDefault()
    console.log(name)
    console.log(year)

    changeBorn({ variables: { name: name, born: Number(year) } })

    setName('')
    setYear('')
  }

  const handleChange = event => {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <label>
            <select onChange={handleChange}>
              {result.data.allAuthors.map(a => (
                <option key={a.name} value={a.name}>{a.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          born
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit' value='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
