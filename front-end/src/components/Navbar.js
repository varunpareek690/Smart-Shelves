import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        // Polling the backend for stock status (for simplicity, using setInterval here)
        const checkStock = setInterval(() => {
            fetch('http://192.168.88.137:8000/api/sensor-data')  // Replace with your actual API endpoint
                .then((response) => response.json())
                .then((data) => {
                    // Example logic: Show notification if weight is low (indicating low stock)
                    if (data.weight < 500) { // Modify this logic based on your stock threshold
                        setShowNotification(true);  // Show notification if weight is under threshold
                    } else {
                        setShowNotification(false);
                    }
                });
        }, 5000);  // Check every 5 seconds for stock status

        return () => clearInterval(checkStock);  // Clean up interval on component unmount
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove token from local storage
        localStorage.removeItem('auth');  // Remove auth flag
        window.location.href = '/login';  // Redirect to login page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand">IOT</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="mx-auto"> {/* Centering the nav items */}
                        <ul className="navbar-nav gap-3">
                            <li className="nav-item">
                                <NavLink to="/shelf1" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/inventory" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Inventory</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/orders" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Orders</NavLink>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                    {showNotification && (
                        <button className="btn btn-danger ms-2" style={{ position: 'relative' }}>
                            <i className="bi bi-bell"></i>
                            <span className="badge bg-danger" style={{ position: 'absolute', top: '-5px', right: '-5px' }}>!</span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
