import React from 'react';
// import CollectionSection from '../../Section/section';
import Footer from './../footer/footer';
import "./Contact.css"; 
import { Link } from 'react-router-dom';
const Contact = () => {
 
    
  return (
    <>
      <div className="contact-container">
        
      <h2> Contact Us</h2>
      <div className="contact-info">
        <div>
           <span>+123 456 7890</span>
        </div>
        <div>
            <span>support@ecommerce.com</span>
        </div>
        <div>
           <span>123 Shop Street, City, Country</span>
        </div>
      </div>

      <form  className="contact-form">
        <input type="text" name="name" placeholder="Your Name"  required />
        <input type="email" name="email" placeholder="Your Email"   required />
        <textarea name="message" placeholder="Your Message"  required></textarea>
        <input type="text" name="subject" placeholder="Subject"  required />
         
        <Link to="/">Privacy Policy</Link>
        <button type="submit">Send Message</button>
      </form>
      </div>
        <Footer />
      </>
  );
};

export default Contact;
