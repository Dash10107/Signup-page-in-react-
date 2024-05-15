import './App.scss';
import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // You can also validate the token on the server-side if needed
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };
    checkAuthentication();
  },[]);

  return (
    <Router>
 

          <Routes>
            <Route exact path="/" element={<Signup />} />
            <Route exact path="/login" element={<SignIn />} />
                 {/* Protected route */}
        <Route
          exact
          path='/home'
          element={authenticated ? <Home /> : <Navigate to="/login" />}
        />
          </Routes>

  </Router>
  );
}

export default App;
