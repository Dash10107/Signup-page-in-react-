import './App.scss';
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/signup";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  
  return (
    <Router>
 
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route exact path="/" element={<Signup />} />
           
          </Routes>
          </div>
          </div>
  </Router>
  );
}

export default App;
