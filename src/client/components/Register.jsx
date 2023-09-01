import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register({setToken}) {
    const [name,setName] = useState ('');
    const [username,setUsername] = useState ('');
    const [password,setPassword] = useState ('');
    const [email,setEmail] = useState ('');
    const [address,setAddress] = useState ('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

async function handleSubmit(e) {
    e.preventDefault();


//console.log(password)
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
    if(result.token){
        navigate('/Login') 
      }
      if(!response.ok) {
        throw(result)
      }
    setSuccessMessage(result.message)
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setAddress("");

    
    }
    catch(error){console.log(error)
        setError(error.message);
            console.log('Did Not Send!')
    }
}


    return(
        <div className = "register">
            <h2>Register</h2>
            {error && <p>{error}</p>}
            <form className='form' onSubmit={handleSubmit}>

                <label>Name</label><br/>
                <input value = {name} type='text'onChange={(e) => setName(e.target.value)}/> <br/>
                <label>Username</label><br/>
                <input value = {username} type='text' required onChange={(e) => setUsername(e.target.value)}/> <br/>
                <label>Password</label><br/>
                <input value = {password} type='password' required onChange={(e) => setPassword(e.target.value)}/> <br/>
                <label>Email</label><br/>
                <input value = {email} type='email' required onChange={(e) => setEmail(e.target.value)}/> <br/>
                <label>Address</label><br/>
                <input value = {address} type='text'onChange={(e) => setAddress(e.target.value)}/> <br/>
                <button>Register</button><br/>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    )

}