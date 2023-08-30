import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Profile({user}) {
    const navigate = useNavigate();
    // const [user, setUser] = useState({});
    const [message, setMessage] = useState("");
    // const {id} = useParams();


    // useEffect(()=>{
    //     const userProfile = async () => {
    //         try {
    //           const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    //             method:'GET',
    //             headers: {
    //               'Content-Type': 'application/json',
    //               'Authorization': `Bearer ${token}`
    //             },
    //           });
    //           const result = await response.json();
    //           console.log('Profile result',result);
    //           setUser(result);
    //         } catch (err) {
    //           console.log(err);
    //           setMessage(err.message)
    //         }
          
    //     }
    //     userProfile()
    // },[token])


    return(
        <div className = "Profile">Welcome back, {user.name}!</div>
    )

}