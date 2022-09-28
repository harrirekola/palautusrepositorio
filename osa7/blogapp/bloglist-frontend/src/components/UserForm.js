import React from "react"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

const UserForm = () => {
    const users = useSelector(state => state.users)

    return (
        <div>
        <h2>Users</h2>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>blogs</th>
                </tr>
            </thead>
            <tbody>
            {users.map(user => {
                return (
                <tr key={user.id}>
                    <td>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </td>
                    <td>{user.blogs.length}</td>
                </tr>
            )})}
            </tbody>
        </table>
        </div>
    )
}

export default UserForm