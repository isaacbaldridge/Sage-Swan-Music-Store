import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import {Routes, Route} from 'react-router-dom';

function App() {
const [token, setToken] =  useState('');
  return (
    <> 
    <Routes>
    <Route path="/" element={<Home />}>Home</Route>
       <Route path="/Login" element={<Login setToken={setToken} />}>Login</Route>
       <Route path="/Register" element={<Register setToken={setToken} />}>Register</Route>
       <Route path="/Profile" element={<Profile token={token} />}>Profile</Route>
       </Routes>
    </>
  );

}

export default App;
