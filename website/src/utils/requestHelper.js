import axios from 'axios'

export const authenticatedRequest = async (url, method, data = {}) => {
  const token = localStorage.getItem('token')
  const auth = `Bearer ${token}`
  const headers = {
    Authorization: auth,
  }
  return axios.request({
    url,
    method,
    data,
    headers,
  })
}
