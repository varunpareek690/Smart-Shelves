import React from "react";
import products from "../products.json";
import '../styles/App.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Inventory = () => {
    return (
        <div className="product-container">
            <h1>Product Inventory</h1>
            <div className="product-list">
                {products.map((product, index) => {
                    const percentage = Math.round((product.Quantity / product.Total) * 100);
                    return (
                        <div className="product-card" key={index}>
                            <img
                                src={`/images/${product.Image}`}
                                alt={product.Product}
                                style={{ width: "100px", height: "100px" }}
                            />
                            <div className="product-details">
                                <h2 className="product-name">{product.Product}</h2>
                                <div className="progress-container">
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
                            <p className="product-info">{`Weight: ${product.Weight}g | Quantity: ${product.Quantity} / ${product.Total}`}</p>
                        </div>


                    );
                })}
            </div>
        </div>
    );
};

export default Inventory;
