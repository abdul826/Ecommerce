import { BASE_URL } from "../helper";
import { commonrequest } from "../Commonrequest";

// User register Api Call
export const UserRegisterApi = async(data,header)=>{
    return await commonrequest('POST', `${BASE_URL}/user/api/register`,data,header,'user');
}

// User Login Api Call
export const UserLoginApi = async(data,header)=>{
    return await commonrequest('POST', `${BASE_URL}/user/api/login`,data,header,'user');
}

// User Verify Api Call
export const UserVerifyApi = async(header)=>{
    return await commonrequest('GET', `${BASE_URL}/user/api/userLoggedin`,"",header,'user');
}

// User Logout Api Call
export const UserLogoutApi = async(header)=>{
    return await commonrequest('GET', `${BASE_URL}/user/api/logout`,"",header,'user');
}

// User Forget Password Api Call
export const forgotPasswordApi = async(data,header)=>{
    return await commonrequest('POST', `${BASE_URL}/user/api/forgotepassword`,data,header,'user');
}

// User Forget Password Verify Api Call
export const forgotPasswordVerifyApi = async(data,header)=>{
    return await commonrequest('GET', `${BASE_URL}/user/api/forgotepassword/${data.id}/${data.token}`,"",header,'user');
}

// User Forget Password Verify Api Call
export const ResetPasswordApi = async(data,header)=>{
    // console.log("padwordData=>", data.password);
    return await commonrequest('PUT', `${BASE_URL}/user/api/resetepassword/${data.id}/${data.token}`,data.passworddata,header,'user');
}

// Fetch USer By Admin Api Call
export const getAllUserApi = async(data,header)=>{
    return await commonrequest('GET', `${BASE_URL}/adminauth/api/getalluser?page=${data.page}`,"",header,'admin');
}

// Delete User By Admin Api Call
export const dleteUserByAdminApi = async(data,header)=>{
    return await commonrequest('DELETE', `${BASE_URL}/adminauth/api/deleteuser/${data.userid}`,{},header,'admin');
}

// Delete User By Admin Api Call
export const userContactApi = async(data,header)=>{
    return await commonrequest('POST', `${BASE_URL}/user/api/usercontact`,data,header,'user');
}
