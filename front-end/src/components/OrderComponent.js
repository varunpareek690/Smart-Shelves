import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const OrderPage = styled.div`
  width: 100%;
  padding: 40px;
  text-align: center;
  color: #000;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 1.2rem;
  margin-bottom: 5px;
  text-align: left;
  margin-left: 5%;
  color: #fff;
`;

const Select = styled.select`
  width: 90%;
  max-width: 400px;
  padding: 15px;
  border: none;
  border-radius: 5px;
  margin-top: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1rem;
  transition: background 0.3s, transform 0.2s;
  appearance: none;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

const InputField = styled.input`
  width: 90%;
  max-width: 400px;
  padding: 15px;
  border: none;
  border-radius: 5px;
  margin-top: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

const SubmitButton = styled.button`
  background-color: #ff4081;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  width: 90%;
  max-width: 400px;
  font-size: 1.2rem;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background-color: #ff79b0;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

const OrderHistoryTable = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 20px auto;
  overflow-x: auto; /* Makes the table horizontally scrollable on small screens */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.1);
  text-align: left;
`;

const TableHeader = styled.th`
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const TableCell = styled.td`
  padding: 10px;
  color: #fff;
`;

const OrderComponent = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [retailerEmail, setRetailerEmail] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    axios
      .get("http://192.168.88.137:8000/api/product-available")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);

  const fetchOrderHistory = () => {
    axios
      .get("http://192.168.88.137:8000/api/order-history")
      .then((response) => setOrderHistory(response.data))
      .catch((error) => console.error("Failed to fetch order history:", error));
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const handleProductChange = (e) => {
    const productName = e.target.value;
    const selected = products.find((product) => product.Product === productName);
    setSelectedProduct(productName);
    setProductDetails(selected || {});
    setQuantity(1);
  };

  const handlePlaceOrder = () => {
    if (!selectedProduct || quantity <= 0 || !retailerEmail) {
      alert("Please fill in all fields correctly.");
      return;
    }

    axios
      .post("http://192.168.88.137:8000/api/place-order", {
        productName: selectedProduct,
        quantity,
        retailerEmail,
      })
      .then((response) => {
        alert(response.data.message);
        setQuantity(1);
        setRetailerEmail("");
        fetchOrderHistory();
      })
      .catch((error) => console.error("Failed to place order:", error));
  };

  return (
    <OrderPage>
      <Title>Place Your Order</Title>
      <FormGroup>
        <Label htmlFor="product">Select Product:</Label>
        <Select id="product" value={selectedProduct} onChange={handleProductChange}>
          <option value="">-- Select a Product --</option>
          {products.map((product, index) => (
            <option key={index} value={product.Product}>
              {product.Product}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="quantity">Quantity:</Label>
        <InputField
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          max={productDetails.Quantity}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="retailerEmail">Retailer Email:</Label>
        <InputField
          type="email"
          id="retailerEmail"
          value={retailerEmail}
          onChange={(e) => setRetailerEmail(e.target.value)}
        />
      </FormGroup>
      <SubmitButton onClick={handlePlaceOrder}>Place Order</SubmitButton>

      <Title>Order History</Title>
      <OrderHistoryTable>
        <Table>
          <thead>
            <tr>
              <TableHeader>Product Name</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Retailer Email</TableHeader>
              <TableHeader>Date</TableHeader>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.retailerEmail}</TableCell>
                <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </OrderHistoryTable>
    </OrderPage>
  );
};

export default OrderComponent;
