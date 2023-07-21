import axios from 'axios'

const ConnectionInstance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 20000
})

// const getCookieValue = (name: string) => {
//   const cookieValue = document.cookie
//     .split('; ')
//     .find((row) => row.startsWith(name + '='))
//     ?.split('=')[1]
//   return cookieValue ? decodeURIComponent(cookieValue) : null
// }

// const accessToken = getCookieValue('access_token')

ConnectionInstance.interceptors.request.use(
  async (config) => {
    // if (accessToken) {
    //   if (config) {
    //     config.headers.Authorization = accessToken
    //   }
    // }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

ConnectionInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response.status === 401) {
      window.location.replace('/login')
    }

    return Promise.reject(error)
  }
)

export default ConnectionInstance
