import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import products from "./products.json"; // Import the JSON file
import './styles/App.css'; // Import the App.css file for styling

const App = () => {
  return (
    <div className="product-container"> {/* Use class for the container */}
      <h1>Product Inventory</h1>
      <div className="product-list"> {/* Class for the product listing */}
        {products.map((product, index) => {
          const percentage = Math.round((product.Quantity / product.Total) * 100);
          return (
            <div className="product-card" key={index}> {/* Use class for each product card */}
              <img
                src={`/images/${product.Image}`} // Adjust the path for your image files
                alt={product.Product}
                style={{ width: "100px", height: "100px" }}
              />
              <h2>{product.Product}</h2>
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  textColor: "black",
                  pathColor: "green",
                  trailColor: "lightgrey",
                })}
              />
              <p>{product.Quantity} / {product.Total}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
