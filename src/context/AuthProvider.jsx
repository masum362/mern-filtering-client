/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { auth } from "../firebase/firebase.init"
import useAxiosPublic from "../hooks/useAxiosPublic"


export const AuthContext = createContext()
const AuthProvider = ({ children }) => {

  const gogleProvider = new GoogleAuthProvider();

  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const axiosPublic = useAxiosPublic();


  const RegisterUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const LoginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGogle = () => {
    return signInWithPopup(auth, gogleProvider)
  }

  const updateUser = (user, displayName, photoURL) => {
    setLoading(true)
    return updateProfile(user, {
      displayName, photoURL
    })
  }


  const logOut = () => {
    setUser(null)
    setLoading(true)
    localStorage.removeItem('access_token')
    return signOut(auth)
  }



  useEffect(() => {

    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log(currentUser)
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        const user = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid
        }
        await axiosPublic.post("/register", user);
        await axiosPublic.post('/login', userInfo)
          .then(res => {
            if (res.data.token) {
              console.log(res.data.user)
              localStorage.setItem('access-token', res.data.token);
              setUser(res.data.user);
              
              setLoading(false);
            }
          })
      } else {
        setLoading(false)
        localStorage.removeItem('access-token');
        console.log("user not found")
        setUser(null)
      }
    })
    return () => {
      unSubscribe();
    }
  }, [])
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    RegisterUser,
    LoginUser,
    updateUser,
    loginWithGogle,
    logOut
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider