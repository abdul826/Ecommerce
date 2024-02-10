import { BASE_URL } from "../helper";
import { commonrequest } from "../Commonrequest";

// Add Category Api Call
export const AddCategoryApi = async(data,header)=>{
    return await commonrequest('POST', `${BASE_URL}/product/api/addcategory`,data,header,'admin');
}

// fetch Category Api Call
export const GetCategoryApi = async(header)=>{
    return await commonrequest('GET', `${BASE_URL}/product/api/getcategory`,"",header,'admin');
}

// Add PRoduct Api Call
export const AddProductApi = async(data,categoryId,header)=>{
    return await commonrequest('POST', `${BASE_URL}/product/api/addproduct?categoryid=${categoryId}`,data,header,'admin');
}

// Fetch All PRoduct Api Call
export const FetchAllProductsApi = async(data,header)=>{
    console.log("FetchAllProductsApi=>", data.search);

    return await commonrequest('GET', `${BASE_URL}/product/api/getallproducts?categoryid=${data.selectedcategory}&page=${data.page}&search=${data.search}`,"",header,'user');
    // if(data.selectedcategory){
    //     return await commonrequest('GET', `${BASE_URL}/product/api/getallproducts?categoryid=${data.selectedcategory}&page=${data.page}?search=${data.search}`,"",header,'admin');
    // }
    // else{
    //     return await commonrequest('GET', `${BASE_URL}/product/api/getallproducts?search=${data.search}&page=${data.page}`,"",header,'user');
    // }
    
}

// Fetch LAtest PRoduct Api Call ----- For User
export const FetchLatestProductsApi = async(data,header)=>{
    return await commonrequest('GET', `${BASE_URL}/product/api/getLatestproduct`,{},header,'user');
}

// Delete Api Call
export const DeleteProductApi = async(data,header)=>{
    return await commonrequest('DELETE', `${BASE_URL}/product/api/deleteproduct/${data.productid}`,{},header,'admin');
}

// Fetch Single Product Api Call ----- For User
export const FetchSingleProductApi = async(data,header)=>{
    console.log(data);
    return await commonrequest('GET', `${BASE_URL}/product/api/getsingleproduct/${data.productid}`,"",header,'user');
}

// Review Product Api Call ----- For User
export const AddProductReviewApi = async(data,header)=>{
    return await commonrequest('POST', `${BASE_URL}/product/api/productreview/${data.productid}`,data.data,header,'user');
}

// Fetch Product Review Api Call ----- For User
export const FetchProductReviewApi = async(data,header)=>{
    return await commonrequest('GET', `${BASE_URL}/product/api/getproductreview/${data.productid}`,{},header,'user');
}

// Delete Product Review Api Call ----- For User
export const DeleteProductReviewApi = async(data,header)=>{
    return await commonrequest('DELETE', `${BASE_URL}/product/api/deleteproductreview/${data.reviewid}`,{},header,'user');
}



