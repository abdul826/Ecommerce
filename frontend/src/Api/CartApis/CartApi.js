import { BASE_URL } from "../helper";
import { commonrequest } from "../Commonrequest";

// Add To Cart Api Call
export const AddToCartApi = async(data,header)=>{
    return await commonrequest('POST', `${BASE_URL}/cart/api/addtocart/${data}`,{},header,'user');   // id pass krna hai but hm pura data hi pass kr diye us se id le lenge
}

// Get Cart Details APi Call
export const UserCartDetailsApi = async(data,header)=>{
    return await commonrequest('GET', `${BASE_URL}/cart/api/getcart`,{},header,'user');   
}

// Decrement Cart Product Value APi Call
export const DecrementCartProductValueApi = async(data,header)=>{
    return await commonrequest('DELETE', `${BASE_URL}/cart/api/removesingleitem/${data}`,{},header,'user');   // data me kewal id aa rahi hai is liye direct data likh diya
}

// Remove Cart Item APi Call
export const RemoveCartItmeApi = async(data,header)=>{
    return await commonrequest('DELETE', `${BASE_URL}/cart/api/removeallitem/${data}`,{},header,'user');   // data me kewal id aa rahi hai is liye direct data likh diya
}

// Delete Cart Item After payment APi Call
export const deleteCartDataApi = async(data,header)=>{
    return await commonrequest('DELETE', `${BASE_URL}/cart/api/deleteallcartitem`,{},header,'user');   // data me kewal id aa rahi hai is liye direct data likh diya
}


