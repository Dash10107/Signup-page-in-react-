import React, { useState } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate(); 
    const [values, setValues] = useState({
        password: "",
        showPassword: false,
      });
      
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
      
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      
      const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    return (
        <>
    <form>
    <h3 className=''>Sign Up</h3>
    <div className="mb-3">
      <label>Full Name</label>
      <Input
        type="text"
        className="form-control"
        placeholder=""
      />
    </div>
    <div className="mb-3">
      <label>Email ID</label>
      <Input
        type="email"
        className="form-control"
        placeholder=""
      />
    </div>
    <div className="mb-3">
      <label>Password</label>
      <Input 
         className="form-control"
        type={values.showPassword ? "text" : "password"}
        placeholder='Atleast 6 Characters'
        onChange={handlePasswordChange("password")}
        value={values.password}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
     </div>
    <div className="d-grid">
      <button type="submit" className="btn btn-primary">
        Sign Up 
      </button>
    </div>
  </form>
  <hr class="hr-text" data-content="Or" />
  <p className='text-center'>Sign Up With </p>
  <div class="container text-center">
  <div class="row">
    <div class="col">
        <img src='./images/google.png' alt='google' className='img-fluid  googleimg'  onClick={()=>{
    navigate("/google/auth")
    }}/>
    </div>
    <div class="col">
    <img src='./images/apple.png' alt='apple' className='img-fluid  appleimg'  onClick={()=>{
    navigate("/apple/auth")
    }}/>
    </div>
    <div class="col ">
    
    <img src='./images/facebook.png' alt='facebook' className='img-fluid facebookimg  shadow-lg' onClick={()=>{
    navigate("/facebook/auth")
    }}
    
    />
    </div>
  </div>
</div>
<br></br>
<p className='text-center'>Already a User? <a href="/login">Login</a></p>
  </>
  )
}
