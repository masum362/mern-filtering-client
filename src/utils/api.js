import axios from "axios";

const base_url = import.meta.env.VITE_BACKEND_URL;
const token = JSON.parse(localStorage.getItem("token")) ?? "";
console.log(token);

const commonGetUrl = async (url, data) => {
  try {
    const response = await axios.get(`${base_url}/${url}`,{
        withCredentials:true,
        headers:{
            Authorization: `Bearer ${token ? token : ""}`,
        }
    });
    return response;
  } catch (error) {
    return error;
  }
};
const commonPostUrl = async (url, data) => {
  try {
    const response = await axios.post(`${base_url}/${url}`, data, {
      withCredentials: true,
     
    });
    return response;
  } catch (error) {
    return error;
  }
};

export { commonGetUrl, commonPostUrl };
