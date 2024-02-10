import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { AdminAuthLogin } from '../../redux/slice/AdminAuthSlice/AdminSlice';
import {useDispatch} from 'react-redux'
// import "./commonsignStyle.scss";

const AdminLogin = () => {
    const [passShow, setPassShow] = useState(false);

    const [inputVal,setInputVal] = useState({
        email:"",
        password:""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name,value} = e.target;

        setInputVal({
            ...inputVal,
            [name]:value
        });

    }
    const handleSubmit = (e)=>{
        e.preventDefault();   
        
        const {email,password} = inputVal;

        if(email === ''){
            toast.error("Email is Required")
        }else if(!email.includes('@')){
            toast.error('Enter valid email')
        }else if(password === ''){
            toast.error('Password is required');
        }else{
                dispatch(AdminAuthLogin(inputVal))
                .then((res)=>{
                    if(res.payload.token){
                        navigate('/admin/dashboard');
                    }else{
                        navigate('/admin/login');
                    }
                }).catch((error)=>{
                    console.log("Error=>", error);
                })     
        }
    }

    return (
        <>
            <section>
                <div className="form_data" style={{marginTop: '100px',}}>
                    <div className="form_heading">
                        <h1>Admin Sign In</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={handleChange} id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"}  onChange={handleChange} name="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={handleSubmit}>Login</button>
                        <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink> </p>
                        <p style={{ color: "black", fontWeight: "bold" }}>Forgot Password  <NavLink to="/forgotpassword">Click Here</NavLink> </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default AdminLogin