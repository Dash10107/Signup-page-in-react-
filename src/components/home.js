// Home.jsx

import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [hashedPassword, setHashedPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');
      try {
        // Make a GET request to the protected route
        const response = await fetch('https://hashing-backend.onrender.com/users/protected', {
          method: 'GET',
          headers: {
            // Include the authentication token in the headers
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        // Parse the JSON response
        const data = await response.json();
        setUserData(data.userDetails);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Error fetching data');
      }
    };

    fetchProtectedData();
  }, []); // Make the request only once when the component mounts

  const handleShowHashedPassword = () => {
    setLoading(true);
    setTimeout(() => {
      setHashedPassword(userData.password);
      setLoading(false);
    }, 3000); // Simulating a loading time of 3 seconds
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!userData.name) {
    return <div className="loading">Loading...</div>;
  }



  return (
    <div className="home-container">
      <nav className="navbar">
        <ul>
          <li><a href="/" onClick={(e)=>{e.preventDefault(); navigate("/home")}}>Home</a></li>
          <li><a href='/' onClick={(e)=>{e.preventDefault(); navigate("/iframe")}}>Hash Generator</a></li>
        </ul>
      </nav>
      <header>
        <h1 className="welcome-heading">Welcome, {userData.name}!</h1>
        <p className="intro-message">Here, you can view your user details and use our hash generator tool.</p>
      </header>
      <section id="home" className="section">
        <h2>User Details</h2>
        <div className="user-details">
          <div className="detail">
            <label className='spacedLabel'>User Name:</label>
            <span>{userData.name}</span>
          </div>
          {hashedPassword && (
            <div className="detail">
              <label className='spacedLabel'>Hashed Password:</label>
              <span className="hashed-password"> &nbsp;&nbsp; {hashedPassword}</span>
            </div>
          )}
          {!hashedPassword && (
            <div className="detail">
              <button onClick={handleShowHashedPassword} disabled={loading}>
                {loading ? 'Loading...' : 'Show Hashed Password'}
              </button>
            </div>
          )}
        </div>
      </section>
      <br></br>
      <p>For More Info : <a href='https://en.wikipedia.org/wiki/Hash_function?wprov=sfla1'>https://en.wikipedia.org/wiki/Hash_function</a></p>
      <footer className="footer">
        <p>Project Title: Decoding hashing</p>
        <p>Project by: Param Jain</p>
        <p>School: Sharda Mandir High School</p>
        <p>Contact: <a href="mailto:paramjain777@gmail.com">paramjain777@gmail.com</a></p>
      </footer>
    </div>
  );
};

export default Home;
