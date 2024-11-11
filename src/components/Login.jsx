// src/components/Login.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import './login.css';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { loginUser, authTokens } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const redirect_url = searchParams.get('redirection');

    useEffect(() => {
        if (authTokens && redirect_url) {
            const url = new URL(redirect_url);
            url.searchParams.append('refresh_token', authTokens.refresh);
            window.location.href = url.toString();
        }
    }, [authTokens, redirect_url]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await loginUser(e);
        if (success) {
            if (redirect_url) {
                const url = new URL(redirect_url);
                url.searchParams.append('refresh_token', authTokens.refresh);
                window.location.href = url.toString();
            } else {
                navigate('/profile');
            }
        }
    };

    return (
        <div className="login-container">
            <h2 className="title">Dovuchcha Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="input"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input"
                    required
                />
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
            <p className="register-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;