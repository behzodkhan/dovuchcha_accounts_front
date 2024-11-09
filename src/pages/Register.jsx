import React, { useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate for redirection

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/register/', {
        username,
        password,
        email,
      });
      setMessage('Registration successful!');
      setTimeout(() => navigate('/login'), 2000);  // Redirect to login page after 2 seconds
    } catch (error) {
      setMessage('Registration failed: ' + (error.response?.data?.error || error.message));
    }
  };

  // Check if all fields are filled
  const isFormComplete = username && password && email;

  return (
    <div className="register-container">
      <h2 className="title">Dovuchcha Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button type="submit" className="register-button" disabled={!isFormComplete}>
          Register
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;