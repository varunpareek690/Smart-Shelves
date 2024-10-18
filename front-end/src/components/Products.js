import React from 'react';
import products from "../GodownProducts.json";
import '../styles/Products.css'; // Import CSS file for product card styling

const Products = () => {
    return (
        <div className="products-container">
            <h1>Available Products</h1>
            <div className="products-list">
                {products.map((product, index) => (
                    <div className="product-card" key={index}>
                        <img
                            src={`/images/${product.Image}`}
                            alt={product.Product}
                            className="product-image"
                        />
                        <h2 className="product-name">{product.Product}</h2>
                        <p className="product-weight">Weight: {product.Weight}g</p>
                        <p className="product-quantity">Quantity: {product.Quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
