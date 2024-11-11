import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import './login.css';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    let {loginUser} = useContext(AuthContext)

    return (
        <div className="login-container">
            <h2 className="title">Dovuchcha Login</h2>
            <form onSubmit={loginUser} className="login-form">
                <input
                    type="text"
                    name='username'
                    placeholder="Username"
                    className="input"
                />
                <input
                    type="password"
                    name='password'
                    placeholder="Password"
                    className="input"
                />
                <button type="submit" className="login-button">Login</button>
            </form>
            <p className="register-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;