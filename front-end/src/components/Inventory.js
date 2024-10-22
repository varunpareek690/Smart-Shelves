import React from "react";
import products from "../products.json";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Inventory = () => {
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Sidebar />
                    </div>
                    <div className="col-10" style={{ marginTop: '80px' }}>
                        <h1 className="text-center mb-4">Product Inventory</h1>
                        <div className="row justify-content-center">
                            {products.map((product, index) => {
                                const percentage = Math.round((product.Quantity / product.Total) * 100);
                                return (
                                    <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
                                        <div className="card h-100 text-center">
                                            <img
                                                src={`/images/${product.Image}`}
                                                className="card-img-top"
                                                alt={product.Product}
                                                style={{ width: "100px", height: "100px", margin: "auto" }}
                                            />
                                            <div className="card-body d-flex flex-column align-items-center">
                                                <h5 className="card-title mb-3">{product.Product}</h5>
                                                <div className="progress-container" style={{ width: '100px' }}>
                                                    <CircularProgressbar
                                                        value={percentage}
                                                        text={`${percentage}%`}
                                                        styles={buildStyles({
                                                            textColor: "black",
                                                            pathColor: "green",
                                                            trailColor: "lightgrey",
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="card-footer">
                                                <p className="card-text">{`Weight: ${product.Weight}g | Quantity: ${product.Quantity} / ${product.Total}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Inventory;
