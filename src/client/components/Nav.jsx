import React from 'react';
import { Link } from 'react-router-dom';



export default function Nav({token}) {
    console.log(token)
    return(
        <div className = "navbar">
            <Link to = '/'>Home</Link>
            <Link to = '/Register'>Register</Link>
            <Link to = '/Login'>Login</Link>
            {token ? <Link to = '/Profile'>Profile</Link> : null}
            <Link to = '/Cart'>Cart</Link>
            {token ? <Link to = '/Logout'>Log Out</Link> : null}

        </div>
    )

}