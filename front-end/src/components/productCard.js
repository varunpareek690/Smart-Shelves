import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProductCard = ({ product, sensorData, maxWeight, maxDistance }) => {
    let progressPercentage = 0;
    let additionalInfo = '';

    if (product.shelf === 1) {
        // Shelf 1 (load cell) uses weight data
        const weightPercentage = Math.min((sensorData.weight / maxWeight) * 100, 100);
        progressPercentage = weightPercentage;
        additionalInfo = `Weight: ${sensorData.weight}g`;
    } else if (product.shelf === 2) {
        // Shelf 2 (ultrasonic) uses distance data
        const maxQuantity = Math.floor(maxDistance / product.itemLength); // Max possible packets based on shelf length
        const distancePercentage = Math.min((product.Quantity / maxQuantity) * 100, 100);
        progressPercentage = distancePercentage;
        additionalInfo = `Remaining Distance: ${sensorData.distance}cm`;
    }

    return (
        <div className="product-card">
            <img
                src={`/images/${product.Image}`}
                alt={product.Product}
                style={{ width: "100px", height: "100px" }}
            />
            <h2>{product.Product}</h2>
            <p>{`Shelf ${product.shelf}`}</p>
            <div className="progress-container">
                <CircularProgressbar
                    value={progressPercentage}
                    text={`${progressPercentage.toFixed(2)}%`}
                    styles={buildStyles({
                        textColor: "black",
                        pathColor: product.shelf === 1 ? "green" : "blue",
                        trailColor: "lightgrey",
                    })}
                />
            </div>
            <p>{additionalInfo}</p> {/* Display relevant sensor data */}
        </div>
    );
};

export default ProductCard;
