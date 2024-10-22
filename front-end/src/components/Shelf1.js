import React from "react";
import products from "../products.json";  // Fetching products data from the JSON file
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import '../styles/App.css'; // Importing the CSS for the styles
import Navbar from './Navbar'; // Import the Navbar
import Sidebar from './Sidebar'; // Import the Sidebar

const Shelf1 = () => {
  // Filter products specifically for Shelf 1
  const shelfProducts = products.filter(product => product.Shelf === 1);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10" style={{ marginTop: '80px' }}>
            <div className="text-center"> {/* Centering the heading */}
              <h1>Shelf 1 Products</h1>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center"> {/* Centering the cards */}
              {shelfProducts.map((product, index) => {
                const percentage = Math.round((product.Quantity / product.Total) * 100);
                return (
                  <div className="col" key={index}>
                    <div className="card h-100">
                      <img
                        src={`/images/${product.Image}`}
                        alt={product.Product}
                        className="card-img-top mx-auto" // Center image horizontally
                        style={{ width: "100px", height: "100px" }}
                      />
                      <div className="card-body d-flex flex-column align-items-center">
                        <h5 className="card-title mb-3 text-center">{product.Product}</h5>
                        <div className="progress-container" style={{ width: '80px' }}>
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

                      <div className="card-footer text-center">
                        <p className="card-text">{`Weight: ${product.Weight}g | Quantity: ${product.Quantity} / ${product.Total}`}</p>
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

export default Shelf1;
