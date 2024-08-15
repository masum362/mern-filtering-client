import { Outlet } from "react-router-dom"
import Navbar from "./shared/navbar/Navbar"
import Footer from "./shared/footer/Footer"

function App() {

  return (
    <>
      <Navbar />
     <div className="mt-20">
     <Outlet />
     </div>
      <Footer />
    </>
  )
}

export default App
