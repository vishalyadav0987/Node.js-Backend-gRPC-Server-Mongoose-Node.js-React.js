// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import CreateTodo from './CreateTodo';
import Navbar from './Navbar';
import UpdateTask from './UpdateTask';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-task" element={<CreateTodo />} />
        <Route path="/update-task/:id" element={<UpdateTask />} />
      </Routes>
    </Router>
  );
};

const navStyle = {
  padding: '30px',
  background: '#333',
  display: 'flex',
  justifyContent: 'space-around',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '18px',
};

export default App;
