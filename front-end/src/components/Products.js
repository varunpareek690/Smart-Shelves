import React from "react";
import products from "../GodownProducts.json";
import '../styles/Products.css'; // Import CSS file for product card styling
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Products = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10 products-container" style={{ marginTop: '20px' }}>
            <h1>Available Products</h1>
            <div className="products-list row row-cols-1 row-cols-md-3 g-2">
              {products.map((product, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card h-100">
                    <img
                      src={`/images/${product.Image}`}
                      alt={product.Product}
                      className="card-img-top"
                      style={{ width: "100px", height: "100px", margin: "auto" }}
                    />
                    <div className="card-body text-center">
                      <h2 className="card-title">{product.Product}</h2>
                      <p className="card-text">Weight: {product.Weight}g</p>
                      <p className="card-text">Quantity: {product.Quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
