import axios, { type AxiosError } from 'axios'
import { getCookie } from '@/lib/cookies'

const ACCESS_TOKEN =
  import.meta.env.VITE_ACCESS_TOKEN || 'thisIsJustRandomString'
const BASE_URL =
  import.meta.env.VITE_API_URL_NODE_ENVIRONMENT === 'DEVELOPMENT'
    ? import.meta.env.VITE_API_URL_DEVELOPMENT
    : import.meta.env.VITE_API_URL_PRODUCTION

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient