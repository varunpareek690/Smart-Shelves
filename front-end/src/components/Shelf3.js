import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// Reusable component for IR sensor display
const IRProductCard = ({ product, irIndex, quantity }) => {
  return (
    <div className="col-6 col-sm-4 col-md-3 mb-4" key={`${product.Product}-ir${irIndex}`}>
      <div className="card h-100 text-center">
        <img
          src={`/images/${quantity === 1 ? product.Image1 : product.Image0}`}
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
            {product.Product} - {irIndex}
          </h5>
          <div className="progress-container" style={{ width: "70px" }}>
            <CircularProgressbar
              value={quantity === 1 ? 0 : 100}
              text={`${quantity === 1 ? 0 : 1}`}
              styles={buildStyles({
                textColor: "black",
                pathColor: "green",
                trailColor: "lightgrey",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Inventory = () => {
  const [sensorData, setSensorData] = useState({
    weight: 1500,
    distance1: 0,
    distance2: 0,
    ir1: 0,
    ir2: 0,
    ir3: 0,
  });

  const [products, setProducts] = useState([
    {
      Product: "Coca-Cola",
      Quantity: 0,
      Total: 3,
      Image0: "filled_bottle.jpg",
      Image1: "empty_bottle.png",
      shelf: 4,
    },
  ]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Fetch sensor data from the API
  const fetchSensorData = async () => {
    try {
      const response = await fetch("http://192.168.88.137:8000/api/sensor-data");
      if (response.ok) {
        const data = await response.json();
        setSensorData(data); // Update state with the latest sensor data
      } else {
        console.error("Failed to fetch sensor data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 1000); // Poll every second
    const handleResize = () => setWindowWidth(window.innerWidth); // Update window width on resize

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval); // Cleanup on unmount
      window.removeEventListener("resize", handleResize); // Remove resize listener
    };
  }, []);

  // Update product quantities based on IR sensors
  const updateProductQuantities = () => {
    return products.map((product) => {
      if (product.shelf === 4) {
        return {
          ...product,
          QuantityIR1: sensorData.ir1,
          QuantityIR2: sensorData.ir2,
          QuantityIR3: sensorData.ir3,
        };
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
          {/* Conditionally render the sidebar */}
          <div className={``}>
            <Sidebar />
          </div>
          <div
            className={`${windowWidth < 768 ? "col-12" : "col-md-10"}`}
            style={{ marginTop: "80px" }}
          >
            <h1 className="text-center mb-4">Shelf 3: Cold Drinks</h1>
            <div className="row justify-content-center">
              {updatedProducts.map((product) => (
                <>
                  <IRProductCard
                    product={product}
                    irIndex={1}
                    quantity={product.QuantityIR1}
                  />
                  <IRProductCard
                    product={product}
                    irIndex={2}
                    quantity={product.QuantityIR2}
                  />
                  <IRProductCard
                    product={product}
                    irIndex={3}
                    quantity={product.QuantityIR3}
                  />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
