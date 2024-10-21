import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import '../styles/App.css';

const Inventory = () => {
    const [sensorData, setSensorData] = useState({ weight: 0, distance: 0 });
    const [products, setProducts] = useState([
        {
            Product: 'Basmati Rice',
            Quantity: 0,  // Will be updated dynamically
            Total: 30,
            Image: 'basmati_rice.png',
            shelf: 1,
            Weight: 5000 // Placeholder for weight calculation
        },
        {
            Product: 'Oreo',
            Quantity: 0,  // Will be updated dynamically
            Total: 6,
            Image: 'oreo.png',
            shelf: 2,
            itemLength: 5 // Length of each packet in cm
        }
    ]);

    // Fetch sensor data from the server
    const fetchSensorData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/sensor-data');
            if (response.ok) {
                const data = await response.json();
                setSensorData(data);
            } else {
                console.error('Failed to fetch sensor data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    useEffect(() => {
        fetchSensorData();
        const interval = setInterval(fetchSensorData, 1000);
        return () => clearInterval(interval);
    }, []);

    // Update the product quantity dynamically based on sensor data
   // Update the product quantity dynamically based on sensor data
const updateProductQuantities = () => {
    return products.map(product => {
        if (product.shelf === 1) {
            // Shelf 1: Calculate progress based on weight for Basmati Rice
            const filledWeight = sensorData.weight;
            const weightPercentage = (filledWeight / product.Weight) * 100;

            // Ensure the weight percentage is between 0 and 100
            const limitedWeightPercentage = Math.max(0, Math.min(weightPercentage, 100));

            return { ...product, Quantity: Math.round(limitedWeightPercentage * (product.Total / 100)) };
        } else if (product.shelf === 2) {
            // Shelf 2: Calculate progress based on distance for Oreo
            const totalShelfLength = 30; // 30cm total shelf length
            const remainingDistance = sensorData.distance;
            const filledSpace = totalShelfLength - remainingDistance;

            // Calculate how many packets are on the shelf and ensure it's within 0 and the total amount of packets
            const packetsOnShelf = Math.max(0, Math.min(Math.floor(filledSpace / product.itemLength), product.Total));

            return { ...product, Quantity: packetsOnShelf };
        }
        return product;
    });
};


    const updatedProducts = updateProductQuantities();

    return (
        <div className="inventory-container">
            <h1>Shelf Inventory</h1>
            <div className="products-list">
                {updatedProducts.map((product, index) => (
                    <ProductCard
                        key={index}
                        product={product}
                        sensorData={sensorData}
                        maxWeight={product.shelf === 1 ? 1000 : undefined}
                        maxDistance={product.shelf === 2 ? 30 : undefined}
                    />
                ))}
            </div>
        </div>
    );
};

export default Inventory;
