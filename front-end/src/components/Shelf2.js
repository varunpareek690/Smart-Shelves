import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Shelf2 = () => {
  const products = [
    {
      Product: "Oreo",
      Total: 6, // Total quantity of Oreo
      Image: "oreo.png",
      Shelf: 2,
      itemLength: 5, // Length of each packet in cm
      distanceState: "distance1", // Key for the sensor data
    },
    {
      Product: "Parle-G",
      Total: 10, // Total quantity of Parle-G
      Image: "parle.png",
      Shelf: 2,
      itemLength: 5, // Length of each packet in cm
      distanceState: "distance2", // Key for the sensor data
    },
  ];

  const totalShelfLength = 22; // Total length of the shelf in cm

  const [sensorData, setSensorData] = useState({
    distance1: 0,
    distance2: 0,
  });

  const fetchSensorData = async () => {
    try {
      const response = await fetch("http://192.168.88.137:8000/api/sensor-data");
      if (response.ok) {
        const data = await response.json();
        setSensorData({
          distance1: data.distance1 || 0,
          distance2: data.distance2 || 0,
        });
      } else {
        console.error("Failed to fetch sensor data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 1000); // Update data every second
    return () => clearInterval(interval); // Cleanup interval
  }, []);

  const calculateFilledBottles = (distanceKey, itemLength, totalQuantity) => {
    const remainingDistance = sensorData[distanceKey] || 0;
    const filledSpace = totalShelfLength - remainingDistance;
    const bottles = Math.floor(filledSpace / itemLength);
    return Math.min(bottles, totalQuantity);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-2">
            <Sidebar />
          </div>
          <div className="col-12 col-md-10" style={{ marginTop: "80px" }}>
            <h1 className="text-center mb-4">Shelf 2: Biscuits</h1>
            <div className="row justify-content-center">
              {products.map((product, index) => {
                const filledBottles = calculateFilledBottles(
                  product.distanceState,
                  product.itemLength,
                  product.Total
                );
                const progressPercentage = Math.round(
                  (filledBottles / product.Total) * 100
                );

                return (
                  <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4" key={index}>
                    <div className="card h-100 text-center">
                      <img
                        src={`/images/${product.Image}`}
                        alt={product.Product}
                        className="card-img-top mx-auto"
                        style={{ width: "100px", height: "100px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.Product}</h5>
                        <div style={{ width: "80px", margin: "auto" }}>
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
                      <div className="card-footer">
                        <p>{`Quantity: ${filledBottles} / ${product.Total}`}</p>
                        <p>{`Remaining Distance: ${
                          sensorData[product.distanceState]
                        } cm`}</p>
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

export default Shelf2;
