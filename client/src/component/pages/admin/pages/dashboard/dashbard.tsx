import React from 'react';
import Category from '../../../category/category';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './style.css'

function Dashbard() {

  const navigate = useNavigate();

  // نجيب بيانات المستخدم من sessionStorage
  const role = sessionStorage.getItem("role");
  const username = sessionStorage.getItem("userId"); // تقدر تخزن username وقت الـ login

  const logout =()=>{
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('toke')
    sessionStorage.removeItem('userId')
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
 
    console.log(sessionStorage,localStorage);
    
    window.location.href = '/'

  }

  // لو الزول ما admin رجعو للصفحة الرئيسية
  if (role !== "admin") {
    navigate("/");
    return null;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard 🚀</h1>
        <p>Welcome, {username}</p>
        <button type="button" className='logout' onClick={logout}>log-out</button>
      </header>

      <main className="admin-main">
        <div className="card">
          <h3><Link to="/admin-dashboard/users">👤 Manage Users</Link></h3>
          <p>View, update, and delete users.</p>
        </div>

        <div className="card">
          <h3><Link to="/admin-dashboard/products">📦 Manage Products</Link></h3>
          <p>Add new products or edit existing ones.</p>
        </div>

        <div className="card">
          <h3>📊 Reports</h3>
          <p>View system reports and statistics.</p>
        </div>
      </main>
    </div>
  );
}
 

      

export default Dashbard;