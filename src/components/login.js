import React, { useState } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';

export default function Login() {
    const navigate = useNavigate();
    const [showPassword,setShowPassword1] = useState(false); 
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [severity,setSeverity] = useState("error");
    const [errors, setErrors] = useState({});
    const [toastOpen, setToastOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          setToastOpen(false);
          return;
        }
      }

    const onSubmit = async (e) => {
        if(userName==="" || password===""){
            setSeverity("warning");
            setErrors({error:"Please fill in the required fields"})
            setToastOpen(true);
            setUserName("");
            setPassword("");
            setSeverity("error")
            return
          }
          
          let loginInfo = {
            email: userName,
            password: password
          }
          console.log(loginInfo);

          try {
            const response = await fetch('http://localhost:4000/users/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginInfo)
      
            });
      
            const result = await response.json();
            console.warn("Result", result);
      
            if (result.success) {
              if (result.token) {
                localStorage.setItem("token", result.token);
                setUserName("");
                setPassword("");
              navigate("/home");
                
              } else {
                console.log(result.token);
              }
            } else {
              console.log(result);
              setErrors(result);
           
              setToastOpen(true);
            }
           
      
          } catch (error) {
            console.error(error);
            setErrors(error.response);
           
            setToastOpen(true);
          }
    }

    return (
        <>
    <form onSubmit={onSubmit}>
    <h3 className=''>Login</h3>
    <div className="mb-3">
      <label>Email ID</label>
      <Input
        type="email"
        className="form-control"
        placeholder=""
        value={userName}
        onChange={(e) => { setUserName(e.target.value) }}
      />
    </div>
    <div className="mb-3">
      <label>Password</label>
      <Input 
         className="form-control"
        type={showPassword ? "text" : "password"}
        placeholder='Atleast 6 Characters'
        value={password}
        onChange={(e) => { setPassword(e.target.value) }}
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
        onClick={(e)=>{e.preventDefault()
        onSubmit()}}
         >
        Login 
      </button>
    </div>
  </form>
  <hr class="hr-text" data-content="Or" />

<p className='text-center'>Not Registered? <a href='/' onClick={(e)=>{e.preventDefault(); navigate("/")}} >Signup</a></p>
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
  </>
  )
}
