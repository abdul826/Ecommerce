import { BASE_URL } from "../helper";
import { commonrequest } from "../Commonrequest";

// Admin Register Api Call
export const AdminRegisterApi = async(data,header)=>{
    return await commonrequest('POST', `${BASE_URL}/adminauth/api/register`,data,header,'admin');
}

// Admin login Api Call
export const AdminLoginApi = async(data,header)=>{
    return await commonrequest('POST', `${BASE_URL}/adminauth/api/login`,data,header,'admin');
}

// Admin loggedin/Verify Api Call
export const AdminLoggedInApi = async(header)=>{
    return await commonrequest('GET', `${BASE_URL}/adminauth/api/verifyadmin`,"",header,'admin');
}

// Admin loggedin/Verify Api Call
export const AdminLogoutApi = async(header)=>{
    return await commonrequest('GET', `${BASE_URL}/adminauth/api/logout`,"",header,'admin');
}

