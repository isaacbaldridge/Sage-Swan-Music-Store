import React from 'react';
import { Link } from 'react-router-dom';



export default function Nav() {
    return(
        <div className = "navbar">
            <Link to = '/'>Home</Link>
            <Link to = '/Register'>Register</Link>
            <Link to = '/Login'>Login</Link>
            <Link to = '/Profile'>Profile</Link>
            <Link to = '/Home'>Cart</Link>

        </div>
    )

}