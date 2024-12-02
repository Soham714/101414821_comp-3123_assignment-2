import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import List from './components/List';
import View from './components/View';
import Update from './components/Update';
import Create from './components/Create';
import Search from './components/Search';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employees" element={<List />} />
          <Route path="/employees/:eid" element={<View />} />
          <Route path="/employees/update/:eid" element={<Update />} />
          <Route path="/employees/add" element={<Create />} />
          <Route path="/employees/search" element={<Search />} /> {/* New route for Search Employee */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;