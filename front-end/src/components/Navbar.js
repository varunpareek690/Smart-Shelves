import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand">IOT</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mx-5" id="navbarNav">
                    <ul className="navbar-nav gap-3">
                        <li className="nav-item">
                            <NavLink 
                                to="/shelf/1" 
                                className={({ isActive }) => 
                                    isActive 
                                        ? "text-white text-decoration-none active" 
                                        : "text-muted text-decoration-none"
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/products" 
                                className={({ isActive }) => 
                                    isActive 
                                        ? "text-white text-decoration-none active" 
                                        : "text-muted text-decoration-none"
                                }
                            >
                                Products
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/inventory" 
                                className={({ isActive }) => 
                                    isActive 
                                        ? "text-white text-decoration-none active" 
                                        : "text-muted text-decoration-none"
                                }
                            >
                                Inventory
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/orders" 
                                className={({ isActive }) => 
                                    isActive 
                                        ? "text-white text-decoration-none active" 
                                        : "text-muted text-decoration-none"
                                }
                            >
                                Orders
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
