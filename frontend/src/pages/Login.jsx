
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        fetchUsers()
    }, [])
    const fetchUsers = () => {
        axios.get("http://localhost:5000/auth/register")
            .then(() => {
            }).catch((err) => {
                console.log(err);
            });
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth/login",{email,password})
            console.log(response.data);
            const token = response.data.token
            fetchUsers();
            navigate("/account")
            window.location.reload()
            localStorage.setItem("token",token)
        } catch ({error, response}) {
            console.log(error);
            setMessage(response.data.message)

        }
    }
    return (
        <div className="w-full h-[90dvh] flex  justify-center items-center">
            <div className="shadow-2xl shadow-lime-950 flex flex-col rounded-xl w-[320px]">
                <h1 className="text-xl uppercase text-center m-5">Login</h1>
                <form onSubmit={handleLogin} className="flex flex-col h-[300px] justify-around p-5 ">
                    <label htmlFor="email" className="flex justify-between w-full" ><span>Email:</span>
                        <input type="email" name="email" id="email" placeholder="Email:" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="outline-none border-2 border-lime-900 px-1 rounded-md"
                        />
                    </label>
                    <label htmlFor="password" className="flex justify-between w-full" ><span>Password:</span>
                        <input type="password" autoComplete="" name="password" id="password" placeholder="Password:" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="outline-none border-2 border-lime-900 px-1 rounded-md"
                        />
                    </label>
                    <div className="w-full text-center ">
                        <button type="submit" className="bg-lime-900 text-white px-3 py-1 rounded-md hover:bg-lime-700 ">Login</button>
                    </div>
                    {message && <p className="text-red-600 text-center"> {message}</p>}
                    <p className="text-center">Already an account ? <NavLink to={"/register"} className="text-red-700 cursor-pointer hover:underline">Register</NavLink></p>
                </form>
            </div>
        </div>
    )
}
