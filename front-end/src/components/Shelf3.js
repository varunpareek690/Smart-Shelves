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
      Product: "Coca-Cola",
      Quantity: 0,
      Total: 3,
      Image1: "filled_bottle.jpg",
      Image0:"empty_bottle.png",
      shelf: 4,
    },
  ]);

  // Fetch sensor data from the API
  const fetchSensorData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/sensor-data");
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
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Calculate the quantity for each IR sensor
  const updateProductQuantities = () => {
    return products.map((product) => {
      if (product.shelf === 4) {
        // Return updated product with IR sensor-based quantity
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
          <div className="d-none d-md-block col-md-2">
            <Sidebar />
          </div>
          <div
            className={`${
              window.innerWidth < 768 ? "col-12" : "col-md-10"
            }`}
            style={{ marginTop: "80px" }}
          >
            <h1 className="text-center mb-4">Shelf 3 Products</h1>
            <div className="row justify-content-center">
              {updatedProducts.map((product, index) => {
                return (
                  <>
                    {/* Card for IR1 */}
                    <div
                      className="col-6 col-sm-4 col-md-3 mb-4"
                      key={`${index}-ir1`}
                    >
                      <div className="card h-100 text-center">
                        <img
                          src={product.QuantityIR1===1?`/images/${product.Image1}`:`/images/${product.Image0}`}
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
                            {product.Product} - 1
                          </h5>
                          <div className="progress-container" style={{ width: "100px" }}>
                            <CircularProgressbar
                              value={product.QuantityIR1===1?100:0}
                              text={`${product.QuantityIR1}`}
                              styles={buildStyles({
                                textColor: "black",
                                pathColor: "green",
                                trailColor: "lightgrey",
                              })}
                            />
                          </div>
                        </div>
                        {/* <div className="card-footer">
                          <p className="card-text">{`Quantity: ${product.QuantityIR1} / ${product.Total}`}</p>
                        </div> */}
                      </div>
                    </div>

                    {/* Card for IR2 */}
                    <div
                      className="col-6 col-sm-4 col-md-3 mb-4"
                      key={`${index}-ir2`}
                    >
                      <div className="card h-100 text-center">
                        <img
                          src={product.QuantityIR2===1?`/images/${product.Image1}`:`/images/${product.Image0}`}
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
                            {product.Product} - 2
                          </h5>
                          <div className="progress-container" style={{ width: "100px" }}>
                            <CircularProgressbar
                              value={product.QuantityIR2===1?100:0}
                              text={`${product.QuantityIR2}`}
                              styles={buildStyles({
                                textColor: "black",
                                pathColor: "green",
                                trailColor: "lightgrey",
                              })}
                            />
                          </div>
                        </div>
                        {/* <div className="card-footer">
                          <p className="card-text">{`Quantity: ${product.QuantityIR2} / ${product.Total}`}</p>
                        </div> */}
                      </div>
                    </div>

                    {/* Card for IR3 */}
                    <div
                      className="col-6 col-sm-4 col-md-3 mb-4"
                      key={`${index}-ir3`}
                    >
                      <div className="card h-100 text-center">
                        <img
                          src={product.QuantityIR3===1?`/images/${product.Image1}`:`/images/${product.Image0}`}
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
                            {product.Product} - 3
                          </h5>
                          <div className="progress-container" style={{ width: "100px" }}>
                            <CircularProgressbar
                              value={product.QuantityIR3===1?100:0}
                              text={`${product.QuantityIR3}`}
                              styles={buildStyles({
                                textColor: "black",
                                pathColor: "green",
                                trailColor: "lightgrey",
                              })}
                            />
                          </div>
                        </div>
                        {/* <div className="card-footer">
                          <p className="card-text">{`Quantity: ${product.QuantityIR3} / ${product.Total}`}</p>
                        </div> */}
                      </div>
                    </div>
                  </>
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
