
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const name = nameRef.current?.value || '';
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/signup', {
        email,
        password,
        name,
      });
      if (response.status === 201 || response.status === 200) {
      /*  localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.data?._id || '');
        localStorage.setItem('username', response.data.data?.name || name); */
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userId', response.data.data?._id || '');
        sessionStorage.setItem('username', response.data.data?.name || name);
        navigate('/');
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
     window.location.href = 'http://localhost:5000/api/v1/auth/google';
     
  };

  return (
    <div className="form-page">
      <div className="form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" className="username" ref={nameRef} placeholder="Name" />
          <input type="email" className="username" ref={emailRef} placeholder="Email" />
          <input type="password" className="pass" ref={passwordRef} placeholder="Password" />
            <input type="password" className="pass" placeholder="Confirm Password" />
            <div className="checkbox">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>
            <a href="/login" className="link">Already have an account?</a>
          <button className="btn" type="submit">Sign Up</button>
        </form>
          <div style={{ marginTop: '1.0rem', width: '', textAlign: 'center' }}>
                  <button
                className="google-btn"
                type="button"
                onClick={handleGoogleLogin}
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  style={{ width: 20, marginRight: 8, verticalAlign: 'middle' }}
                />
                Sign up with Google
              </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;