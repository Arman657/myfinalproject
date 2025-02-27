import React, { useEffect, useState } from 'react'
import "./App.css";
import {BrowserRouter,Routes,Route, useNavigate} from "react-router-dom";
import {LoginPage,SignupPage,ActivationPage,HomePage, ProductsPage,BestSellingPage,EventsPage,FAQPage,ProductDetailsPage,ProfilePage,CheckoutPage,PaymentPage,ShopCreatePage,SellerActivationPage,ShopLoginPage, OrderSuccessPage, OrderDetailsPage, TrackOrderPage, UserInbox,} from "./routes/Routes.js";
import { ToastContainer,toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store.js';
import { loadSeller, loadUser } from './redux/actions/user.js';
import { useSelector } from 'react-redux';
import ProtectedRoute from "./routes/ProtectedRoute";
import {ShopHomePage} from "./ShopRoutes.js"
import SellerProtectedRoute from "./routes/SellerProtectedRoute";

import {ShopAllCoupouns, ShopAllEvents, ShopAllOrders, ShopAllProducts, ShopAllRefunds, ShopCreateEvents, ShopCreateProduct, ShopDashboardPage, ShopInboxPage, ShopOrderDetails, ShopPreviewPage, ShopSettingsPage, ShopWithDrawMoneyPage} from "./routes/ShopRoutes";
import axios from 'axios';
import { server } from './server.js';
import { getAllProducts } from './redux/actions/product.js';
import { getAllEvents } from './redux/actions/event.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const App = () => {
  // const [stripeApikey,setStripeApiKey] = useState("");

  // async function getStripeApiKey(){
  //     const {data} = await axios.get(`${server}/payment/stripeapiKey`);
  //     setStripeApiKey(data.stripeApikey);
 
  // }
// useEffect(()=>{
//   axios.get(`${server}/user/getuser`,{withCredentials:true}).then((res)=>{
//     toast.success(res.data.message);
//   }).catch((err)=>{
//     toast.error(err.response.data.message);
//   })
// },[]);


  useEffect(()=>{
   Store.dispatch(loadUser());
   Store.dispatch(loadSeller());
   Store.dispatch(getAllProducts());
   Store.dispatch(getAllEvents());
  //  getStripeApiKey();
  
  },[])
  // console.log(isSeller,seller);
  return (
   <>
   
      <BrowserRouter>

      {/* {
        stripeApikey && (
          <Elements stripe={loadStripe(stripeApikey)}>
            <Routes>
         
           
            
            </Routes>
          </Elements>
        )
      } */}
   
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/sign-up' element={<SignupPage/>}/>
        <Route path='/activation/:activation_token' element={<ActivationPage/>}/>
        <Route path='/seller/activation/:activation_token' element={<SellerActivationPage/>}/>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/product/:id'element={<ProductDetailsPage/>}/>
        <Route path='/best-selling' element={<BestSellingPage/>}/>
        <Route path='/events' element={<EventsPage/>}/>
        <Route path='/faq' element={<FAQPage/>}/>
        <Route path='/payment' element={<PaymentPage/>}/>
       
        <Route path='/order/success' element={<OrderSuccessPage/>}/>


        <Route path='/shop/preview/:id' element={<ShopPreviewPage/>}/>

{/* seller routes */}
        <Route path='/shop-create' element={<ShopCreatePage/>}/>
        <Route path='/shop-login' element={<ShopLoginPage/>}/>
        <Route path='/shop/:id' element={
          <SellerProtectedRoute>
            <ShopHomePage/>
          //</SellerProtectedRoute>
        }/>

<Route path='/settings' element={
          <SellerProtectedRoute>
            <ShopSettingsPage/>
          //</SellerProtectedRoute>
        }/>
        <Route path='/dashboard' element={
          <SellerProtectedRoute>
            <ShopDashboardPage/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard-create-product' element={
          <SellerProtectedRoute>
            <ShopCreateProduct/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard-products' element={
          <SellerProtectedRoute>
            <ShopAllProducts/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard-orders' element={
          <SellerProtectedRoute>
            <ShopAllOrders/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard-refunds' element={
          <SellerProtectedRoute>
            <ShopAllRefunds/>
          </SellerProtectedRoute>
        }/>
        <Route path='/order/:id' element={
          <SellerProtectedRoute>
            <ShopOrderDetails/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard-create-event' element={
          <SellerProtectedRoute>
            <ShopCreateEvents/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard-events' element={
          <SellerProtectedRoute>
            <ShopAllEvents/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard-coupouns' element={
          <SellerProtectedRoute>
            <ShopAllCoupouns/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard-withdraw-money' element={
          <SellerProtectedRoute>
            <ShopWithDrawMoneyPage/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard-messages' element={
          <SellerProtectedRoute>
            <ShopInboxPage/>
          </SellerProtectedRoute>
        }/>

        <Route path='/checkout' element={
          <ProtectedRoute>
            <CheckoutPage/>
          </ProtectedRoute>
        }/>

        <Route path='/profile' element={
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>
        }/>

        <Route path='/inbox' element={
          <ProtectedRoute>
            <UserInbox/>
          </ProtectedRoute>
        }/>

        <Route path='/user/order/:id' element={
          <ProtectedRoute>
            <OrderDetailsPage/>
          </ProtectedRoute>
        }/>

<Route path='/user/track/order/:id' element={
          <ProtectedRoute>
            <TrackOrderPage/>
          </ProtectedRoute>
        }/>
        {/* <Route path='/order/success/:id'element={<OrderSuccessPage/>}/> */}
      </Routes>
      <ToastContainer
  position="bottom-center"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick={false}
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
  transition={Bounce}
  />
      </BrowserRouter>
   </>
  )
}

export default App