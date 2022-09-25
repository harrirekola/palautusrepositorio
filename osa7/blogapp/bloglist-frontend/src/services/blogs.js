import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updateLike = async (id, blogObject) => {
  console.log(blogObject);
  const request = await axios.put(`/api/blogs/${id}`, blogObject);
  const response = request;
  return response.data;
};

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`/api/blogs/${id}`, config);
  return response.data;
};

export default { getAll, create, setToken, updateLike, removeBlog };
