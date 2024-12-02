import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, Button, CssBaseline, Paper } from '@mui/material';

const EmployeeDetailsPage = () => {
  const { eid } = useParams(); // Get the employee ID from URL params
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate hook for redirection

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/${eid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(response.data);
      } catch (err) {
        setError('Failed to fetch employee details');
      }
    };

    fetchEmployeeDetails();
  }, [eid]);

  if (error) {
    return (
      <Container component="main" maxWidth="xs" sx={{ paddingTop: '50px' }}>
        <Typography
          color="error"
          variant="h6"
          align="center"
          sx={{ fontWeight: 'bold', color: '#f44336' }}
        >
          {error}
        </Typography>
      </Container>
    );
  }

  if (!employee) {
    return (
      <Container component="main" maxWidth="xs" sx={{ paddingTop: '50px' }}>
        <Typography
          variant="h6"
          align="center"
          sx={{ fontWeight: 'bold', color: '#00e676' }}
        >
          Loading...
        </Typography>
      </Container>
    );
  }

  // Handle navigation back to employee list
  const handleBackToList = () => {
    navigate('/employees'); // Navigate back to the employee list page
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ paddingTop: '50px' }}>
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
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', color: '#00e676' }}
        >
          Employee Details
        </Typography>

        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: '#fff', fontWeight: 'bold' }}
          >
            <strong>First Name:</strong> {employee.first_name}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: '#fff', fontWeight: 'bold' }}
          >
            <strong>Last Name:</strong> {employee.last_name}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: '#fff', fontWeight: 'bold' }}
          >
            <strong>Email:</strong> {employee.email}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: '#fff', fontWeight: 'bold' }}
          >
            <strong>Position:</strong> {employee.position}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: '#fff', fontWeight: 'bold' }}
          >
            <strong>Salary:</strong> {employee.salary}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: '#fff', fontWeight: 'bold' }}
          >
            <strong>Date of Joining:</strong> {employee.date_of_joining}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: '#fff', fontWeight: 'bold' }}
          >
            <strong>Department:</strong> {employee.department}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#00e676',
              color: '#000',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#00c853' },
            }}
            onClick={handleBackToList}
          >
            Back to Employee List
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EmployeeDetailsPage;