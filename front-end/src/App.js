import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';  
import Sidebar from './components/Sidebar';  
import Shelf1 from './components/Shelf1';  
import Shelf2 from './components/Shelf2';  
import Shelf3 from './components/Shelf3';  
import Inventory from './components/Inventory';  
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="app-container">
                <Sidebar />
                <Shelf1 />
                <Shelf2 />
                <Shelf3 />
                {/* <MainContent /> */}
            </div>
        </Router>
    );
};

export default App;
