import { NavLink } from "react-router-dom";
export default function Navbar() {
    const userLogin = localStorage.getItem("token")
    const handleLogout = ()=>{
        localStorage.removeItem("token")
        window.location.reload()
        navigator("/login")

    }
    return (
        <div className="bg-lime-950 text-white flex justify-around items-center p-5 ">
            <NavLink to={"/"}><h1 className="text-3xl font-bold ">AuthDB</h1></NavLink>
            {!userLogin ? <ul className="*:mx-3 *:border-2 *:p-2 *:rounded-md *:border-white *:font-bold ">
                <NavLink to={"/login"} className={"[&.active]:border-red-500"}>Login</NavLink>
                <NavLink to={"/register"} className={"[&.active]:border-red-500"}>Register</NavLink>
            </ul> :
                <ul className="*:mx-3 *:border-2 *:p-2 *:rounded-md  *:font-bold ">
                    <NavLink to={"/account"} className={"[&.active]:border-red-500"}>Account</NavLink>
                    <NavLink to={"/login"} onClick={handleLogout} className={"hover:border-red-500"}>Logout</NavLink>
                </ul>
            }
        </div>
    )
}
