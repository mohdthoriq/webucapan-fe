import axios from 'axios'
import { getCookie } from '@/lib/cookies'

const ACCESS_TOKEN =
  import.meta.env.VITE_ACCESS_TOKEN || 'thisIsJustRandomString'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Function to get auth token from cookie
function getAuthToken(): string | null {
  const tokenCookie = getCookie(ACCESS_TOKEN)
  if (tokenCookie && tokenCookie !== 'undefined') {
    try {
      return JSON.parse(tokenCookie)
    } catch {
      alert('cookie not found')
      return null
    }
  }
  return null
}

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
