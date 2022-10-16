import { FILTER_BOOKS, ME } from "../queries"
import { useQuery } from "@apollo/client"

const Recommendation = props => {

    const genre = 'testing'
    const fgenre = useQuery(ME)
    console.log(fgenre.data)

    const results = useQuery(FILTER_BOOKS, {
        variables: { genre },
        pollInterval: 1000
      })

    console.log(results.data)

    if (!props.show) {
        return null
      }

    return (
        <div>
            <h2>recommendations</h2>
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
        </div>
    )
}

export default Recommendation