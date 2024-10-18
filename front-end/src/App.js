import React from 'react';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';  // Assuming you have a Navbar component
import Sidebar from './components/Sidebar';  // Your Sidebar component
import Shelf1 from './components/Shelf1';  // Importing Shelf1 component
import Shelf2 from './components/Shelf2';  // Importing Shelf2 component
import Shelf3 from './components/Shelf3';  // Importing Shelf3 component
import Inventory from './components/Inventory';  // Your Inventory component
import Products from './components/Products'
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="app-container">
                <Sidebar />
                <MainContent />
            </div>
        </Router>
    );
};

// MainContent component to handle routing with if-else
const MainContent = () => {
    const location = useLocation(); // Get current location

    // Conditional rendering based on the current path
    if (location.pathname === '/shelf1') {
        return <Shelf1 />;
    } else if (location.pathname === '/shelf2') {
        return <Shelf2 />;
    } else if (location.pathname === '/shelf3') {
        return <Shelf3 />;
    } else if (location.pathname === '/inventory') {
        return <Inventory />;
    } 
    else if(location.pathname === '/products'){
        return <Products />;
    }else { // Default to Shelf1 if no matching path
        return <Shelf1 />;
    }
};

export default App;
