import axios from 'axios'
import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})
const useAxiosSecure = () => {
  // const { logOut } = useAuth()
  // const navigate = useNavigate()
  

    axiosSecure.interceptors.request.use(config => {
      const token = localStorage.getItem('access-token')
      // console.log('request stopped by interceptors', token)
      config.headers.authorization = `Bearer ${token}`;
      return config;
    }, err => {
      return Promise.reject(err);
    })

    axiosSecure.interceptors.response.use(
      res => {
        return res
      },
      async error => {
        console.log('error tracked in the interceptor', error.response)
        // if (error.response.status === 401 || error.response.status === 403) {
        //   // await logOut()
        //   // navigate('/login')
        // }
        return Promise.reject(error)
      }
    )

  return axiosSecure
}

export default useAxiosSecure