import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth"); // Clear authentication
        navigate("/login"); // Redirect to login page
    };

    const goToInventory = () => {
        navigate("/inventory");
    };

    return (
        <div className="container mt-5 text-center">
            <h1>Dashboard</h1>
            <button className="btn btn-success m-3" onClick={goToInventory}>Go to Inventory</button>
            <button className="btn btn-danger m-3" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
