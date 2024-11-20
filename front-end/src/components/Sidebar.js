import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div
            className="d-flex flex-column flex-md-column p-3 align-items-center "
            style={{
                width: '300px',
                height: '10px',
                top: '60px',
            }}
        >
            <div className="d-flex flex-row flex-md-column justify-content-around w-100 mobile-buttons ms-5">
                <Link to="/shelf1" className="btn btn-outline-primary mx-1">
                    Shelf 1
                </Link>
                <Link to="/shelf2" className="btn btn-outline-primary mx-1">
                    Shelf 2
                </Link>
                <Link to="/shelf3" className="btn btn-outline-primary mx-1">
                    Shelf 3
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
