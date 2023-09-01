import React from 'react';
import { Link, useNavigate } from 'react-router-dom';



export default function Nav({token, setToken}) {
    const navigate = useNavigate()

    // console.log(token)
    return(
        <div className = "navbar">
            <Link to = '/'><span class="material-symbols-outlined">
              home
              </span>Home</Link>

            <Link to = '/Register'>Register</Link>

            <Link to = '/Login'>Login</Link>

            {token ? <Link to = '/Profile'> 
            <span class="material-symbols-outlined">
            person</span> Profile</Link> : null}
            
            <Link to = '/Cart'>
                <span class="material-symbols-outlined">
                  shopping_cart</span>Cart</Link>
            {token ? <button onClick={() => {
                setToken(null)
                localStorage.removeItem("token")
                localStorage.removeItem("loggedIn")
                navigate('/')
                }}>Log out</button> : null}

        </div>
    )

}
