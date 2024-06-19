import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:8081/',
  baseURL: 'http://18.229.226.244:8080/',
})

export { api }
