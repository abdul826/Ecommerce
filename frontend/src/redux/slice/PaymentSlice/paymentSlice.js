import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { stripePaymentApi } from "../../../Api/PaymentApis/PaymentApi";

const initialState={
    PaymentData:[],
    loading:false,
    error:null
}

export const stripePayment = createAsyncThunk("stripePayment", async(data)=>{
    try {
        const response = await stripePaymentApi(data);

        if(response.status === 200){
            return response.data;               //Jo b data return kr rahe hai wo initialState me ja k save ho raha hai 
        }else{
            toast.error("error");
        }
    } catch (error) {
        throw error;
    }
});


// Create a slice

export const PaymentSlice = createSlice({
    name:"PaymentSlice",
    initialState,
    extraReducers:(builder)=>{

        builder.addCase(stripePayment.pending,(state)=>{                  // yaha pr jo state hai us me initialState ki value aa rahi hai
            state.loading = true;
        })
        .addCase(stripePayment.fulfilled, (state,action)=>{
            state.loading = true;
            state.PaymentData = action.payload;
        })
        .addCase(stripePayment.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

    }
});


export default PaymentSlice.reducer;