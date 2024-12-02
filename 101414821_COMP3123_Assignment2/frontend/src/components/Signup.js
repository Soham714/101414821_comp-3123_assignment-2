import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api'; // Assuming you have a signup function in your API service
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  CssBaseline,
  Paper,
} from '@mui/material';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(username, email, password);
      if (response.success) {
        navigate('/login'); // Navigate to login after successful signup
      } else {
        setError(response.message || 'Signup failed'); // Show detailed error message from API
      }
    } catch (error) {
      setError(error.message || 'An error occurred while signing up');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ paddingTop: '50px' }}>
      <CssBaseline />
      <Paper
        elevation={10}
        sx={{
          padding: 3,
          backgroundColor: '#121212',
          borderRadius: 2,
          color: '#fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            marginBottom: 3,
            textAlign: 'center',
            color: '#00e676',
          }}
        >
          Sign Up
        </Typography>
        <form onSubmit={handleSignup} style={{ width: '100%' }}>
          <TextField
            label="Username"
            variant="outlined"
            type="text"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          />
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
          />
          {error && (
            <Typography color="error" sx={{ marginBottom: 2, textAlign: 'center' }}>
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
              marginTop: 2,
            }}
          >
            Sign Up
          </Button>
        </form>
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item>
            <Typography variant="body2" sx={{ color: '#fff' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#00e676', textDecoration: 'none' }}>
                Login
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignupPage;