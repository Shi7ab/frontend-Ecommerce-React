"use client";
import Home from './component/pages/Home';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Service from './component/pages/header/Service/service';
import About from './component/pages/header/about/about';
import Cart from './component/pages/header/cartItem/cart';
import Contact from './component/pages/header/contact/contact.jsx';
import './App.css';
import ContextProvider from './component/context/contextProvider';
import Payment from './component/pages/checkout/payment/payment.js';
import Customer from './component/pages/checkout/customer/customer.js';
import Success from './component/pages/checkout/successfull/success.js';
import Profile from './component/pages/profile/profile';
import ForgetPassword from './component/pages/header/forgetPassword/forgetPassword';
import Login from './component/pages/header/signup/login.tsx';
import Signup from './component/pages/header/signup/signup.tsx'
import Category from './component/pages/category/category.tsx';
import VerfiyOtp from './component/pages/header/signup/auth/verfiyotp.tsx';
import Dashbard from './component/pages/admin/pages/dashboard/dashbard.tsx';
import Users from './component/pages/admin/pages/users/users.tsx';
import MangeProduct from './component/pages/admin/pages/mange product/mangeProduct.tsx';


 
// import Shop from './component/pages/Servece/shop';

 

function App() {
  // const movinum = 1;
  return (
    
      <ContextProvider>
      
      <BrowserRouter>
        <Routes>  
        <Route path="/service" element={<Service/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        
        <Route path='/Category' element={<Category/>}/>
         
        <Route path='/profile' element={<Profile/>}/>
        {/* <Route path='/shop' element={<Shop/>}/> */}
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/checkout' element={<Customer/>}/>
        <Route path='/checkout/payment' element={<Payment/>}/>
        <Route path='/checkout/success/:id' element={<Success/>}/>
        <Route path='/forgetPassword' element={<ForgetPassword/>}/>
        <Route path='/verfiy-otp' element={<VerfiyOtp/>}/>


        <Route path='/admin-dashboard' element={<Dashbard/>}/>
        <Route path='/admin-dashboard/users' element={<Users/>}/>
        <Route path='/admin-dashboard/products' element={<MangeProduct/>}/>

        

        
         
        {/* <Route path='/changePassword' element={<ChangePassword/>}/> */}
        </Routes>
      </BrowserRouter>
      </ContextProvider>
       
    
    
  );
}

export default App;     