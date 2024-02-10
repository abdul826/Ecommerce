import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import { Country, State } from 'country-state-city';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
// import Loader from '../../component/Loader/Loader';



const Shipping = () => {

    
    let shippingPrice;

    const location = useLocation();

    const navigate = useNavigate();

    const [inpval, setInpval] = useState({
        mobile: "",
        city: "",
        pincode: "",
        address: ""
    });

    if(location.state >= 1000){
        shippingPrice = 0;
    }else{
        shippingPrice = 40
    }

    const [spin, setSpin] = useState(true);

    const [state, setState] = useState([]);
    const [country, setCountry] = useState([]);

    const [countrycode, setCountryCode] = useState("");
    const [finalstate, setFinalState] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInpval({ ...inpval, [name]: value });
    }

    //  else if (finalstate === "") {
    //         toast.error("finalstate is Required !")
    //     } 

    const handleSubmit = (e) => {
        e.preventDefault();

        const { mobile, city, pincode, address } = inpval;

        if (mobile === "") {
            toast.error("mobile is Required !")
        } 
        else if (countrycode === "") {
            toast.error("countrycode is Required !")
        }
        else if (city == "") {
            toast.error("city is required")
        } else if (pincode === "") {
            toast.error("pincode is Required !")
        } else if (address === "") {
            toast.error("address is Required !")
        } 
        else {
            const data = {
                mobile, city, pincode, address, 
                country: countrycode, 
                state: finalstate, 
                itemsPrice: location.state, 
                shippingPrice: shippingPrice, 
                totalPrice: location.state + shippingPrice
            }

            navigate("/checkout", { state: data });         // jb dusare page me data send krna ho tb redirect k time pr ek state me store kr k hm pass kr sakte hai aur use location k help se usko get b kr sakte hai
        }
    }

    useEffect(() => {
        let countrydata = Country.getAllCountries()

        let arr = []

        for (let i = 0; i < countrydata.length; i++) {
            let storedata = { value: countrydata[i].isoCode, label: countrydata[i].name }
            arr.push(storedata)
        }

        setCountry(arr);

        if (countrycode) {
            let statedata = State.getStatesOfCountry(countrycode);
            console.log(statedata)
            let arr2 = [];

            for (let i = 0; i < statedata.length; i++) {
                let storestatedata = { value: statedata[i].isoCode, label: statedata[i].name }
                arr2.push(storestatedata)
            }
            setState(arr2)
        }
    }, [countrycode])

    return (
        <>
            {/* {
                spin ? <Loader /> : */}
                    <section>
                        <div className="form_data">
                            <div className="form_heading">
                                <h1>Shipping Details</h1>
                            </div>
                            <form>
                                <div className="form_input">
                                    <input type="text" value={inpval.mobile} name="mobile" onChange={handleChange} placeholder='Enter Your Mobile' />
                                </div>
                                <div className="form_input mb-3">
                                    <Select options={country} onChange={(e) => setCountryCode(e.value)}  placeholder="select Your country" />
                                </div>
                                <div className="form_input mb-2">
                                    {/* <Select options={state} placeholder="select Your State" onChange={(e) => setFinalState(e.label)} /> */}
                                    <Select options={state} onChange={(e) => setFinalState(e.label)} placeholder="select Your State" />
                                </div>
                                <div className="form_input">
                                    <input type="text" value={inpval.city} name="city" onChange={handleChange} placeholder='Enter Your city' />
                                </div>
                                <div className="form_input">
                                    <input type="text" value={inpval.pincode} name="pincode" onChange={handleChange} placeholder='Enter Your pincode' />
                                </div>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" name='address' value={inpval.address} onChange={handleChange} placeholder='Shipping Address' rows={2} />
                                </Form.Group>

                                <button className='btn' onClick={handleSubmit}>send</button>

                            </form>
                        </div>
                    </section>
            {/* } */}
        </>
    )
}

export default Shipping