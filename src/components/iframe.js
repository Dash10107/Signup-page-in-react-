import React from 'react'
import "./Home.css"
import { useNavigate } from 'react-router-dom';
const Iframe = () => {
  const navigate = useNavigate();

  return (
    <div className='iframediv'>
      <nav className="navbar">
        <ul>
          <li><a href="/" onClick={(e)=>{e.preventDefault(); navigate("/home")}}>Home</a></li>
          <li><a href='/' onClick={(e)=>{e.preventDefault(); navigate("/iframe")}}>Hash Generator</a></li>
        </ul>
      </nav>
      {/* <section className="hash-generator"> */}
        {/* <h2 style={{textAlign:"center",padding:"4rem"}}>Hash Generator</h2> */}
        <div>
          <iframe
            title="Hashing"
            src="https://dash10107.github.io/Hashing-   "
            style={{ border: 'none', width: '100%', height: '50rem', overflow: 'hidden' }}
          />
        </div>
      {/* </section> */}
    </div>
  )
}

export default Iframe
