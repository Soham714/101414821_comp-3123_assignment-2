import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Paper,
} from '@mui/material'; // Import Material-UI components

const AddEmployeePage = () => {
  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // Handle form submission
  const handleAddEmployee = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (
      !newEmployee.first_name ||
      !newEmployee.last_name ||
      !newEmployee.email ||
      !newEmployee.position ||
      !newEmployee.salary ||
      !newEmployee.date_of_joining ||
      !newEmployee.department
    ) {
      setError('All fields are required');
      return;
    }

    if (newEmployee.salary < 1) {
      setError('Salary must be at least $1');
      return;
    }

    if (new Date(newEmployee.date_of_joining) > new Date()) {
      setError('Date of joining cannot be in the future');
      return;
    }

    try {
      const token = localStorage.getItem('jwt_token');
      const response = await axios.post(
        'http://localhost:5000/api/v1/emp/employees',
        newEmployee,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Employee added successfully!');
      navigate('/employees'); // Redirect to the employee list after successful creation
    } catch (error) {
      setError('Failed to add employee');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper
        elevation={10}
        sx={{
          bgcolor: '#121212',
          padding: 4,
          borderRadius: 2,
          color: '#fff',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: '#00e676', fontWeight: 'bold' }}
        >
          Add Employee
        </Typography>

        {error && (
          <Typography
            color="error"
            variant="body1"
            align="center"
            sx={{ marginBottom: 2 }}
          >
            {error}
          </Typography>
        )}

        <form onSubmit={handleAddEmployee}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="First Name"
              variant="filled"
              name="first_name"
              value={newEmployee.first_name}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { backgroundColor: '#1e1e1e', color: '#fff' },
              }}
              InputLabelProps={{
                style: { color: '#00e676' },
              }}
            />
            <TextField
              label="Last Name"
              variant="filled"
              name="last_name"
              value={newEmployee.last_name}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { backgroundColor: '#1e1e1e', color: '#fff' },
              }}
              InputLabelProps={{
                style: { color: '#00e676' },
              }}
            />
            <TextField
              label="Email"
              variant="filled"
              name="email"
              value={newEmployee.email}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { backgroundColor: '#1e1e1e', color: '#fff' },
              }}
              InputLabelProps={{
                style: { color: '#00e676' },
              }}
            />
            <TextField
              label="Position"
              variant="filled"
              name="position"
              value={newEmployee.position}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { backgroundColor: '#1e1e1e', color: '#fff' },
              }}
              InputLabelProps={{
                style: { color: '#00e676' },
              }}
            />
            <TextField
              label="Salary"
              variant="filled"
              name="salary"
              type="number"
              value={newEmployee.salary}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { backgroundColor: '#1e1e1e', color: '#fff' },
              }}
              InputLabelProps={{
                style: { color: '#00e676' },
              }}
            />
            <TextField
              label="Date of Joining"
              variant="filled"
              name="date_of_joining"
              type="date"
              value={newEmployee.date_of_joining}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { backgroundColor: '#1e1e1e', color: '#fff' },
              }}
              InputLabelProps={{
                style: { color: '#00e676' },
                shrink: true,
              }}
            />
            <TextField
              label="Department"
              variant="filled"
              name="department"
              value={newEmployee.department}
              onChange={handleInputChange}
              fullWidth
              required
              InputProps={{
                style: { backgroundColor: '#1e1e1e', color: '#fff' },
              }}
              InputLabelProps={{
                style: { color: '#00e676' },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#00e676',
                color: '#000',
                '&:hover': { bgcolor: '#00c853' },
                fontWeight: 'bold',
              }}
            >
              Add Employee
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddEmployeePage;