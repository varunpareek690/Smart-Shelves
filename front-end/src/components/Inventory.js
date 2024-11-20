import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Inventory = () => {
  const [sensorData, setSensorData] = useState({
    weight: 1500,
    distanceone: 0,
    distancetwo: 0,
    ir1: 0,
    ir2: 0,
    ir3: 0,
  });

  const [products, setProducts] = useState([
    {
      Product: "Basmati Rice",
      Quantity: 0,
      Total: 15,
      Image: "basmati_rice.png",
      shelf: 1,
      Weight: 1500,
    },
    {
      Product: "Oreo",
      Quantity: 0,
      Total: 6,
      Image: "oreo.png",
      shelf: 2,
      itemLength: 5,
    },
    {
      Product: "Parle G",
      Quantity: 0,
      Total: 10,
      Image: "parle.png",
      shelf: 3,
      itemLength: 5,
    },
    {
      Product: "Coca-Cola",
      Quantity: 0,
      Total: 3,
      Image: "filled_bottle.jpg",
      shelf: 4,
    },
  ]);

  const fetchSensorData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/sensor-data");
      if (response.ok) {
        const data = await response.json();
        setSensorData(data); // Update the state with the new sensor data
      } else {
        console.error("Failed to fetch sensor data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 1000); // Fetch every second
    return () => clearInterval(interval); // Cleanup the interval
  }, []);

  const updateProductQuantities = () => {
    return products.map((product) => {
      if (product.shelf === 1) {
        const filledWeight = sensorData.weight;
        const weightPercentage = (filledWeight / product.Weight) * 100;
        const limitedWeightPercentage = Math.max(0, Math.min(weightPercentage, 100));
  
        return {
          ...product,
          Quantity: Math.round(limitedWeightPercentage * (product.Total / 100)),
        };
      } else if (product.shelf === 2) {
        const totalShelfLength = 30;
        const remainingDistance = sensorData.distanceone || 0;
        const filledSpace = totalShelfLength - remainingDistance;
        const packetsOnShelf = Math.max(
          0,
          Math.min(Math.floor(filledSpace / product.itemLength), product.Total)
        );
  
        return { ...product, Quantity: packetsOnShelf };
      } else if (product.shelf === 3) {
        const totalShelfLength = 30;
        const remainingDistance = sensorData.distancetwo || 0;
        const filledSpace = totalShelfLength - remainingDistance;
        const packetsOnShelf = Math.max(
          0,
          Math.min(Math.floor(filledSpace / product.itemLength), product.Total)
        );
  
        return { ...product, Quantity: packetsOnShelf };
      } else if (product.shelf === 4) {
        // Calculate IR sensor percentage
        const irSensors = [sensorData.ir1, sensorData.ir2, sensorData.ir3];
        // const sumIRValues = irSensors.reduce((sum, value) => sum + value, 0);
        // const irPercentage = (sumIRValues / 3) * 100;
  
        return { ...product, Quantity: (3-(sensorData.ir1+sensorData.ir2+sensorData.ir3)) }; // Round for cleaner display
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
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div
            className={`${
              window.innerWidth < 768 ? "col-12" : "col-md-10"
            }`}
            style={{ marginTop: "80px" }}
          >
            <h1 className="text-center mb-4">Product Inventory</h1>
            <div className="row justify-content-center">
              {updatedProducts.map((product, index) => {
                const percentage = Math.round(
                  (product.Quantity / product.Total) * 100
                );
                return (
                  <div
                    className="col-6 col-sm-4 col-md-3 mb-4"
                    key={index}
                  >
                    <div className="card h-100 text-center">
                      <img
                        src={`/images/${product.Image}`}
                        className="card-img-top"
                        alt={product.Product}
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "auto",
                        }}
                      />
                      <div className="card-body d-flex flex-column align-items-center">
                        <h5 className="card-title mb-3">
                          {product.Product}
                        </h5>
                        <div
                          className="progress-container"
                          style={{ width: "70px" }}
                        >
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