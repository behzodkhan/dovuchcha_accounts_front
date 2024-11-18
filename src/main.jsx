import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Profile from './components/Profile';
import Login from './components/Login';
import { AuthenticationTitle } from './components/Signin';
import { createTheme, MantineProvider } from '@mantine/core';

const PrivateRoute = ({ children }) => {
    const { user } = React.useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
};

const theme = {
    primaryColor: 'customGreen',
    colors: {
      customGreen: [
        '#F2FAEB', // Lighter shades for hover, etc.
        '#E4F4D6',
        '#CDE9B1',
        '#B3DC8A',
        '#99CF63',
        '#7DC142', // Primary color
        '#5DA032',
        '#407D23',
        '#285214',
        '#142A0B',
      ],
    },
  };

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<AuthenticationTitle />} />
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/signin'
                            element={<AuthenticationTitle/>}
                        />
                    </Routes>
                </AuthProvider>
            </Router>
        </MantineProvider>
    </React.StrictMode>
);