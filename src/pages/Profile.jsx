import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await api.get('/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('access_token');
          navigate('/login');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');  // Clear the access token from localStorage
    navigate('/login');  // Redirect to login page
  };

  if (!profile) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-info">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Profile;