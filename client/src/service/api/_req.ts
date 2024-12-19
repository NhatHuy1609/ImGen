import axios from 'axios'
import { Clerk } from '@clerk/clerk-js/headless'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_GATEWAY
})

instance.interceptors.request.use(
  async (config) => {
    const clerk = new Clerk(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!)
    await clerk.load()

    const token = await window.Clerk?.session?.getToken()

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    
    return config
  }, 
  (error) => {
    return Promise.reject(error)  
  }
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // const originalRequest = error.config;
    
    return Promise.reject(error)
  }
)

export const req = instance
export const httpGet = req.get
export const httpPost = req.post
export const httpPut = req.put
export const httpDel = req.delete
export const httpPatch = req.patch