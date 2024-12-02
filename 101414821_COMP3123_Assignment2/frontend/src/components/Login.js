import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { Link } from 'react-router-dom'; // Import Link for navigation
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  CssBaseline,
  Paper,
} from '@mui/material'; // Material-UI components

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem('jwt_token', response.jwt_token); // Save JWT token to localStorage
      navigate('/employees'); // Navigate to Employee List page after successful login
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ paddingTop: '50px' }}>
      <CssBaseline />
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          backgroundColor: '#121212',
          borderRadius: 2,
          color: '#fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginBottom: 3,
              fontWeight: 'bold',
              color: '#00e676',
            }}
          >
            Login
          </Typography>
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#00e676' },
                  '&:hover fieldset': { borderColor: '#00c853' },
                  '&.Mui-focused fieldset': { borderColor: '#00e676' },
                },
                '& .MuiInputLabel-root': {
                  color: '#00e676',
                },
              }}
              InputLabelProps={{
                style: { color: '#00e676' },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                marginBottom: 2,
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#00e676' },
                  '&:hover fieldset': { borderColor: '#00c853' },
                  '&.Mui-focused fieldset': { borderColor: '#00e676' },
                },
                '& .MuiInputLabel-root': {
                  color: '#00e676',
                },
              }}
              InputLabelProps={{
                style: { color: '#00e676' },
              }}
            />
            {error && (
              <Typography
                color="error"
                sx={{ marginBottom: 2, textAlign: 'center' }}
              >
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#00e676',
                color: '#000',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#00c853' },
              }}
            >
              Login
            </Button>
          </form>
          <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
            <Grid item>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Don’t have an account?{' '}
                <Link
                  to="/signup"
                  style={{
                    textDecoration: 'none',
                    color: '#00e676',
                    fontWeight: 'bold',
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;