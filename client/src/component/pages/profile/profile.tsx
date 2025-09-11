import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../nav/navbar';
import axios from 'axios';
import { cartcontext } from '../../context/contextProvider';
import './style.css';

function Profile({username}) {
  // Example user data (replace with real data from context or API)
  const { cart } = useContext(cartcontext);
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    image: "",
    totalOrders: 0,
    balance: 0,
    favourites: []
  });

  useEffect(() => {
    // This effect can be used to fetch user data if needed
   const fetchUserData = async () => {
     const userId = sessionStorage.getItem("userId");
    if (!userId) return; 
      try{
  
        // const response = await axios.get('http://localhost:5000/api/v1/user/689fee957ec7f712b3fa9350')
        const response = await axios.get(`https://backend-ecommerce-nodejs-production.up.railway.app/api/v1/user/${sessionStorage.getItem('userId')}`);
        const user = response.data;
        setUser(user);

      }
      catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  // google token & data
  useEffect(() => {
  const fetchGoogleUser = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const googleUser = queryParams.get("user");

      if (googleUser) {
        const parsedUser = JSON.parse(decodeURIComponent(googleUser));

        console.log("Google Access Token:", parsedUser.token);

        setUser(parsedUser);
        sessionStorage.setItem("googleUser", googleUser);

        sessionStorage.setItem("userId", parsedUser.id || parsedUser.email);
        sessionStorage.setItem("token", parsedUser.token);
        sessionStorage.getItem('token')

        // طلب بيانات إضافية من Google API
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
            headers: {
              Authorization: `Bearer ${parsedUser.token}`,
            },
          }
        );

          console.log("Fresh user info:", res.data);
          console.log("google user toke:", res.data.token);

        }
      } catch (err) {
        console.error("Error fetching Google user info:", err);
      }
    };

    fetchGoogleUser();
  }, [location.search]);


 

  const handellogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');

    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')
    console.log(sessionStorage,localStorage);
    
    window.location.href = '/';
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-img">
            <img src={user.image || "/default-avatar.png"} alt="Profile" />
          </div>
          <div className="profile-info">
           <h2>Hello, {user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <Link className="profile-link" to="/forgetPassword">forget password?</Link>
          </div>
          <div className="profile-data">
            <div className="profile-stat">
              <span className="stat-label">Total Orders: {cart.length}</span>
              <span className="stat-value">{user.totalOrders}</span>
            </div>
            <div className="profile-stat">
              <span className="stat-label">Balance</span>
              <span className="stat-value">${[cart.length * 100 * 200/100].sort()}</span>
            </div>
            <div className="profile-stat">
              <div className="stat-label">Favourites:
                 <div className="card"> shose</div></div>
              <ul className="favourites-list">
                {/* {user.favourites.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))} */}
              </ul>
            </div>
            <div className='logout'>
              <button type="button" className='logout-link' onClick={handellogout}>logout</button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;