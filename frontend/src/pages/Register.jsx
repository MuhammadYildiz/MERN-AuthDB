import { useEffect, useState } from "react"
import { NavLink, useNavigate} from "react-router-dom"
import axios from "axios"
export default function Register() {
    const navigate = useNavigate()
    /* const [users, setUsers] = useState([]) */
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    useEffect(() => {
        fetchUsers()
    }, [])
    const fetchUsers = () =>{
        axios.get("http://localhost:5000/auth/register")
        .then(() => {
        }).catch((err) => {
            console.log(err);
        });
    }
    const handleRegister =  (e) =>{
        e.preventDefault();
        axios.post("http://localhost:5000/auth/register",{userName, email,password})
        .then((response) => {
            fetchUsers();
            setMessage(response.data.message)
            navigate("/login")
        }).catch((err) => {
            console.error(err)
        });
    }
    return (
        <div className="w-full h-[90dvh] flex  justify-center items-center">
            <div className="shadow-2xl shadow-lime-950 flex flex-col rounded-xl w-[320px] ">
                <h1 className="text-xl uppercase text-center m-5">Register</h1>
                <form onSubmit={handleRegister} className="flex flex-col h-[300px] justify-around p-5 ">
                    <label htmlFor="userName" className="flex justify-between w-full" ><span>User Name:</span>
                        <input type="text" name="userName" id="userName" placeholder="User Name:" value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="outline-none border-2 border-lime-900 px-1 rounded-md"
                        />
                    </label>
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
                        <button type="submit" className="bg-lime-900 text-white px-3 py-1 rounded-md hover:bg-lime-700 ">Register</button>
                    </div>
                    {message && <p className="text-red-600 text-center"> {message}</p>}
                    <p className="text-center">Already an account ? <NavLink to={"/login"} className="text-red-700 cursor-pointer hover:underline">Login</NavLink></p>
                </form>
            </div>
        </div>
    )
}
