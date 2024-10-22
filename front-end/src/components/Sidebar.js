import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="d-flex flex-column bg-light p-3" style={{ width: '250px', height: '100vh', position: 'fixed', top: '60px' }}>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Room #1
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="shelf-links">
                                <div>
                                    <Link to="/shelf1" className="shelf">Shelf 1</Link>
                                </div>
                                <div>
                                    <Link to="/shelf2" className="shelf">Shelf 2</Link>
                                </div>
                                <div>
                                    <Link to="/shelf3" className="shelf">Shelf 3</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Room #2
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="shelf-links">
                                <div>
                                    <Link to="/shelf1" className="shelf">Shelf 1</Link>
                                </div>
                                <div>
                                    <Link to="/shelf2" className="shelf">Shelf 2</Link>
                                </div>
                                <div>
                                    <Link to="/shelf3" className="shelf">Shelf 3</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
