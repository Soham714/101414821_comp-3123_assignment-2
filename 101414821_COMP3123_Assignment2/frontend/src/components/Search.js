import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Paper,
} from '@mui/material';

const SearchEmployeePage = () => {
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!department && !position) {
      setError('Please provide at least one search parameter.');
      return;
    }

    try {
      const token = localStorage.getItem('jwt_token');
      const response = await axios.get(
        'http://localhost:5000/api/v1/emp/employees/search',
        {
          params: { department, position },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSearchResults(response.data);
      setError('');
    } catch (error) {
      setError('No employee Found');
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ paddingTop: '50px' }}>
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
          sx={{
            fontWeight: 'bold',
            color: '#00e676',
          }}
        >
          Search Employees
        </Typography>

        {error && (
          <Typography
            color="error"
            variant="body1"
            align="center"
            gutterBottom
          >
            {error}
          </Typography>
        )}

        <form onSubmit={handleSearch}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Department"
              variant="outlined"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              fullWidth
              sx={{
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
              label="Position"
              variant="outlined"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              fullWidth
              sx={{
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#00e676',
                  color: '#000',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#00c853' },
                }}
              >
                Search
              </Button>
            </Box>
          </Box>
        </form>

        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ marginTop: 3, color: '#00e676' }}
        >
          Search Results
        </Typography>

        {searchResults.length === 0 ? (
          <Typography align="center" sx={{ color: '#fff' }}>
            No employees found matching the criteria.
          </Typography>
        ) : (
          <Box
            sx={{
              overflowX: 'auto',
              marginTop: 3,
              color: '#fff',
              border: '1px solid #00e676',
              borderRadius: 2,
            }}
          >
            <table
              style={{
                width: '100%',
                color: '#fff',
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#00e676', color: '#000' }}>
                  <th style={{ padding: '10px', border: '1px solid #fff' }}>
                    Employee First Name
                  </th>
                  <th style={{ padding: '10px', border: '1px solid #fff' }}>
                    Employee Last Name
                  </th>
                  <th style={{ padding: '10px', border: '1px solid #fff' }}>
                    Employee Email
                  </th>
                  <th style={{ padding: '10px', border: '1px solid #fff' }}>
                    Position
                  </th>
                  <th style={{ padding: '10px', border: '1px solid #fff' }}>
                    Salary
                  </th>
                  <th style={{ padding: '10px', border: '1px solid #fff' }}>
                    Date of Joining
                  </th>
                  <th style={{ padding: '10px', border: '1px solid #fff' }}>
                    Department
                  </th>
                  <th style={{ padding: '10px', border: '1px solid #fff' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((employee) => (
                  <tr key={employee._id}>
                    <td style={{ padding: '10px', border: '1px solid #fff' }}>
                      {employee.first_name}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #fff' }}>
                      {employee.last_name}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #fff' }}>
                      {employee.email}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #fff' }}>
                      {employee.position}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #fff' }}>
                      {employee.salary}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #fff' }}>
                      {employee.date_of_joining}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #fff' }}>
                      {employee.department}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #fff' }}>
                      <Button
                        variant="outlined"
                        sx={{
                          color: '#00e676',
                          borderColor: '#00e676',
                          '&:hover': {
                            borderColor: '#00c853',
                            backgroundColor: 'rgba(0, 230, 118, 0.1)',
                          },
                        }}
                        onClick={() =>
                          navigate(`/employees/${employee._id}`)
                        }
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Button
            variant="outlined"
            sx={{
              color: '#00e676',
              borderColor: '#00e676',
              '&:hover': {
                borderColor: '#00c853',
                backgroundColor: 'rgba(0, 230, 118, 0.1)',
              },
            }}
            onClick={() => navigate('/employees')}
          >
            Back to Employee List
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SearchEmployeePage;