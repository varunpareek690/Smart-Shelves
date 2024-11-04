import React from "react";
import products from "../products.json";  // Fetching products data from the JSON file
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import '../styles/App.css'; // Importing the CSS for the styles
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Shelf3 = () => {
  // Filter products specifically for Shelf 3
  const shelfProducts = products.filter(product => product.Shelf === 3);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10" style={{ marginTop: '80px' }}>
            <h1>Shelf 3 Products</h1>
            <div className="product-list row row-cols-1 row-cols-md-3 g-4">
              {shelfProducts.map((product, index) => {
                const percentage = Math.round((product.Quantity / product.Total) * 100);
                return (
                  <div className="col" key={index}>
                    <div className="card h-100">
                      <img
                        src={`/images/${product.Image}`}
                        alt={product.Product}
                        className="card-img-top"
                        style={{ width: "100px", height: "100px", margin: "auto" }}
                      />
                      <div className="card-body d-flex flex-column align-items-center">
                        <h5 className="card-title mb-3">{product.Product}</h5>
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

export default Shelf3;
