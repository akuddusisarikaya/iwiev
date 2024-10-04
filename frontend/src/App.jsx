import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/admin/LoginPage';
import AdminHomePage from './pages/admin/AdminHomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminhomepage" element={<AdminHomePage/>}/>
      </Routes>
    </Router>
  );
}

export default App
