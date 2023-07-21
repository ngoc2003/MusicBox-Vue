import axios from 'axios'

// Create an Axios instance with a base URL and other configurations
const ConnectionInstance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 20000
})

ConnectionInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    // If the error response indicates "expired" status, refresh the token and retry the original request
    if (error.response && error.response.data.status === 'expired') {
      ConnectionInstance.get('/refresh-token')
      // Retry the original request
      return ConnectionInstance(error.config)
    }
    return Promise.reject(error)
  }
)

export default ConnectionInstance
