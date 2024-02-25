import React, { useState } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Alert, Snackbar } from '@mui/material';

export default function Login() {
    const navigate = useNavigate();
    const [showPassword,setShowPassword1] = useState(false); 
    const [showPassword2,setShowPassword2] = useState(true);
      // Create state variables to store user input
  const [formData, setFormData] = useState({
   
    email: "",
    password: "",
  
  });
const {  email, password } = formData;

const [severity,setSeverity] = useState("error")
const [errors, setErrors] = useState({});
const [toastOpen, setToastOpen] = useState(false);


const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitted");
  console.log('form date',formData);
  
 
  if(email==="" ||  password === "" ){
   setSeverity("warning");
    setErrors({ error: "Please fill in all the details" });
    setToastOpen(true);
    return;
  }
  if (password.length < 8) {
    setSeverity("error");
    setErrors({ error: "Password must be at least 8 characters long" });
    setToastOpen(true);
    return;
  }
  


  try {
    // Send a POST request to the server
    const response = await axios.post(
      "https://hashing-backend.onrender.com/users/login",
      formData
    );
    console.log("Response", response)
   
    if (response.status === 200) {


      // If the registration is successful, you can handle the response here
      localStorage.setItem("token",response?.data?.token);
      navigate("/home");


    } else { console.log(response.status) }

  } catch (error) {
    // If there's an error, handle it here
    console.error("Login error", error);
    setErrors(error);
    setToastOpen(true);

  }
};

// Function to handle input changes
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    setToastOpen(false);
    return;
  }
}

return (
        <>
                      <div className="auth-wrapper">
        <div className="auth-inner">
    <form onSubmit={handleSubmit}>
    <h3 className=''>Login</h3>

    <div className="mb-3">
      <label>Email ID</label>
      <Input
        type="email"
        className="form-control"
        name="email"
        placeholder=""
         value={email}
        onChange={handleChange}
      />
    </div>
    <div className="mb-3">
      <label>Password</label>
      <Input 
         className="form-control"
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder='Atleast 8 Characters'
        value={password}
                onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={()=>{setShowPassword1(!showPassword)}}
             
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
     </div>
    
    <div className="d-grid">
      <button type="submit" className="btn btn-primary"
              style={{margin:"1rem",paddingLeft:"2rem",paddingRight:"2rem"}}
      >
        Login
      </button>
    </div>
  </form>
  <hr class="hr-text" data-content="Or" />

<p className='text-center'>Don't Have an Account? <a href='/' onClick={(e)=>{e.preventDefault(); navigate("/")}}>Register</a></p>
<Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            <ul>
              {Object.entries(errors).map(([key, value]) => (
                <li key={key}>
                  {value}
                </li>
              ))}
            </ul>
          </Alert>
        </Snackbar>
        </div>
        </div>
  </>
  )
}
