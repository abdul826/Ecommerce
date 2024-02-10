import { BASE_URL } from "../helper";
import { commonrequest } from "../Commonrequest";

// Add Order Api Call
export const addOrderApi = async(data,header)=>{
    return await commonrequest('POST', `${BASE_URL}/order/api/addorders`,data,header,'user');
}


// Fetch Order Api Call---- USer
export const fetchOrderDetailsApi = async(data,header)=>{
    return await commonrequest('GET', `${BASE_URL}/order/api/getuserorders`,"",header,'user');
}

// Fetch Order Api Call---- Admin
export const fetchOrderByAdminApi = async(data,header)=>{
    return await commonrequest('GET', `${BASE_URL}/order/api/orders`,"",header,'admin');
}

// Update Order Api Call---- Admin
export const OrderUpdateStatusApi = async(data,header)=>{
    return await commonrequest('PUT', `${BASE_URL}/order/api/orders/${data.orderid}`,data,header,'admin');
}




