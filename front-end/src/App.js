import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Shelf1 from './components/Shelf1';
import Shelf2 from './components/Shelf2';
import Shelf3 from './components/Shelf3';
import Inventory from './components/Inventory';
import Products from './components/Products';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import OrderComponent from './components/OrderComponent';
import Navbar from './components/Navbar';  // Import Navbar component
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
               
                <div className="main-content">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />  {/* Register route */}

                        {/* Protected Routes */}
                        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                        <Route path="/shelf1" element={<ProtectedRoute element={<Shelf1 />} />} />
                        <Route path="/shelf2" element={<ProtectedRoute element={<Shelf2 />} />} />
                        <Route path="/shelf3" element={<ProtectedRoute element={<Shelf3 />} />} />
                        <Route path="/inventory" element={<ProtectedRoute element={<Inventory />} />} />
                        <Route path="/products" element={<ProtectedRoute element={<Products />} />} />
                        <Route path = 'orders' element={<ProtectedRoute element={<OrderComponent/>}/>}/>

                        {/* Catch-all route */}
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
