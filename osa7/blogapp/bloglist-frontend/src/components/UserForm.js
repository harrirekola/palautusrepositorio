import React from "react"
import { useSelector } from "react-redux"

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
                    <td>{user.name}</td>
                    <td>{user.blogs.length}</td>
                </tr>
            )})}
            </tbody>
        </table>
        </div>
    )
}

export default UserForm