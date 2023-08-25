import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register({setToken}) {
    const [name,setName] = useState ('');
    const [username,setUsername] = useState ('');
    const [password,setPassword] = useState ('');
    const [email,setEmail] = useState ('');
    const [address,setAddress] = useState ('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

async function handleSubmit(e) {
    e.preventDefault();

    // if(error){
    //     console.log('Did Not Send!')
    //     setName("");
    //       setUsername("");
    //       setEmail("");
    //       setPassword("");
    //       setAddress("");
    //     return
    // }

console.log(password)
    try {
    let response = await fetch ('http://localhost:3000/api/users/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
                name, username, password, email, address
        })
    })
    let result = await response.json()
    console.log('register result', result)
    setToken(result.token)
    navigate('../Login')}
    catch(error){console.log(error)
    }
}


    return(
        <div className = "register">
            <h2>Register</h2>
            <form className='form' onSubmit={handleSubmit}>

                <label>Name</label>
                <input value = {name} type='text'onChange={(e) => setName(e.target.value)}/> <br/>
                <label>Username</label>
                <input value = {username} type='text' required onChange={(e) => setUsername(e.target.value)}/> <br/>
                <label>Password</label>
                <input value = {password} type='password' required onChange={(e) => setPassword(e.target.value)}/> <br/>
                <label>Email</label>
                <input value = {email} type='email' required onChange={(e) => setEmail(e.target.value)}/> <br/>
                <label>Address</label>
                <input value = {address} type='text'onChange={(e) => setAddress(e.target.value)}/> <br/>
                <button>Register</button>
            </form>
        </div>
    )

}