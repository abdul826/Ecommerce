import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { UserLogin } from '../../redux/slice/UserAuthSlice/UserAuthSlice';
import "./commonsignStyle.scss";

const Login = () => {
    const [passShow, setPassShow] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInpval({ ...inpval, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = inpval;

        if (email === "") {
            toast.error("Email is Required !")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        } else if (password === "") {
            toast.error("password is Required !")
        } else {

            dispatch(UserLogin(inpval))
                .then((res) => {
                    console.log("Resss", res)
                    // dispatch(loginuser())
                    if (res.payload !== undefined) {
                        navigate("/")
                    }
                }).catch((err) => {
                    console.log("err", err)
                })
        }
    }


    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign In</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={handleChange} id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={handleChange} name="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={handleSubmit}>Login</button>
                        <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink> </p>
                        <p style={{ color: "black", fontWeight: "bold" }}>Forgot Password  <NavLink to="/forgotpassword">Click Here</NavLink> </p>
                    </form>
                    <h3 style={{textAlign:"center"}}>OR</h3>
                </div>
            </section>
        </>
    )
}

export default Login