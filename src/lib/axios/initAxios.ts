import axios from 'axios'

const api = axios.create({
  baseURL: 'https://adm-dashboard-api.onrender.com',
  // baseURL: 'http://localhost:8080/',
  // baseURL: 'https://28ac-179-127-134-28.ngrok.io',
})

export { api }
