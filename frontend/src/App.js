import 'bootstrap/dist/css/bootstrap.min.css';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import Loader from './components/Loader/Loader';
import './App.css';

//User Routes Link 
import Layout from './layouts/Layout';
import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import Carts from './pages/Carts/Carts';
import UserProfile from './pages/UserProfile/UserProfile';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import Shipping from './pages/Shipping/Shipping';
import Checkout from './pages/Checkout/checkout';
import UserOrders from './pages/UserOrders/UserOrders';

// Admin Routes Link
import AdminCommonLayout from './pages/Admin/AdminCommonLayout';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProductspage from './pages/Admin/AdminProductsPage';
import AddProducts from './pages/Admin/AddProducts';
import AddCategory from './pages/Admin/AddCategory';
import Orders from './pages/Admin/Orders';
import Error from './pages/Error/Error';
import { Toaster } from 'react-hot-toast';
import Payment from './pages/Payment/Payment';
import UserProtectedRoute from './components/Protected/UserProtectedRoute.jsx';
import AdminProtectedRoute from './components/Protected/AdminProtectedRoute'
import { useEffect, useState } from 'react';

function App() {

  const stripePromise = loadStripe("enter your stripe key")
  
  const [spin, setSpin] = useState(true);


  useEffect(()=>{
    setTimeout(()=>{
      setSpin(false);
    },2000)
  },[]);
  
  return (
    
    <>
    {
      spin ? <Loader />
      :
      <Elements stripe={stripePromise}>
        <Routes>
          {/* Admin Routes */}
          <Route path='/admin/dashboard' element={<AdminCommonLayout ><AdminProtectedRoute Components={AdminDashboard} /></AdminCommonLayout>} />
          <Route path='/admin/products' element={<AdminCommonLayout >< AdminProtectedRoute Components={AdminProductspage} /></AdminCommonLayout>} />
          <Route path='/admin/addproducts' element={<AdminCommonLayout ><AdminProtectedRoute Components={AddProducts} /></AdminCommonLayout>} />
          <Route path='/admin/addcategory' element={<AdminCommonLayout ><AdminProtectedRoute Components={AddCategory} /></AdminCommonLayout>} />
          <Route path='/admin/orders' element={<AdminCommonLayout ><AdminProtectedRoute Components={Orders} /></AdminCommonLayout>} />
          <Route path='/admin/login' element={<AdminLogin />} />

          {/* User Route */}
          <Route path='/' element={<Layout><Home /></Layout>} />
          <Route path='/products' element={<Layout><ProductsPage /></Layout>} />
          <Route path='/products/:search' element={<Layout><ProductsPage /></Layout>} />
          <Route path='/productdetails/:id' element={<Layout><ProductDetailsPage /></Layout>} />
          <Route path='/carts' element={<Layout><UserProtectedRoute Components={Carts} /></Layout>} />
          <Route path='/userprofile' element={<Layout><UserProtectedRoute Components={UserProfile} /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/forgotpassword" element={<Layout><ForgotPassword /></Layout>} />
          <Route path="/resetpassword/:id/:token" element={<Layout><ResetPassword /></Layout>} />
          <Route path="/shipping" element={<Layout><UserProtectedRoute Components={Shipping} /></Layout>} />
          <Route path="/checkout" element={<Layout><UserProtectedRoute Components={Checkout} /></Layout>} />
          <Route path="/payment" element={<Layout><UserProtectedRoute Components={Payment} /></Layout>} />
          <Route path="/userorders" element={<Layout><UserProtectedRoute Components={UserOrders} /></Layout>} />
          <Route path="*" element={<Layout><Error /></Layout>} />
        </Routes>
        <Toaster />
      </Elements>
    }
      
     </>
  );
}

export default App;
