import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:8080/',
  baseURL: 'https://2771-179-127-134-28.ngrok.io',
})

export { api }
