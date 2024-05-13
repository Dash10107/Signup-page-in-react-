import './App.scss';
import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup';
import SignIn from './components/Login';
import Home from './components/Home';
import axios from 'axios';
function App() {
  const ping = async()=>{
    const result = await axios.get("https://hashing-backend.onrender.com");
    console.log(result);
  }
  useEffect(()=>{ping()},[])

  return (
    <Router>
 

          <Routes>
            <Route exact path="/" element={<Signup />} />
            <Route exact path="/login" element={<SignIn />} />
            <Route exact path='/home' element={<Home/>}/>
          </Routes>

  </Router>
  );
}

export default App;
