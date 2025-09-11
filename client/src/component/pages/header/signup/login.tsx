import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

function Login() {
  const usernameRe = useRef<HTMLInputElement>(null);
  const passwordRe = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = usernameRe.current?.value || '';
    const password = passwordRe.current?.value || '';
    try {
      const response = await axios.post('https://backend-ecommerce-nodejs-production.up.railway.app/api/v1/auth/login', { email, password });
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Failed to login');
      } else {
        // Save token to localStorage
       /* localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.data?._id || response.data.user?._id || '');*/
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userId', response.data.data?._id || '');
        sessionStorage.setItem('role', response.data.data?.role || '');
        console.log(localStorage.getItem('userId'));
        console.log(localStorage.getItem('token'));

        console.log('Login successful');

        // Redirect based on role
        if (response.data.data?.role === 'admin') {
          navigate('/admin-dashboard'); 
        } else {
          navigate('/'); 
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="form-page">
      <div className="form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" className='username' ref={usernameRe} placeholder="username" />
          <input type="password" className='pass' ref={passwordRe} placeholder="password" />
          <div className="links">
            <a href="/signup">Don't have an account?</a><br />
            <a href="/forgetPassword">Forgot password?</a>
          </div>
          <button className='btn' type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;