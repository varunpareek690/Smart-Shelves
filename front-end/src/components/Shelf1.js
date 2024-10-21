
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; // Reusable product card component

const Shelf1 = () => {
    const [sensorData, setSensorData] = useState({ weight: 0, distance: 0 });

    const basmatiRice = {
        Product: 'Basmati Rice',
        Quantity: 30,
        Total: 30,
        Image: 'basmati_rice.png',
        shelf: 1, 
        Weight: 5000, 
    };

    
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

    return (
        <div className="shelf-container">
            <h1>Shelf 1: Basmati Rice</h1>
            <ProductCard
                product={basmatiRice}
                sensorData={sensorData}
                maxWeight={1500} // Maximum weight for Shelf 1
            />
        </div>
    );
};

export default Shelf1;
