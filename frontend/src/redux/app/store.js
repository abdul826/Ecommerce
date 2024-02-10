import {configureStore} from '@reduxjs/toolkit';
import AdminSlice from '../slice/AdminAuthSlice/AdminSlice';
import ProductSlice from '../slice/productSlice/productSlice';
import UserSlice from '../slice/UserAuthSlice/UserAuthSlice';
import CartSlice from '../slice/CartSlice/CartSlice';
import PaymentSlice  from '../slice/PaymentSlice/paymentSlice';
import OrderSlice  from '../slice/OrderSlice/orderSlice';

export const store = configureStore({
    reducer:{
        Admin:AdminSlice,
        Product:ProductSlice,
        User:UserSlice,
        Cart:CartSlice,
        Payment:PaymentSlice,
        Orders:OrderSlice,
    }
});