import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: {'authorization': token}
  }
  console.log(newObject)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const config = {
    headers: {'authorization': token}
  }
  console.log(newObject)
  const response = await axios.put(baseUrl + '/'+ newObject.id, newObject, config)
  return response.data
}

const remove = async (object) => {
  console.log('token', token)
  const config = {
    headers: {'authorization': token}
  }
  console.log('remove object', object)
  const response = await axios.delete(baseUrl + '/' + object.id, object, config)
  return response.data
}

export default { getAll, setToken, create, update, remove}