import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Get the 'next' parameter from the URL if it exists
    const nextUrl = searchParams.get('next');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // Redirect to the 'next' URL if available, otherwise to the profile page
            navigate(nextUrl || '/profile');
        }
    }, [navigate, nextUrl]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login/', { username, password });
            const { access_token, refresh_token } = response.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            setMessage('Login successful!');
            setIsError(false);  // Successful login, not an error

            // Redirect to the 'next' URL if available, otherwise to the profile page
            navigate(nextUrl || '/profile');
        } catch (error) {
            setMessage('Login failed: ' + (error.response?.data?.error || error.message));
            setIsError(true);  // Set error flag
        }
    };

    return (
        <div className="login-container">
            <h2 className="title">Dovuchcha Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                />
                <button type="submit" className="login-button">Login</button>
            </form>
            {message && <p className="message">{message}</p>}
            <p className="register-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;