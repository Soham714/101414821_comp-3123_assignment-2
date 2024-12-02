import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  CssBaseline,
  Paper,
} from '@mui/material'; // Importing Material-UI components

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch employees from the server
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const response = await axios.get('http://localhost:5000/api/v1/emp/employees', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data);
      } catch (error) {
        setError('Failed to fetch employees');
      }
    };

    fetchEmployees();
  }, []);

  // Delete employee
  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this employee?');
    if (confirmation) {
      try {
        const token = localStorage.getItem('jwt_token');
        await axios.delete(`http://localhost:5000/api/v1/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(employees.filter((employee) => employee._id !== id));
      } catch (error) {
        setError('Failed to delete employee');
      }
    }
  };

  // View employee details
  const handleView = (id) => {
    navigate(`/employees/${id}`);
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ paddingTop: 5 }}>
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
          Employee List
        </Typography>

        {error && (
          <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 3,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: '#00e676',
              color: '#000',
              '&:hover': { bgcolor: '#00c853' },
              fontWeight: 'bold',
            }}
            onClick={() => navigate('/employees/add')}
          >
            Add Employee
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#1e88e5',
              color: '#fff',
              '&:hover': { bgcolor: '#1565c0' },
              fontWeight: 'bold',
            }}
            onClick={() => navigate('/employees/search')}
          >
            Search Employees
          </Button>
        </Box>

        <TableContainer
          sx={{
            maxHeight: '500px',
            overflowY: 'auto',
            backgroundColor: '#1e1e1e',
            borderRadius: 2,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  'First Name',
                  'Last Name',
                  'Email',
                  'Position',
                  'Salary',
                  'Date of Joining',
                  'Department',
                  'Actions',
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      backgroundColor: '#333333',
                      color: '#00e676',
                      fontWeight: 'bold',
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell sx={{ color: '#fff' }}>{employee.first_name}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{employee.last_name}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{employee.email}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{employee.position}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{employee.salary}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{employee.date_of_joining}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{employee.department}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      sx={{
                        color: '#00e676',
                        borderColor: '#00e676',
                        '&:hover': { bgcolor: '#00e676', color: '#000' },
                      }}
                      onClick={() => handleView(employee._id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        color: '#1e88e5',
                        borderColor: '#1e88e5',
                        marginLeft: 1,
                        '&:hover': { bgcolor: '#1e88e5', color: '#fff' },
                      }}
                      onClick={() => navigate(`/employees/update/${employee._id}`)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        color: '#e53935',
                        borderColor: '#e53935',
                        marginLeft: 1,
                        '&:hover': { bgcolor: '#e53935', color: '#fff' },
                      }}
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default EmployeeListPage;