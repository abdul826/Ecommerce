import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useStripe, useElements, CardElement, CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import './Payment.scss';
import { stripePayment } from '../../redux/slice/PaymentSlice/paymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Order } from '../../redux/slice/OrderSlice/orderSlice';
import { toast } from 'react-hot-toast';
import { deleteCartData } from '../../redux/slice/CartSlice/CartSlice';

const Payment = () => {

    const {PaymentData} = useSelector((state)=> state.Payment);

    const { UserVerifyData } = useSelector((state) => state.User);;

    const {state} = useLocation();

    console.log("state", state);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe();     // iska use jb final payment karenge tb public key aur other data ko get krne k liye hoga
    const elements = useElements(); // iska use hm card ki details jo b hai un ki vlaue get krne k liye krte hai ex: card CV,16-Digit number

    const order = {
      ...state
    }

    const handleSubmit = (e)=>{
      e.preventDefault();

      const paymemtamount = {
        totalamount: state.totalPrice * 100   // always multiply by 100 when u do payment in "INR" because it takes the value in decimal 
      }

      // Dispatch the payment 
      dispatch(stripePayment(paymemtamount))
    }

    // Final payment when we get the public key
    const finalPayment = async()=>{
      const result = await stripe.confirmCardPayment(PaymentData, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: UserVerifyData[0]?.firstname,
            email:UserVerifyData[0]?.email,
            phone: state.mobile,
            address: {
              line1: state.address,
              city: state.city,
              state: state.state,
              postal_code: state.pincode,
              country: state.country,
            },
          },
        },

      });

      // Once the payment Integration done we have to run Add Order api
      if (result.paymentIntent?.status === "succeeded") {
        order.paymentdetails = {
            paymentid: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };
        
        dispatch(Order(order)).then((res)=>{
            dispatch(deleteCartData())
           navigate("/userorders"); 
        }).catch((error)=>{
            console.log("error",error)
        })
    }else{
        toast.error("Enter All Details")
    }
}

    useEffect(()=>{
      if(PaymentData.length > 0){
          finalPayment();
      }
    },[PaymentData])

  return (
    <>
       <section className='sectionset'>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter Card Details</h1>
                    </div>
                    <form>
                        <div className="form_inputs mb-2">
                            <CardNumberElement />
                        </div>
                        <div className="form_inputs mb-2">

                            <CardExpiryElement  />

                        </div>
                        <div className="form_inputs">

                            <CardCvcElement />

                        </div>


                        <button className='btn' onClick={handleSubmit}>send</button>

                    </form>
                </div>
            </section>
    </>
  )
}

export default Payment