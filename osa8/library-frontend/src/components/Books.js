import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS, FILTER_BOOKS } from "../queries"

const Books = props => {
  const [genre, setKeyword] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  const results = useQuery(FILTER_BOOKS, {
    variables: { genre },
    pollInterval: 1000
  })

  if (!props.show) {
    return null
  }

  if (result.loading || results.loading) {
    return <div>loading...</div>
  }

  const genres = []
  result.data.allBooks.map(book => (
    book.genres.map(genre => (
      genres.push(genre)
    ))
  ))
  const uniqGenres = [...new Set(genres)]

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>author</th>
            <th>published</th>
          </tr>
          {results.data.allBooks.map((a) => (
            <tr key={a.author.name}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqGenres.map(genre => (
        <button onClick={() => setKeyword(genre)}key={genre}>{genre}</button>
      ))}
      <button onClick={() => setKeyword(null)}>all genres</button>
    </div>
  )
}

export default Books
