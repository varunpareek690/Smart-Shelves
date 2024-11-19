import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Shelf2 = () => {
  // Hardcoded product data for Shelf 2 (Loreal Shampoo)
  const product = {
    Product: "Oreo",
    Total: 6, // Total possible bottles
    Image: "oreo.png",
    Shelf: 2,
    itemLength: 5, // Length of each shampoo bottle (5cm)
  };

  const totalShelfLength = 30; // Total shelf length in cm

  // State to store the sensor data received from the API (ultrasonic sensor)
  const [sensorData, setSensorData] = useState({ distance: 0 });

  // Fetch sensor data from the API for Shelf 2
  const fetchSensorData = async () => {
    try {
      const response = await fetch('http://192.168.88.137:8000/api/sensor-data'); // Adjust API URL as necessary
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
    fetchSensorData(); // Fetch data on component mount
    const interval = setInterval(fetchSensorData, 1000); // Poll the API every second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Calculate the number of bottles based on remaining distance (sensor data)
  const calculateFilledBottles = () => {
    const remainingDistance = sensorData.distance; // Distance measured by ultrasonic sensor
    const filledSpace = totalShelfLength - remainingDistance; // Space occupied by bottles
    const bottlesOnShelf = Math.floor(filledSpace / product.itemLength); // Number of bottles based on item length

    // Ensure bottlesOnShelf doesn't exceed the total possible number of bottles
    return Math.min(bottlesOnShelf, product.Total);
  };

  const filledBottles = calculateFilledBottles();
  const progressPercentage = Math.round((filledBottles / product.Total) * 100); // Progress as a percentage

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10" style={{ marginTop: '80px' }}>
            <div className="text-center">
              <h1>Shelf 2: {product.Product}</h1>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-4">
                <div className="card h-100">
                  <img
                    src={`/images/${product.Image}`}
                    alt={product.Product}
                    className="card-img-top mx-auto"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="card-body d-flex flex-column align-items-center">
                    <h5 className="card-title mb-3 text-center">{product.Product}</h5>
                    <div className="progress-container" style={{ width: '80px' }}>
                      <CircularProgressbar
                        value={progressPercentage}
                        text={`${progressPercentage}%`}
                        styles={buildStyles({
                          textColor: "black",
                          pathColor: "green",
                          trailColor: "lightgrey",
                        })}
                      />
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <p className="card-text">{`Bottles: ${filledBottles} / ${product.Total}`}</p>
                    <p className="card-text">{`Remaining Distance: ${sensorData.distance} cm`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shelf2;
