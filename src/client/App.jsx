import { useEffect, useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import Nav from './components/Nav';
import Cart from './components/Cart';
import Admin from './components/Admin';
import ConfirmPage from './components/ConfirmPage'
import {Routes, Route} from 'react-router-dom';
import SingleProduct from './components/SingleProduct';

function App() {
const [token, setToken] =  useState('');

const [userInfo, setUserInfo] = useState({})

const [loggedIn, setLoggedIn] = useState(null)

  useEffect(() => {
      const token = localStorage.getItem("token");
      if(token){
        setToken(JSON.parse(localStorage.getItem("token")))
      }
      const loggedIn = localStorage.getItem("loggedIn");
      if(loggedIn){
        setLoggedIn("loggedIn", true)
      }
      const user = localStorage.getItem("user")
      if(user){
        setUserInfo(JSON.parse(localStorage.getItem("user")))
      }
  }, [])

  return (
    <>
    <Nav token={token} setToken={setToken}/>
    <Routes>
    <Route path="/Confirm" element={<ConfirmPage />}>Confirmed</Route>
    <Route path="/" element={<Home />}>Home</Route>
       <Route path="/Login" element={<Login setToken={setToken} userInfo={userInfo} setUserInfo={setUserInfo}/>}>Login</Route>
       <Route path="/Register" element={<Register setToken={setToken} />}>Register</Route>

       <Route path="/Profile" element={<Profile user={userInfo} />}>Profile</Route>
       <Route path="/Cart" element={<Cart userInfo={userInfo} setUserInfo={setUserInfo} token={token}/>}>Cart</Route>

       {/* <Route path="/Profile" element={ <Profile token={token}/> }>Profile</Route>
       <Route path="/Cart" element={<Cart/>}>Cart</Route> */}
       <Route path="/Admin" element={<Admin token={token}/>}>Admin</Route>
       <Route path="/:id" element={<SingleProduct userInfo = {userInfo} token={token}/>}>SingleProduct</Route>
       </Routes>
    </>
  );

}

export default App;
