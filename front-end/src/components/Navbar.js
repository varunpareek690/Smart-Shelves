import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        localStorage.removeItem('auth'); // Remove auth flag
        window.location.href = '/login'; // Redirect to login page
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
                                <NavLink 
                                    to="/shelf1" 
                                    className={({ isActive }) => 
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    to="/products" 
                                    className={({ isActive }) => 
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    Products
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    to="/inventory" 
                                    className={({ isActive }) => 
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    Inventory
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    to="/orders" 
                                    className={({ isActive }) => 
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                >
                                    Orders
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-outline-light" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
