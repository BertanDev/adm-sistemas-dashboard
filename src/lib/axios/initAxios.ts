import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:8080',
  baseURL: 'http://18.230.60.191:8080',
})

export { api }
