import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { forgotPasswordValid, ResetPasswordFun } from '../../redux/slice/UserAuthSlice/UserAuthSlice';

const ResetPassword = () => {

    const [password,setpassword] = useState("");
    const [confirmpassword,setconfirmpassword] = useState("");

    const {id,token} = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userValid = ()=>{
       const data = {
            id,token
        }

        dispatch(forgotPasswordValid(data))
        .then((res)=>{
            console.log(res);
            if(res.payload.message === 'Valid USer'){
                console.log("User Verify");
            }else{
                navigate('*')
            }
        }).catch((error)=>{
            navigate('*')
        })
    }

    const handleSubmit = (e) => { 
        e.preventDefault()
        if (password === "") {
            toast.error("password is Required !")
        } else if (confirmpassword === "") {
            toast.error("confirmpassword is Required !")
        }else if(password !== confirmpassword){
            toast.error("password and confirmpassword!")
        }else{
            const passworddata = {password};
            const data = {
                id,token,passworddata
            }

            dispatch(ResetPasswordFun(data))
            .then((res)=>{
                console.log("Res", res);
                if(res.payload){
                    navigate("/login")
                }else{
                    navigate("*")
                }
            }).catch((error)=>{
               
                    navigate("*")
                
            })
        }
       
    }

    useEffect(()=>{
        userValid()
    },[])

    return (
        <>
           <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter New Password</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Enter NewPassword</label>
                            <input type="password"  name="password" onChange={(e)=>setpassword(e.target.value)}  />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Confirm Password</label>
                            <input type="password"  name="confirmpassword" onChange={(e)=>setconfirmpassword(e.target.value)} />
                        </div>

                        <button className='btn' onClick={handleSubmit}>Update Password</button>
                        
                    </form>
                </div>
            </section>
        </>
    )
}

export default ResetPassword