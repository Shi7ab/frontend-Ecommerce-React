import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./payment.css";

const Payment: React.FC = () => {
  const [card, setCard] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [Amount, setAmount] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [cardType, setCardType] = useState<"visa" | "mastercard" | "paypal">("visa");

  const navigate = useNavigate();

  const cardRef = useRef<HTMLInputElement>(null);
  const expiryRef = useRef<HTMLInputElement>(null);
  const cvvRef = useRef<HTMLInputElement>(null);
  const AmountRef = useRef<HTMLInputElement>(null);

  const validateFields = (): boolean => {
    if (!card.trim() || !expiry.trim() || !cvv.trim() || !Amount.trim() || !cardType) {
      toast.error("All fields are required");
      return false;
    }
    if (!/^\d+$/.test(card) || card.length < 12 || card.length > 19) {
      toast.error("Card number must be 12-19 digits");
      return false;
    }
    if (!["visa", "mastercard", "paypal"].includes(cardType)) {
      toast.error("Please select a valid card type");
      return false;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(Amount) || Number(Amount) <= 0) {
      toast.error("Amount must be a positive number");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      toast.error("Expiry must be in MM/YY format");
      return false;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      toast.error("CVV must be 3 or 4 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      setShowModal(true);
    }
  };

  const handleConfirmPay = async () => {
    setShowModal(false);
    try {
      const response = await axios.post(
        "https://backend-ecommerce-nodejs-production.up.railway.app/api/v1/order/",
        {
          creditNumber: card,
          Amount: Number(Amount), // رقم مش string
          expiryDate: expiry,
          cvv: cvv,
        }
      );

      // backend بيرجع order object, نتأكد من الـ id
      const order = response.data;
      const orderId = order?._id;

      toast.success("Payment Successful!");
      setTimeout(() => {
        if (orderId) {
          navigate(`/checkout/success/${orderId}`);
        } else {
          navigate("/checkout/success");
        }
      }, 1500);
    } catch (error) {
      toast.error("Payment failed!");
      console.error("Payment error:", error);
    }
  };

  const handleCancelPay = () => {
    setShowModal(false);
    toast.info("Payment cancelled");
  };

  return (
    <div className="payment-container">
      <ToastContainer />
      <h1>Payment Page</h1>
      <form className="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="card">Card Number</label>
        <input
          id="card"
          type="text"
          placeholder="Credit Card Number"
          ref={cardRef}
          value={card}
          onChange={(e) => setCard(e.target.value)}
        />

        <label htmlFor="cardType">Card Type</label>
        <select
          className="payment-select"
          value={cardType}
          onChange={(e) => setCardType(e.target.value as "visa" | "mastercard" | "paypal")}
        >
          <option value="visa">Visa</option>
          <option value="mastercard">MasterCard</option>
          <option value="paypal">Paypal</option>
        </select>

        <label htmlFor="Amount">Amount</label>
        <input
          id="Amount"
          type="text"
          placeholder="Amount"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
          ref={AmountRef}
        />

        <label htmlFor="expiry">Expiry Date</label>
        <input
          id="expiry"
          type="text"
          placeholder="MM/YY"
          ref={expiryRef}
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />

        <label htmlFor="cvv">CVV</label>
        <input
          id="cvv"
          type="password"
          placeholder="CVV"
          ref={cvvRef}
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />

        <input type="submit" value="Pay Now" />
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Payment</h2>
            <p>Are you sure you want to proceed with the payment?</p>
            <div className="modal-actions">
              <button className="modal-btn confirm" onClick={handleConfirmPay}>
                Yes, Pay
              </button>
              <button className="modal-btn cancel" onClick={handleCancelPay}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
