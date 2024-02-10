import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { dleteUserByAdminApi, forgotPasswordApi, forgotPasswordVerifyApi, getAllUserApi, ResetPasswordApi, userContactApi, UserLoginApi, UserLogoutApi, UserRegisterApi, UserVerifyApi } from "../../../Api/UserApis/UserApi";

const initialState={
    getAllUserData:[],
    registerUserData:[],
    loginUserData:[],
    UserVerifyData:[],
    UserLogoutData:[],
    forgotPAsswordLink:[],
    ResetPasswordData:[],
    forgotPasswordVerifyData:[],
    DeleteUserData :[],
    userContactData:[],
    loading:false,
    error:null
}

export const UserRegister = createAsyncThunk("UserRegister", async(data)=>{
    try {
        const response = await UserRegisterApi(data.data,data.config);

        if(response.status === 200){
            toast.success("User Register Successfully");
            return response.data;               //Jo b data return kr rahe hai wo initialState me ja k save ho raha hai 
        }else{
            toast.error("error");
        }
    } catch (error) {
        throw error;
    }
});

export const UserLogin = createAsyncThunk("UserLogin", async(data)=>{
    try {
        const response = await UserLoginApi(data);

        if(response.status === 200){
            console.log(response);
            toast.success("User login Successfully");
            localStorage.setItem('userToken', response.data.token)
            return response.data;               //Jo b data return kr rahe hai wo initialState me ja k save ho raha hai 
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// User Verify
export const UserVerify = createAsyncThunk("UserVerify", async(thunkApi)=>{
    try {
        const response = await UserVerifyApi();
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

// User Logout
export const UserLogout = createAsyncThunk("UserLogout", async(thunkApi)=>{
    try {
        const response = await  UserLogoutApi();
        // console.log(response);
        if(response.status === 200){
            toast.success("User Logout Successfully");
            localStorage.removeItem("userToken");
            return response.data;             
        }else{
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
});


// User Forgot Password
export const forgotPassword = createAsyncThunk("forgotPassword", async(data)=>{
    try {
        const response = await  forgotPasswordApi(data);
        // console.log(response);
        if(response.status === 200){
            toast.success("Password reset link send to the emali.Please Check");
            return response.data;             
        }else{
            return toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// User Forgot Password Verify
export const forgotPasswordValid = createAsyncThunk("forgotPasswordValid", async(data)=>{
    try {
        const response = await  forgotPasswordVerifyApi(data);
        if(response.status === 200){
            console.log(response.data);
            return response.data;             
        }else{
            return toast.error("Your Link has expired.Please Generate New Link");
        }
    } catch (error) {
        throw error;
    }
});

// User Forgot Password Verify
export const ResetPasswordFun = createAsyncThunk("ResetPasswordFun", async(data)=>{
    console.log("data=>", data);
    try {
        const response = await  ResetPasswordApi(data);
        console.log("response", response);
        if(response.status === 200){
            toast.success("Password Update Successfully");
            return response.data;             
        }else{
            return toast.error("Your Link has expired.Please Generate New Link");
        }
    } catch (error) {
        throw error;
    }
});

// Get All User By Admin
export const getAllUser = createAsyncThunk("getAllUser", async(data)=>{
    try {
        const response = await  getAllUserApi(data);
        // console.log("User Record", response);
        if(response.status === 200){
            return response.data;             
        }else{
            return toast.error("Error in Fetching User Record");
        }
    } catch (error) {
        throw error;
    }
});

// Get All User
export const dleteUserByAdmin = createAsyncThunk("dleteUserByAdmin", async(data)=>{
    try {
        const response = await dleteUserByAdminApi(data);
        if(response.status === 200){
            toast.success("User Delete Successfully");
            return response.data;             
        }else{
            return toast.error("Error in Deleting User Record");
        }
    } catch (error) {
        throw error;
    }
});

// Contact Form 
export const userContact = createAsyncThunk("userContact", async(data)=>{
    try {
        const response = await  userContactApi(data);
        // console.log("User Record", response);
        if(response.status === 200){
            toast.success("Message Send Successfully")
            return response.data;             
        }else{
            return toast.error("Error,Message Not Send");
        }
    } catch (error) {
        throw error;
    }
});

// Create a slice

export const UserSlice = createSlice({
    name:"UserSlice",
    initialState,
    extraReducers:(builder)=>{

        // GEt all USer SLice
        builder.addCase(getAllUser.pending,(state)=>{                  // yaha pr jo state hai us me initialState ki value aa rahi hai
            state.loading = true;
        })
        .addCase(getAllUser.fulfilled, (state,action)=>{
            state.loading = true;
            state.getAllUserData = action.payload;
        })
        .addCase(getAllUser.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // User Register 
        .addCase(UserRegister.pending,(state)=>{                  // yaha pr jo state hai us me initialState ki value aa rahi hai
            state.loading = true;
        })
        .addCase(UserRegister.fulfilled, (state,action)=>{
            state.loading = true;
            state.registerUserData = action.payload;
        })
        .addCase(UserRegister.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // User Login 
        .addCase(UserLogin.pending,(state)=>{                  // yaha pr jo state hai us me initialState ki value aa rahi hai
            state.loading = true;
        })
        .addCase(UserLogin.fulfilled, (state,action)=>{
            state.loading = true;
            state.loginUserData = action.payload;
        })
        .addCase(UserLogin.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // User Verify 
        .addCase(UserVerify.pending,(state)=>{             
            state.loading = true;
        })
        .addCase(UserVerify.fulfilled, (state,action)=>{
            state.loading = true;
            state.UserVerifyData = [action.payload];
        })
        .addCase(UserVerify.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // User Logout 
        .addCase(UserLogout.pending,(state)=>{                  
            state.loading = true;
        })
        .addCase(UserLogout.fulfilled, (state,action)=>{
            state.loading = true;
            state.UserLogoutData = [action.payload]
            state.UserVerifyData = [];                         // jb user logout ho jayega us time pr UserVerifyData ki value ko blank kr denge 
        })
        .addCase(UserLogout.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // User Forgot Password 
        .addCase(forgotPassword.pending,(state)=>{             
            state.loading = true;
        })
        .addCase(forgotPassword.fulfilled, (state,action)=>{
            state.loading = true;
            state.forgotPAsswordLink = action.payload;
        })
        .addCase(forgotPassword.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

         // User Forgot Password Verify
         .addCase(forgotPasswordValid.pending,(state)=>{             
            state.loading = true;
        })
        .addCase(forgotPasswordValid.fulfilled, (state,action)=>{
            state.loading = true;
            state.forgotPasswordVerifyData = action.payload;
        })
        .addCase(forgotPasswordValid.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // User Reset Password 
        .addCase(ResetPasswordFun.pending,(state)=>{             
            state.loading = true;
        })
        .addCase(ResetPasswordFun.fulfilled, (state,action)=>{
            state.loading = true;
            state.ResetPasswordData = action.payload;
        })
        .addCase(ResetPasswordFun.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

         // Delete User
         .addCase(dleteUserByAdmin.pending,(state)=>{             
            state.loading = true;
        })
        .addCase(dleteUserByAdmin.fulfilled, (state,action)=>{
            state.loading = true;
            state.DeleteUserData = [action.payload];
        })
        .addCase(dleteUserByAdmin.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

          // userContact User
          .addCase(userContact.pending,(state)=>{             
            state.loading = true;
        })
        .addCase(userContact.fulfilled, (state,action)=>{
            state.loading = true;
            state.userContactData = action.payload;
        })
        .addCase(userContact.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

    }
});


export default UserSlice.reducer;