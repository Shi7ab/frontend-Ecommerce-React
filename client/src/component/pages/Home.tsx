import {  useState,useEffect } from 'react';
// import AlertDismissible from '../pages/alert';
import  Navbar from './nav/navbar';
import Baner from './baner/baner';
import Products from './products/products';
import CollectionSection from './Section/section';
import Footer from './header//footer/Footer';
import axios from 'axios';
// import './home.css'


function Home() {
   const [pagnation, setpagnation] = useState(1)

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/products');
      console.log(response.data);
       setpagnation(response.data.currentPage)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);


    return (
        <>
        
           <div className="contaner">
           <Navbar/>
            
           <Baner/>
           <div style={{color:"#111",fontSize:"large",fontFamily:"monospace",textAlign:"center",padding:"15px"}}><h1>POPULAR SHOSE</h1></div>
           <Products/>
           <CollectionSection/>
           <div className='' style={{backgroundColor:"#111",color:"white",padding:"50px 0",textAlign:"center",fontFamily:"monospace"}}>
            <p>New collection</p>
            <h1>Be different in your own way!</h1>
            <h3>find your collection</h3>
            <button className='btn' style={{padding:"4px",margin:"10px"}}>SHOP</button>
           </div>
           </div>
           <div style={{display:"block",justifyContent:"center",alignItems:"center"}}>
           <div style={{color:"#111",fontSize:"large",fontFamily:"monospace",textAlign:"center",padding:"15px"}}><h1>Best Saler Items</h1></div>
           <Products/>
             <div className="pagnation" style={{display:'flex',justifyContent:'center',padding:'4px'}}>
              <button onClick={()=>pagnation + 1} style={{backgroundColor:"black",color:'white',padding:'2px',border:'none',cursor:'pointer'}}>next</button>
              <p style={{padding:'4px'}}>{pagnation}</p>
              <button onClick={()=>pagnation - 1} style={{backgroundColor:"black",color:'white',padding:'2px',border:'none',cursor:'pointer'}}>previous</button>
            </div>
           </div>
          <Footer/>
        </ >
    );
}

export default Home;