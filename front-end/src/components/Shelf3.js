import React from "react";
import products from "../products.json";  // Fetching products data from the JSON file
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import '../styles/App.css'; // Importing the CSS for the styles

const Shelf3 = () => {
    // Filter products specifically for Shelf 3
    const shelfProducts = products.filter(product => product.Shelf ===4);

    return (
        <div className="shelf-container">
            <h1>Shelf 3: Bottles</h1>
            <div className="product-list">
                {shelfProducts.map((product, index) => {
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

export default Shelf3;
