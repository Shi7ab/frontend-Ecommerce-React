import Navbar from "../../nav/navbar";
import banermg from '../../../../assets/deal_ofthe_week.18a6bbdf.png'
import Footer from "../footer/Footer";
import './about.css'

function About( ) {
    return (
        <div>
            <Navbar/>
               <div className="title-section">
                    <h1>About</h1>
                    <div className="about">
                    <img src={banermg} alt="" />
                
                    <h1>About</h1>
                    </div>
                </div>
                    <p className="about-text" style={{fontSize:"20px",fontFamily:"monospace",textAlign:"center",padding:"15px"}}>
                        Welcome to our eCommerce store! We are dedicated to providing you with the best shopping experience possible. Our mission is to offer a wide range of high-quality products at affordable prices, ensuring that you find exactly what you need. 
                        Our team is passionate about curating a selection of items that cater to your needs and preferences. Whether you're looking for the latest fashion trends, electronics, home goods, or unique gifts, we've got you covered. We believe in exceptional customer service and strive to make your shopping journey enjoyable and hassle-free.
                        Thank you for choosing us as your shopping destination. We look forward to serving you and helping you find the perfect products that suit your style and needs.    
                    </p>
                <Footer />
        </div>
    );
}

export default About;