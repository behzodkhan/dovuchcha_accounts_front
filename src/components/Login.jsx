import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import './login.css';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
    const { loginUser, authTokens } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const redirect_url = searchParams.get('redirection');

    useEffect(() => {
        const sendTokenAndRedirect = async () => {
            if (authTokens && redirect_url) {
                setLoading(true); 
                try {
                    await axios.post(`${redirect_url}/api/token_receive`, {
                        refresh_token: authTokens.refresh,
                    });

                    setTimeout(() => {
                        window.location.href = redirect_url;
                    }, 1000);
                } catch (error) {
                    console.error("Failed to send token:", error);
                } finally {
                    setLoading(false); 
                }
            } else if (authTokens) {
                navigate('/');
            }
        };

        sendTokenAndRedirect();
    }, [authTokens, redirect_url, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await loginUser(e);

        if (success) {
            if (redirect_url) {
                const sendTokenAndRedirect = async () => {
                    setLoading(true); // Start loading before making the request
                    try {
                        await axios.post(`${redirect_url}/api/auth/token-receive`, {
                            refresh_token: authTokens.refresh,
                        });

                        // Delay the redirection slightly to show the loading indicator
                        setTimeout(() => {
                            window.location.href = redirect_url;
                        }, 1000);
                    } catch (error) {
                        console.error("Failed to send token:", error);
                    } finally {
                        setLoading(false); // Stop loading after the request completes
                    }
                };
                sendTokenAndRedirect();
            } else {
                navigate('/');
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
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
            {loading && <p className="loading-message">Redirecting...</p>}
            <p className="register-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;