import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { AddToCartApi, DecrementCartProductValueApi, deleteCartDataApi, RemoveCartItmeApi, UserCartDetailsApi } from "../../../Api/CartApis/CartApi";

const initialState={
    AddCartData:[],
    UserCartData:[],
    DecrementCartData:[],
    RemoveCartItmeData:[],
    deleteCartItem:[],
    loading:false,
    error:null
}

// Add to cart
export const AddToCart = createAsyncThunk("AddToCart", async(data)=>{
    // console.log("data=>", data);
    try {
        const response = await  AddToCartApi(data);
        if(response.status === 200){
            toast.success("Item successfully remove from cart");
            return response.data;             
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});


// Get Cart Details
export const UserCartDetails = createAsyncThunk("UserCartDetails", async(thunkApi)=>{
    try {
        const response = await  UserCartDetailsApi();
        if(response.status === 200){
            return response.data;             
        }else{
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
});


// Decrement cart Product Value
export const DecrementCartProductValue = createAsyncThunk("DecrementCartProductValue", async(data)=>{
    try {
        const response = await  DecrementCartProductValueApi(data);
        console.log("response", response);
        if(response.status === 200){
            toast.success(response.data.message);
            return response.data;             
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// Remove cart Item Value
export const RemoveCartItme = createAsyncThunk("RemoveCartItme", async(data)=>{
    try {
        const response = await RemoveCartItmeApi(data);
        console.log("response", response);
        if(response.status === 200){
            toast.success(response.data.message);
            return response.data;             
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// Delete Cart Details after payment Confirm
export const deleteCartData = createAsyncThunk("deleteCartData", async(thunkApi)=>{
    try {
        const response = await  deleteCartDataApi();
        if(response.status === 200){
            return response.data;             
        }else{
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
});



// Create a slice

export const CartSlice = createSlice({
    name:"CartSlice",
    initialState,
    extraReducers:(builder)=>{
        // User Add To cart SLice 
        builder.addCase(AddToCart.pending,(state)=>{                  // yaha pr jo state hai us me initialState ki value aa rahi hai
            state.loading = true;
        })
        .addCase(AddToCart.fulfilled, (state,action)=>{
            state.loading = true;
            state.AddCartData = action.payload;
        })
        .addCase(AddToCart.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Fetch Cart Data Slice
        .addCase(UserCartDetails.pending,(state)=>{                 
            state.loading = true;
        })
        .addCase(UserCartDetails.fulfilled, (state,action)=>{
            state.loading = true;
            state.UserCartData = action.payload;
        })
        .addCase(UserCartDetails.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Decfrement Cart Value Slice
        .addCase(DecrementCartProductValue.pending,(state)=>{                 
            state.loading = true;
        })
        .addCase(DecrementCartProductValue.fulfilled, (state,action)=>{
            state.loading = true;
            state.DecrementCartData = action.payload;
        })
        .addCase(DecrementCartProductValue.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

         // Remove Cart Item Slice
         .addCase(RemoveCartItme.pending,(state)=>{                 
            state.loading = true;
        })
        .addCase(RemoveCartItme.fulfilled, (state,action)=>{
            state.loading = true;
            state.RemoveCartItmeData = action.payload;
        })
        .addCase(RemoveCartItme.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Delete Cart Item Slice
        .addCase(deleteCartData.pending,(state)=>{                 
            state.loading = true;
        })
        .addCase(deleteCartData.fulfilled, (state,action)=>{
            state.loading = true;
            state.deleteCartItem = action.payload;
        })
        .addCase(deleteCartData.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        
        
    }
});


export default CartSlice.reducer;