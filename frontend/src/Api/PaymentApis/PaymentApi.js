import { BASE_URL } from "../helper";
import { commonrequest } from "../Commonrequest";

// User register Api Call
export const stripePaymentApi = async(data,header)=>{
    return await commonrequest('POST', `${BASE_URL}/checkout/api/payment`,data,header,'user');
}

