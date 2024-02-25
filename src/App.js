import './App.scss';
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/signup";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/login';
import Home from './components/home';
import Iframe from './components/iframe';
function App() {
  
  return (
    <Router>
 

          <Routes>
            <Route exact path="/" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/iframe" element={<Iframe/>}/>
          </Routes>

  </Router>
  );
}

export default App;
