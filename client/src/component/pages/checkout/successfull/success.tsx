import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";

// تعريف نوع الطلب
interface Order {
  _id: string;
  Amount: number;
  expiryDate: string;
  creditNumber: string;
  createdAt: string;
}

const Success: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);

  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get<Order[]>(
        "https://backend-ecommerce-nodejs-production.up.railway.app/api/v1/order",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.length > 0) {
        // هنا بناخد آخر طلب
        const latestOrder = res.data[res.data.length - 1];
        setOrder(latestOrder);
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
        <svg viewBox="0 0 52 52">
          <circle
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke="#28a745"
            strokeWidth="2"
          />
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
        Thank you for your purchase. Your payment has been processed and your
        order is confirmed.
      </p>
      <Link to="/">Go to Home</Link>

      {order && (
        <div className="success-details">
          <div>
            <span className="label">Order ID:</span>
            <span className="value">{order._id}</span>
          </div>
          <div>
            <span className="label">Amount:</span>
            <span className="value">${order.Amount}</span>
          </div>
          <div>
            <span className="label">Credit Card:</span>
            <span className="value">{order.creditNumber}</span>
          </div>
          <div>
            <span className="label">Expiry Date:</span>
            <span className="value">{order.expiryDate}</span>
          </div>
          <div>
            <span className="label">Created At:</span>
            <span className="value">{new Date(order.createdAt).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Success;
