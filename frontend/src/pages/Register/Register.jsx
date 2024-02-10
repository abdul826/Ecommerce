import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom"
import { UserRegister } from '../../redux/slice/UserAuthSlice/UserAuthSlice';



const Register = () => {

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inputVal, setInputVal] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: ""
    });

    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");

    // profile set
    const setProfile = (e) => {
        setImage(e.target.files[0])
    }

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setInputVal({
            ...inputVal,
            [name]:value
        })
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();

        const {firstname,lastname,email,password,confirmpassword} = inputVal;

        if (firstname === "") {
            toast.error("First name is Required !")
          } else if (lastname === "") {
            toast.error("Last name is Required !")
          } else if (email === "") {
            toast.error("Email is Required !")
          } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
          }else if(image == ""){
            toast.error("Profile is Required !")
          } else if (password === "") {
            toast.error("password is Required !")
          } else if (confirmpassword === "") {
            toast.error("confirmpassword is Required !")
          }else if(password !== confirmpassword){
            toast.error("password and confirm password is not match")
          } else{
            const data = new FormData();
            data.append("firstname",firstname)
            data.append("lastname",lastname)
            data.append("userprofile",image)
            data.append("email",email)
            data.append("password",password)
            data.append("confirmpassword",confirmpassword);

            const config = {
                "Content-Type":"multipart/form-data"
              }
              const datasend={
                data,
                config
              }
              dispatch(UserRegister(datasend)).then((res)=>{
                if(res){
                    navigate("/login")
                }
            }).catch((err)=>{
                console.log("err",err)
            })
              
          }
    }

    useEffect(() => {
        if (image) {
            setPreview(URL.createObjectURL(image))     //createObjectURL hame image base 64 me convert kr k dega
        }
    }, [image])
    
    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                    </div>
                    <div className="profile_div text-center">
                        <img src={preview} alt="img" style={{ width: "50px" }} />
                    </div>
                    <form>
                        <div className="form_input">
                            <input type="text" value={inputVal.firstname} name="firstname" onChange={handleChange} id="fname" placeholder='Enter Your Name' />
                        </div>

                        <div className="form_input">
                            <input type="text" value={inputVal.lastname} name="lastname" id="lastname" onChange={handleChange} placeholder='Enter Your Last Name' />
                        </div>

                        <div className="form_input">
                            <input type="email" value={inputVal.email} name="email" onChange={handleChange} id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <input type="file" name="userprofile" onChange={setProfile} />
                        </div>

                        <div className="form_input">
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inputVal.password} onChange={handleChange} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inputVal.confirmpassword} onChange={handleChange} name="confirmpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={handleSubmit}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/login">Log In</NavLink></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register