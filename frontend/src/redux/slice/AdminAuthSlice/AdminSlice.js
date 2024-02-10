import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { AdminLoggedInApi, AdminLoginApi, AdminLogoutApi } from "../../../Api/AdminApis/AdminApi";

const initialState={
    adminlogin:[],
    adminLoggedInData:[],
    adminLoggedOutData:[],
    loading:false,
    error:null
}

// Call API using createAsyncThunk middleware (Don't need to install thunk already toolkit provide )
// POST MEthod -- Pass data
export const AdminAuthLogin = createAsyncThunk("AdminLogin", async(data)=>{
    try {
        const response = await AdminLoginApi(data);

        if(response.status === 200){
            console.log("2nd",response);
            toast.success("Admin Login Successfully");
            localStorage.setItem('adminToken', response.data.token);
            return response.data;               //Jo b data return kr rahe hai wo initialState me ja k save ho raha hai 
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// Admin LoogrdIn / Verify API
// GET Method --- Nod Data Pass
// thunkApi   --- It return an Object
export const AdminLoggedIn = createAsyncThunk("AdminLoggedIn", async(thunkApi)=>{
    try {
        const response = await AdminLoggedInApi();
        console.log("Hello Response", response.data.error);

        if(response.status === 200){
            return response.data;                   //Jo b data return kr rahe hai wo initialState me ja k save ho raha hai 
        }else{
            return thunkApi.rejectWithValue('error');
        }
    } catch (error) {
        throw error;
    }
});


export const AdminLogout = createAsyncThunk("AdminLogout", async(thunkApi)=>{
    try {
        console.log("INside logout");
        const response = await AdminLogoutApi();

        if(response.status === 200){
            toast.success("Admin Logout Successfully");
            localStorage.removeItem('adminToken');
            return response.data;               //Jo b data return kr rahe hai wo initialState me ja k save ho raha hai 
        }else{
            toast.success("Admin Logout Successfully");
            localStorage.removeItem('adminToken');
            return thunkApi.rejectWithValue('error');
        }
    } catch (error) {
        throw error;
    }
});

// Create a slice

export const AdminSlice = createSlice({
    name:"AdminSlice",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(AdminAuthLogin.pending,(state)=>{                  // yaha pr jo state hai us me initialState ki value aa rahi hai
            state.loading = true;
        })
        .addCase(AdminAuthLogin.fulfilled, (state,action)=>{
            state.loading = true;
            state.adminlogin = action.payload;
        })
        .addCase(AdminAuthLogin.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Admin LoggedIn Slice
        .addCase(AdminLoggedIn.pending,(state)=>{                
            state.loading = true;
        })
        .addCase(AdminLoggedIn.fulfilled, (state,action)=>{
            state.loading = true;
            state.adminLoggedInData = [action.payload];
        })
        .addCase(AdminLoggedIn.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

         // Admin Logged Out Slice
         .addCase(AdminLogout.pending,(state)=>{                  
            state.loading = true;
        })
        .addCase(AdminLogout.fulfilled, (state,action)=>{
            state.loading = true;
            state.adminLoggedOutData = [action.payload];
            state.adminLoggedInData = []
        })
        .addCase(AdminLogout.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});


export default AdminSlice.reducer;