// src/components/Profile.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './dashboard.css';

const Profile = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2 className="logo">Dovuchcha</h2>
                <nav className="sidebar-nav">
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/settings">Settings</a></li>
                        <li><a href="/notifications">Notifications</a></li>
                        <li><a href="/help">Help</a></li>
                    </ul>
                </nav>
            </aside>
            
            <main className="main-content">
                <header className="top-nav">
                    <h3>Welcome, {user?.username}</h3>
                    <button onClick={logoutUser} className="logout-button">Logout</button>
                </header>

                <section className="content">
                    <div className="section-header">
                        <h2>Dashboard Overview</h2>
                    </div>

                    <div className="cards-container">
                        <div className="card">
                            <h3>Profile</h3>
                            <p>Manage your profile information and security settings.</p>
                            <button className="card-button">Edit Profile</button>
                        </div>

                        <div className="card">
                            <h3>Privacy & Security</h3>
                            <p>Adjust your privacy and account security settings.</p>
                            <button className="card-button">Manage Privacy</button>
                        </div>

                        <div className="card">
                            <h3>Activity & Notifications</h3>
                            <p>Review recent account activity and notifications.</p>
                            <button className="card-button">View Activity</button>
                        </div>

                        <div className="card">
                            <h3>Support</h3>
                            <p>Get help with your account and settings.</p>
                            <button className="card-button">Get Support</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Profile;