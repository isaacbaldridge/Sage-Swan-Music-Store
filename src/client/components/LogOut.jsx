import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function LogOut() {
    const navigate = useNavigate()
    useEffect(() => {

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("loggedIn")
        navigate("/")
    }
logout()}, []);

    return(<>
    {console.log("logged out")}
    </>
 
    )
}