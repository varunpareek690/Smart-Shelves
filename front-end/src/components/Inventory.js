import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Inventory = () => {
    const [sensorData, setSensorData] = useState({ weight: 1500, distance: 0 });
    const [products, setProducts] = useState([
        {
            Product: "Basmati Rice",
            Quantity: 0, // Will be updated dynamically
            Total: 15,
            Image: "basmati_rice.png",
            shelf: 1,
            Weight: 1500 // Updated Max weight in grams
        },
        {
            Product: "Oreo",
            Quantity: 0, // Will be updated dynamically
            Total: 6,
            Image: "oreo.png",
            shelf: 2,
            itemLength: 5 // Length of each packet in cm
        }
    ]);
    

    // Fetch sensor data from the server
    const fetchSensorData = async () => {
        try {
            const response = await fetch("http://192.168.88.137:8000/api/sensor-data");
            if (response.ok) {
                const data = await response.json();
                setSensorData(data);
            } else {
                console.error("Failed to fetch sensor data:", response.status);
            }
        } catch (error) {
            console.error("Error fetching sensor data:", error);
        }
    };

   

    useEffect(() => {
        fetchSensorData();
        const interval = setInterval(fetchSensorData, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (sensorData.weight < 100) {
            alert('Stock empty in Shelf 1');
        }

        if (sensorData.distance > 15) {
            alert('Stock empty in Shelf 2');
        }
    }, [sensorData.weight, sensorData.distance]);

    // Update product quantities dynamically for all shelves
    const updateProductQuantities = () => {
        return products.map(product => {
            if (product.shelf === 1) {
                // Calculate progress based on weight for Basmati Rice
                const filledWeight = sensorData.weight;
                const weightPercentage = (filledWeight / product.Weight) * 100;
                const limitedWeightPercentage = Math.max(0, Math.min(weightPercentage, 100));

                return {
                    ...product,
                    Quantity: Math.round(limitedWeightPercentage * (product.Total / 100))
                };
            } else if (product.shelf === 2) {
                // Calculate progress based on distance for Oreo
                const totalShelfLength = 30; // 30cm total shelf length
                const remainingDistance = sensorData.distance;
                const filledSpace = totalShelfLength - remainingDistance;
                const packetsOnShelf = Math.max(
                    0,
                    Math.min(Math.floor(filledSpace / product.itemLength), product.Total)
                );

                return { ...product, Quantity: packetsOnShelf };
            }
            return product;
        });
    };

    const updatedProducts = updateProductQuantities();

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Sidebar />
                    </div>
                    <div className="col-10" style={{ marginTop: "80px" }}>
                        <h1 className="text-center mb-4">Product Inventory</h1>
                        <div className="row justify-content-center">
                            {updatedProducts.map((product, index) => {
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
                                                <div className="progress-container" style={{ width: "100px" }}>
                                                    <CircularProgressbar
                                                        value={percentage}
                                                        text={`${percentage}%`}
                                                        styles={buildStyles({
                                                            textColor: "black",
                                                            pathColor: "green",
                                                            trailColor: "lightgrey"
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <p className="card-text">{`Quantity: ${product.Quantity} / ${product.Total}`}</p>
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
