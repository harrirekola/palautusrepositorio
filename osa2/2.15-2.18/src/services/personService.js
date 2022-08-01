import axios from "axios"
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, contact) => {
    return axios.put(`${baseUrl}/${id}`, contact)
}
const exports = { getAll, create, deletePerson, update }
export default exports