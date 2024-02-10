import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/slice/UserAuthSlice/UserAuthSlice';

// import toast from 'react-hot-toast';

const ForgotPassword = () => {

    const [email,setEmail] = useState();

    const dispatch = useDispatch();

    const handleChange = (e)=>{
        setEmail(e.target.value);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(email === ''){
            toast.error("Email is required");
        }else if(!email.includes('@')){
            toast.error('Incorrect Email ID');
        }else{
            // Email ko direct dispatcg me pass nahi kr sakte us ko object me convert kr k pass krna hoga
            const data = {
                email:email
            }

            dispatch(forgotPassword(data))
            .then((res)=>{
                if(res?.payload){
                    setEmail("")
                }
            }).catch((error)=>{
                console.log(error);
                console.log("Error =>", error);
            })
        }
    }
    
  return (
    <>
          <section style={{marginBottom:"10%"}}>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>ForgotPassword</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} name="email" id="email" onChange={handleChange} placeholder='Enter Your Email Address' />
                        </div>

                        <button className='btn' onClick={handleSubmit}>Submit</button>
                        
                    </form>
                </div>
            </section>
    </>
  )
}

export default ForgotPassword