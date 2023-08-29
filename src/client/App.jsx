import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import Nav from './components/Nav';
import Cart from './components/Cart';
import {Routes, Route} from 'react-router-dom';
import SingleProduct from './components/SingleProduct';

function App() {
const [token, setToken] =  useState('');
  return (
    <> 
    <Nav token={token}/>
    <Routes>
    <Route path="/" element={<Home />}>Home</Route>
       <Route path="/Login" element={<Login setToken={setToken} />}>Login</Route>
       <Route path="/Register" element={<Register setToken={setToken} />}>Register</Route>
       <Route path="/Profile" element={<Profile token={token} />}>Profile</Route>
       <Route path="/Cart" element={<Cart/>}>Cart</Route>
       <Route path="/:id" element={<SingleProduct/>}>SingleProduct</Route>
       </Routes>
    </>
  );

}

export default App;
