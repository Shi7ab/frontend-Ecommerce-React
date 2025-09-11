// import { useState } from "react";
import Navbar from "../../nav/navbar";
import Products from "../../products/products";
import Footer from "../footer/Footer";
import './service.css';

function Service( ) {
    // const [prd,setPrd] = useState([])
    // let prodname = ["shose","jaket","T-shirt","Short"];
    
    //  prodname.forEach((p)=>{ return
    //   <p>{p}</p>});

    return (
        <div>
           <Navbar/>
           <div className="service" >
            <h1 style={{textAlign:"center",color:"#111"}}>Shopping List</h1> 
            {/* <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}> */}
            <Products />
            </div>
              <Footer />
        </div>
        // </div>
    );
}

export default Service;