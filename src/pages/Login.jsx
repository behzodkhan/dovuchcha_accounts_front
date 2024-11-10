import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const nextUrl = searchParams.get('next') ? decodeURIComponent(searchParams.get('next')) : null;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://behzod.pythonanywhere.com/o/token/', {
                grant_type: 'password',
                username: username,
                password: password,
                client_id: 'M6Vg9b7i3hvtKUD03Xk9yKOB8r1xu4955Qh3ghTH',
                client_secret: 'pbkdf2_sha256$720000$fwYEw3GPTxl3LywqTjPgef$9UXamgm12uvY89wIiyKYKfcLIWBaZkGasZWt29QpTzg=',
            });

            const { access_token, refresh_token } = response.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            setMessage('Login successful!');
            setIsError(false);

            if (nextUrl) {
                if (nextUrl.startsWith('http')) {
                    window.location.href = nextUrl;
                } else {
                    navigate(nextUrl);
                }
            } else {
                navigate('/profile');
            }
        } catch (error) {
            setMessage('Login failed: ' + (error.response?.data?.error || error.message));
            setIsError(true);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            if (nextUrl) {
                if (nextUrl.startsWith('http')) {
                    window.location.href = nextUrl;
                } else {
                    navigate(nextUrl);
                }
            } else {
                navigate('/profile');
            }
        }
    }, [navigate, nextUrl]);

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
            {message && <p className={`message ${isError ? 'error' : ''}`}>{message}</p>}
            <p className="register-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;