import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    try {
      await axios.post('https://backend-ecommerce-nodejs-production.up.railway.app/api/v1/auth/forgot-password', { email });
      setOtpSent(true);
      toast.success('OTP sent to your email!');
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    }
  };

  return (
    <div className="form-page">
      <ToastContainer />
      <div className="form">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSendOtp}>
          <input
            type="email"
            className="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="btn" type="submit">Send OTP</button>
        </form>
        {otpSent && <p style={{ color: 'green', marginTop: '1rem' }}>Check your email for the OTP.</p>}
      </div>
    </div>
  );
};

export default ForgetPassword;