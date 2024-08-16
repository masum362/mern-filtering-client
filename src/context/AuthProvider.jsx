/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase/firebase.init"
import useAxiosPublic from "../hooks/useAxiosPublic"


export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic();

    const logOut = () => {
      setUser(null)
      setLoading(true)
      localStorage.removeItem('token')
      return signOut(auth)
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async currentUser => {
        setLoading(true)

        try {
          if(!currentUser ){
            localStorage.removeItem('token')
            setLoading(false)
          }
  
          const data = await axiosPublic.post('/login', {email: currentUser.email})
          
          setUser(data.user)
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      })

      return () => {
        return unsubscribe()
      }
    },[])

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        logOut
    }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider