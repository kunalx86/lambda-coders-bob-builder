import Axios from 'axios'

export const axios = Axios.create({
  baseURL: 'http://localhost:8000/api',
  validateStatus: status => status < 300
})

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`

  return config
})
