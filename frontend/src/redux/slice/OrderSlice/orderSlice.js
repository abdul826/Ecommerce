import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { fetchOrderDetailsApi, addOrderApi, fetchOrderByAdminApi, OrderUpdateStatusApi } from "../../../Api/OrderApis/orderApi";
// import { stripePaymentApi } from "../../../Api/PaymentApis/PaymentApi";

const initialState={
    addOrderData:[],
    fetchOrderDetailsData:[],
    fetchOrderByAdminData:[],
    OrderUpdateData:[],
    loading:false,
    error:null
}

// Add Order
export const Order = createAsyncThunk("Order", async(data)=>{
    try {
        console.log("data =>", data);
        const response = await addOrderApi(data);
        console.log("Order Response =>", response);
        if(response.status === 200){
            toast.success("Payment Completed Successfully");
            return response.data;               //Jo b data return kr rahe hai wo initialState me ja k save ho raha hai 
        }else{
            toast.error("error");
        }
    } catch (error) {
        throw error;
    }
});

// Fetch Order Details -- User
export const fetchOrderDetails = createAsyncThunk("fetchOrderDetails", async(thunkApi)=>{
    try {
        // console.log("data =>", data);
        const response = await fetchOrderDetailsApi();
        if(response.status === 200){
            return response.data;               //Jo b data return kr rahe hai wo initialState me ja k save ho raha hai 
        }else{
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
});

// Fetch Order Details -- Admin
export const fetchOrderByAdmin = createAsyncThunk("fetchOrderByAdmin", async(thunkApi)=>{
    try {
        // console.log("data =>", data);
        const response = await fetchOrderByAdminApi();
        if(response.status === 200){
            return response.data;               //Jo b data return kr rahe hai wo initialState me ja k save ho raha hai 
        }else{
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
});

// Update Order Details -- Admin
export const OrderUpdateStatus = createAsyncThunk("OrderUpdateStatus", async(data)=>{
    try {
        // console.log("data =>", data);
        const response = await OrderUpdateStatusApi(data);
        if(response.status === 200){
            toast.success("Order Status Updated");
            return response.data;            
        }else{
            return toast.error("error");
        }
    } catch (error) {
        throw error;
    }
});



// Create a slice

export const OrderSlice = createSlice({
    name:"OrderSlice",
    initialState,
    extraReducers:(builder)=>{
        // Add Order Slice
        builder.addCase(Order.pending,(state)=>{                  // yaha pr jo state hai us me initialState ki value aa rahi hai
            state.loading = true;
        })
        .addCase(Order.fulfilled, (state,action)=>{
            state.loading = true;
            state.addOrderData = action.payload;
        })
        .addCase(Order.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Fetch User Order Slice
        .addCase(fetchOrderDetails.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchOrderDetails.fulfilled, (state,action)=>{
            state.loading = true;
            state.fetchOrderDetailsData = action.payload;
        })
        .addCase(fetchOrderDetails.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Fetch Admin Order Slice
        .addCase(fetchOrderByAdmin.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchOrderByAdmin.fulfilled, (state,action)=>{
            state.loading = true;
            state.fetchOrderByAdminData = action.payload;
        })
        .addCase(fetchOrderByAdmin.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Update Admin Order Slice
        .addCase(OrderUpdateStatus.pending,(state)=>{
            state.loading = true;
        })
        .addCase(OrderUpdateStatus.fulfilled, (state,action)=>{
            state.loading = true;
            state.OrderUpdateData = [action.payload];
        })
        .addCase(OrderUpdateStatus.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

    }
});


export default OrderSlice.reducer;