import React, { useRef } from "react";
import './verify.css'

function VerifyOtp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);

  // Request OTP
  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;

    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/v1/otp-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      alert(data.message || "OTP sent!");
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    }
  };

  // Verify OTP
  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const otp = otpRef.current?.value;

    if (!email || !otp) {
      alert("Enter both email & OTP");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/v1/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      alert(data.message || "Verification done!");
    } catch (err) {
      console.error(err);
      alert("Error verifying OTP");
    }
  };

  return (
    <div className="otp-container">
      <form onSubmit={sendEmail} className="otp-form">
        <input
          type="email"
          ref={emailRef}
          placeholder="Enter your email"
          className="otp-input"
        />
        <button type="submit" className="otp-btn">
          Request OTP
        </button>
      </form>

      <form onSubmit={verifyOtp} className="otp-form">
        <input
          type="text"
          ref={otpRef}
          placeholder="Enter OTP"
          className="otp-input"
        />
        <button type="submit" className="otp-btn">
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default VerifyOtp;