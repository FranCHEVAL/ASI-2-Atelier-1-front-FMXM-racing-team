import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {userAuthentication} from '../core/actions';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from "react";
import { LOCALLINK, PROXYLINK, AUTH } from '../constants';
import SocketManager from '../socket.js';

const defaultTheme = createTheme();

export function Login(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector(state => state.currentUserId);
  const [erreurs, setErreurs] = useState([])

  if(userId !== null){
    navigate('/welcome-page')
  }

  //TO DO : Put this function in a dedicated file 
  async function authenticationRequest(data) {
    console.log(data)
    try {
      const response = await fetch(`${PROXYLINK}/${AUTH}/auth`, {
        method: 'POST', // ou 'POST', 'PUT', etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })

      return await response.json()
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setErreurs([])

    const user ={
      username: data.get('username'),
      password: data.get('password'),
    };

    const userId = await authenticationRequest(user)

    if(userId !== -1){
      navigate('/welcome-page')
      dispatch(userAuthentication(userId));
      SocketManager.init(userId)
    } else {
        setErreurs(["Username or password incorrect"])
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
          <div>
            {erreurs.map((error) => (
                <Alert severity="error">{error}</Alert>
            ))}
          </div>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container   
            justifyContent="center"
            alignItems="center">
              <Grid item>
                <Link href={`${LOCALLINK}/add-user`} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;