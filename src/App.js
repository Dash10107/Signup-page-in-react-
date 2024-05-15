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
    const result = await axios.get(process.env.REACT_APP_API);
    console.log(result);
  }
  useEffect(()=>{ping()},[])

  const [authenticated, setAuthenticated] = useState(false);
  const checkAuthentication = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      // You can also validate the token on the server-side if needed
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  };

  useEffect(() => {

    checkAuthentication();
    
  },[]);

  return (
    <Router>
 

          <Routes>
          <Route
          exact
          path='/'
          element={!authenticated ? <Signup/> : <Navigate to="/home" />}
        />
            <Route
          exact
          path='/login'
          element={!authenticated ? <SignIn checkAuthentication={checkAuthentication} /> : <Navigate to="/home"  />}
        />
                 {/* Protected route */}
        <Route
          exact
          path='/home'
          element={authenticated ? <Home checkAuthentication={checkAuthentication} /> : <Navigate to="/login"  />}
        />
          </Routes>

  </Router>
  );
}

export default App;
