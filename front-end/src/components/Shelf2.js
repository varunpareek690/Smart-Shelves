import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; // Reusable product card component

const Shelf2 = () => {
    const [sensorData, setSensorData] = useState({ weight: 0, distance: 0 });

    const oreo = {
        Product: 'Oreo Biscuits',
        Total: 6, // Total packets based on shelf length
        Image: 'oreo.png',
        itemLength: 5, // Length of each Oreo packet (5cm)
    };

    // Fetch sensor data from the server for Shelf 2 (ultrasonic sensor data)
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
        const interval = setInterval(fetchSensorData, 1000); // Fetch data every second
        return () => clearInterval(interval);
    }, []);

    // Calculate the number of Oreo packets based on remaining distance (sensor data)
    const calculateFilledPackets = () => {
        const totalShelfLength = 30; // Total shelf length in cm
        const remainingDistance = sensorData.distance; // Distance measured by ultrasonic sensor
        const filledSpace = totalShelfLength - remainingDistance; // Space occupied by packets
        const packetsOnShelf = Math.floor(filledSpace / oreo.itemLength); // Number of packets based on item length

        // Ensure packetsOnShelf doesn't exceed the total possible number of packets
        return Math.min(packetsOnShelf, oreo.Total); 
    };

    const filledPackets = calculateFilledPackets();
    const progressPercentage = Math.round((filledPackets / oreo.Total) * 100); // Progress as a percentage

    return (
        <div className="shelf-container">
            <h1>Shelf 2: Oreo Biscuits</h1>
            <ProductCard
                product={{
                    ...oreo,
                    shelf: 2, // Explicitly define shelf here
                    Quantity: filledPackets, // Quantity filled based on sensor data
                }}
                sensorData={sensorData}
                maxWeight={1000} // Max weight for Shelf 1 (not used for Shelf 2)
                maxDistance={30} // Max distance for Shelf 2 (30cm total shelf length)
            />
        </div>
    );
};

export default Shelf2;
