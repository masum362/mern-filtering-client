import axios from 'axios'

export const axiosCommon = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const useAuthSecure = () => {
  return axiosCommon;
}

export default useAuthSecure