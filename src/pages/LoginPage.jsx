import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userAuthentication } from '../core/actions';
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';

const defaultTheme = createTheme();

export function Login(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //TO DO : Put this function in a dedicated file 
  async function authenticationRequest(data) {
    try {
      const response = await fetch("http://tp.cpe.fr:8083/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      return result
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user ={
      username: data.get('username'),
      password: data.get('password'),
    };

    const userId = await authenticationRequest(user)
    dispatch(userAuthentication(userId));

    if(userId != null){
      navigate('/welcome-page')
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
                <Link href="http://localhost:3000/add-user" variant="body2">
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