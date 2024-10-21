import React from 'react';
import '../styles/Products.css'; // Import CSS file for product card styling

const Products = () => {
    // Product list data
    const products = [
        {
            Product: "Colgate Toothpaste",
            Weight: 100,
            Image: "colgate.png",
            Quantity: 50
        },
        {
            Product: "Tata Salt",
            Weight: 1000,
            Image: "tata_salt.png",
            Quantity: 75
        },
        {
            Product: "Basmati Rice",
            Weight: 5000,
            Image: "basmati_rice.png",
            Quantity: 30
        },
        {
            Product: "Vim Dishwasher",
            Weight: 500,
            Image: "vim.png",
            Quantity: 60
        },
        {
            Product: "Nescafe Jar",
            Weight: 250,
            Image: "nescafe.png",
            Quantity: 40
        },
        {
            Product: "Lifebuoy Soap",
            Weight: 125,
            Image: "lifebuoy.png",
            Quantity: 90
        },
        {
            Product: "Dettol Soap",
            Weight: 125,
            Image: "dettol.png",
            Quantity: 85
        },
        {
            Product: "Boroplus Cream",
            Weight: 50,
            Image: "boroplus.png",
            Quantity: 55
        },
        {
            Product: "Ponds Cream",
            Weight: 100,
            Image: "ponds.png",
            Quantity: 65
        }
    ];

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
