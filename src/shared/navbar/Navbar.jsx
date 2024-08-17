import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {
  const { user,logOut } = useAuth();
  console.log(user)

  const handleLogOut = () => {
    logOut().then(res => {
      console.log('user logged out');
    })

  }

  return (
    <div>
      <div className="navbar bg-base-100 w-full fixed top-0 left-0 border-b border-gray-300 md:py-4 md:px-8 z-[999] ">
        <div className=" navbar-start ">
          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><NavLink className={({ isActive }) => `${isActive && 'text-themePrimary'} hover:text-themePrimary capitalize active:text-themeSecondary text-black `} to={"/"}>home</NavLink></li>
              <li><NavLink className={({ isActive }) => `${isActive && 'text-themePrimary'} hover:text-themePrimary capitalize active:text-themeSecondary `} to={"#products"}>products</NavLink></li>

            </ul>
          </div>
          <Link to={"/"}>The Find</Link>

        </div>
        <div className=" navbar-center hidden md:flex">
          <ul className="flex items-center justify-center gap-8 px-1 text-lg font-medium">
            <li><NavLink className={({ isActive }) => `${isActive && 'text-themePrimary'} hover:text-themePrimary capitalize active:text-themeSecondary `} to={"/"}>home</NavLink></li>
            <li><NavLink className={({ isActive }) => `${isActive && 'text-themePrimary'} hover:text-themePrimary capitalize active:text-themeSecondary `} to={"#products"}>products</NavLink></li>

          </ul>

        </div>
        <div className='navbar-end text-lg font-semibold gap-4 '>
          {
            user ? <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="User profile picture" src={user?.photoURL} />
                </div>
              </div>

              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  bg-base-100 rounded-box w-52  text-lg ">
                <h1 className='text-2xl font-bold text-center m-4 text-themePrimary'>{user?.displayName}</h1>
                <li><button onClick={handleLogOut} className='hover:text-themePrimary capitalize active:text-themeSecondary hover:bg-themeSecondary text-black'>Logout</button></li>
              </ul>

            </div> : <>

              <Link to={"/login"}><button className={"hover:text-themePrimary capitalize active:text-themeSecondary"} >Login</button></Link>
              <Link to={"/register"}><button className={"hover:text-themePrimary capitalize active:text-themeSecondary"} >Register</button></Link>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar