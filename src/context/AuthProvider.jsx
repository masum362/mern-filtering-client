import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { commonGetUrl, commonPostUrl } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) ?? null)
  const [loading ,setLoading] = useState(true);

  const loginUser = async (data) => {
    return commonPostUrl("login", data) 
  }
  const registerUser = async (data) => {
    return commonPostUrl("register", data) 

  }


  useEffect(() => {
    // setLoading(true);
    commonGetUrl("get-user").then(res =>{
      setUser(res.data)
      setLoading(false);
    }).catch(err => console.log(err.message));
  }, [])

  const values = { user, setUser,loading ,loginUser,registerUser}


  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider