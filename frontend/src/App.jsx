import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Account from "./pages/Account"
import Navbar from "./components/Navbar"
function App() {
const userLogin = localStorage.getItem("token")
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
            <Route path="/" element = {userLogin && <Home/>} />
            <Route path="/login" element = {<Login/>} />
            <Route path="/register" element = {<Register/>} />
            <Route path="/account" element = { userLogin &&<Account/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
