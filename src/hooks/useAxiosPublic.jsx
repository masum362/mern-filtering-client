import axios from 'axios'

export const axiosCommon = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const useAxiosPublic = () => {
  return axiosCommon;
}

export default useAxiosPublic