import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { AddCategoryApi, AddProductApi, AddProductReviewApi, DeleteProductApi, DeleteProductReviewApi, FetchAllProductsApi, FetchLatestProductsApi, FetchProductReviewApi, FetchSingleProductApi, GetCategoryApi } from "../../../Api/ProductApis/ProductApi";

const initialState={
    addCategoryData:[],
    CategoryData:[],
    AddProducts:[],
    ProductsData:[],
    LatestProduct:[],
    DeleteProduct:[],
    SingleProduct:[],
    AddReview:[],
    FetchReview:[],
    DeleteReviewData:[],
    loading:false,
    error:null
}

export const AdminAddCategory = createAsyncThunk("AdminAddCategory", async(data)=>{
    try {
        const response = await AddCategoryApi(data);

        if(response.status === 200){
            toast.success("Product DeletedSuccessfully");
            return response.data;               //Jo b data return kr rahe hai wo initialState me ja k save ho raha hai 
        }else{
            toast.error("error");
        }
    } catch (error) {
        throw error;
    }
});

// Fetch CAtegory
export const AdminGetCategory = createAsyncThunk("AdminGetCategory", async(thunkApi)=>{
    try {
        const response = await GetCategoryApi();

        if(response.status === 200){
            return response.data;               //Jo b data return kr rahe hai wo initialState me ja k save ho raha hai 
        }else{
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
});

// Add Product API
export const AdminAddProducts = createAsyncThunk("AdminAddProducts", async(data)=>{
    try {
        const response = await AddProductApi(data.data,data.categoryId,data.config);

        if(response.status === 200){
            toast.success("Product Added Successfully");
            return response.data;               //Jo b data return kr rahe hai wo initialState me ja k save ho raha hai 
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// Fetch All Products API
export const AdminFetchAllProducts = createAsyncThunk("AdminFetchAllProducts", async(data)=>{
    try {
        console.log("AllProduct=>", data.search);
        const response = await FetchAllProductsApi(data);
        // console.log(response);
        if(response.status === 200){
            return response.data;              
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// Fetch LAtest Products API (On USer Side)
export const getLatestProducts = createAsyncThunk("getLatestProducts", async(thunkApi)=>{
    try {
        const response = await FetchLatestProductsApi();
        // console.log(response);
        if(response.status === 200){
            return response.data;              
        }else{
            return thunkApi.rejectWithValue("error");
            
        }
    } catch (error) {
        throw error;
    }
});

// Delete Products API
export const AdminDeleteProduct = createAsyncThunk("AdminDeleteProduct", async(data)=>{
    try {
        const response = await DeleteProductApi(data);
        // console.log(response);
        if(response.status === 200){
            return response.data;              
        }else{
            toast.error("error");
        }
    } catch (error) {
        throw error;
    }
});

// Fetch Singlel Products API --- User
export const FetchSingleProduct = createAsyncThunk("FetchSingleProduct", async(data)=>{
    try {
        console.log(data);
        const response = await FetchSingleProductApi(data);
        // console.log(response);
        if(response.status === 200){
            return response.data;              
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// Review Products API --- User
export const AddProductReview = createAsyncThunk("AddProductReview", async(data)=>{
    try {
        console.log(data);
        const response = await AddProductReviewApi(data);
        // console.log(response);
        if(response.status === 200){
            toast.success("Review Added Successfully");
            return response.data;              
        }else{
            toast.error("error");
        }
    } catch (error) {
        throw error;
    }
});

// Fetch Products Review API --- User
export const GetProductReview = createAsyncThunk("GetProductReview", async(data)=>{
    try {
        const response = await FetchProductReviewApi(data);
        // console.log(response);
        if(response.status === 200){
            return response.data;              
        }else{
            toast.error("error");
        }
    } catch (error) {
        throw error;
    }
});

// Delete Products Review API --- User
export const deleteReview = createAsyncThunk("deleteReview", async(data)=>{
    try {
        const response = await DeleteProductReviewApi(data);
        // console.log(response);
        if(response.status === 200){
            toast.success("Review Deleted Successfully")
            return response.data;              
        }else{
            toast.error("error");
        }
    } catch (error) {
        throw error;
    }
});


// Create a slice
// Note: Jb data object k form me milega tb action.payload ko array bracket me likhna hai else normal likhna hai kyo ki data array k formate me milega
export const ProductSlice = createSlice({
    name:"ProductSlice",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(AdminAddCategory.pending,(state)=>{                  // yaha pr jo state hai us me initialState ki value aa rahi hai
            state.loading = true;
        })
        .addCase(AdminAddCategory.fulfilled, (state,action)=>{
            state.loading = true;
            state.addCategoryData = action.payload;
        })
        .addCase(AdminAddCategory.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Get Category SLice
        .addCase(AdminGetCategory.pending,(state)=>{                  // yaha pr jo state hai us me initialState ki value aa rahi hai
            state.loading = true;
        })
        .addCase(AdminGetCategory.fulfilled, (state,action)=>{
            state.loading = true;
            state.CategoryData = action.payload;
        })
        .addCase(AdminGetCategory.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Add Products
        // Get Category SLice
        .addCase(AdminAddProducts.pending,(state)=>{                  // yaha pr jo state hai us me initialState ki value aa rahi hai
            state.loading = true;
        })
        .addCase(AdminAddProducts.fulfilled, (state,action)=>{
            state.loading = true;
            state.AddProducts = action.payload;
        })
        .addCase(AdminAddProducts.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

         // Fetch All Products
        .addCase(AdminFetchAllProducts.pending,(state)=>{
            state.loading = true;
        })
        .addCase(AdminFetchAllProducts.fulfilled, (state,action)=>{
            state.loading = true;
            state.ProductsData = action.payload;
        })
        .addCase(AdminFetchAllProducts.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Latest Product
        .addCase(getLatestProducts.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getLatestProducts.fulfilled, (state,action)=>{
            state.loading = true;
            state.LatestProduct = action.payload;
        })
        .addCase(getLatestProducts.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Delete Product
        .addCase(AdminDeleteProduct.pending,(state)=>{
            state.loading = true;
        })
        .addCase(AdminDeleteProduct.fulfilled, (state,action)=>{
            state.loading = true;
            state.DeleteProduct = [action.payload];
        })
        .addCase(AdminDeleteProduct.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Fetch Single Product 
        .addCase(FetchSingleProduct.pending,(state)=>{
            state.loading = true;
        })
        .addCase(FetchSingleProduct.fulfilled, (state,action)=>{
            state.loading = true;
            state.SingleProduct = [action.payload];
        })
        .addCase(FetchSingleProduct.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Add Product Review 
        .addCase(AddProductReview.pending,(state)=>{
            state.loading = true;
        })
        .addCase(AddProductReview.fulfilled, (state,action)=>{
            state.loading = true;
            state.AddReview = [action.payload];
        })
        .addCase(AddProductReview.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Get Product Review 
        .addCase(GetProductReview.pending,(state)=>{
            state.loading = true;
        })
        .addCase(GetProductReview.fulfilled, (state,action)=>{
            state.loading = true;
            state.FetchReview = action.payload;
        })
        .addCase(GetProductReview.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

          // Delete Product Review 
        .addCase(deleteReview.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteReview.fulfilled, (state,action)=>{
            state.loading = true;
            state.DeleteReviewData = [action.payload];
        })
        .addCase(deleteReview.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        
    }
});


export default ProductSlice.reducer;