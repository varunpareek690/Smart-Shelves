import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Assuming you create a custom CSS file for the navbar

const Navbar = () => {
    useEffect(() => {
        // Polling the backend for stock status (if needed in the future)
        const checkStock = setInterval(() => {
            fetch('http://localhost:8000/api/sensor-data') // Replace with your actual API endpoint
                .then((response) => response.json())
                .catch((error) => console.error('Error fetching stock data:', error));
        }, 5000); // Check every 5 seconds

        return () => clearInterval(checkStock); // Cleanup interval on unmount
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token from local storage
        localStorage.removeItem('auth'); // Clear auth flag
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
            <div className="container-fluid">
                {/* Brand Name */}
                <a className="navbar-brand" href="/">IOT</a>

                {/* Hamburger Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible Menu */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto gap-3">
                        <li className="nav-item">
                            <NavLink
                                to="/shelf1"
                                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/products"
                                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                            >
                                Products
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/inventory"
                                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                            >
                                Inventory
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/orders"
                                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                            >
                                Orders
                            </NavLink>
                        </li>
                    </ul>
                    {/* Logout Button */}
                    <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
