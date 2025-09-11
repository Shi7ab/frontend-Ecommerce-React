import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./style.css";

const Success = () => {
    const [orderId, setOrderId] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [Amount, setAmount] = useState('');
    const [creditNumber, setCreditNumber] = useState('');
    const [createdAt, setCreatedAt] = useState('');
   const fetchOrderDetails = async () => {
    try {
        const res = await axios.get("http://localhost:5000/api/v1/order", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        });

        // Assuming backend returns an array of orders
        if (res.data.length > 0) {
        const order = res.data._id;
        console.log(order);

        setOrderId(order._id);
        setAmount(order.Amount);
        setExpiryDate(order.expiryDate);
        setCreditNumber(order.creditNumber);
        setCreatedAt(order.createdAt);
        } else {
        console.log("No orders found");
        }
    } catch (error) {
        console.error("Error fetching order details:", error);
    }
    };

    useEffect(() => {
        fetchOrderDetails();
    }, []);
  return (
    <div className="success-container">
      <div className="success-icon">
        {/* Animated checkmark SVG */}
        <svg viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="25" fill="none" stroke="#28a745" strokeWidth="2"/>
          <path
            fill="none"
            stroke="#28a745"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 27l7 7 16-16"
          />
        </svg>
      </div>
      <h2>Payment Successful!</h2>
      <p>
        Thank you for your purchase. Your payment has been processed and your order is confirmed.
      </p>
      <Link to="/">Go to Home</Link>
      <div className="success-details">
        <div>
          <span className="label">Order ID:</span>
          <span className="value">{orderId}</span>
        </div>
        <div>
          <span className="label">Amount:</span>
          <span className="value">${Amount}</span>
        <div>
            <span className="label">Credit Card:</span>
            <span className="value">{creditNumber}</span>
        </div>
        </div>
        <div>
          <span className="label">Date:</span>
          <span className="value">{expiryDate}</span>
        </div>
           <div>
          <span className="label">createdAt:</span>
          <span className="value">{createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default Success;