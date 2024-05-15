import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.blendnet.ai/">
          blendnet.ai  
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn({checkAuthentication}) {
    const navigate = useNavigate();
    const [severity,setSeverity] = useState("error")
    const [errors, setErrors] = useState({});
    const [toastOpen, setToastOpen] = useState(false);



  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   const requestData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    if(data.get("email")==="" ||  data.get("password") === "" ){
        setSeverity("warning");
         setErrors({ error: "Please fill in all the details" });
         setToastOpen(true);
         return;
       }
       if (data.get("password") < 8) {
         setSeverity("error");
         setErrors({ error: "Password must be at least 8 characters long" });
         setToastOpen(true);
         return;
       }
       
     
     
       try {
         // Send a POST request to the server
         const response = await axios.post(
           "https://hashing-backend.onrender.com/users/login",
           requestData
         );
         console.log("Response", response)
        
         if (response.status === 200) {
     
     
           // If the registration is successful, you can handle the response here
           localStorage.setItem("token",response?.data?.token);
           checkAuthentication();
     
     
         } else { console.log(response.status) }
     
       } catch (error) {
         // If there's an error, handle it here
         console.error("Login error", error);
         setErrors(error);
         setToastOpen(true);
     
       }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}