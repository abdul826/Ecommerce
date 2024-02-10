import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrderDetails } from '../../redux/slice/OrderSlice/orderSlice';
import './userprofile.scss';

const UserProfile = () => {
  const { UserVerifyData } = useSelector((state) => state.User);

  const  {fetchOrderDetailsData}  = useSelector((state) => state.Orders);
  // console.log("fetchOrderDetailsData ", fetchOrderDetailsData);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Fetch Order Details
  const getOrdersData = ()=>{
    dispatch(fetchOrderDetails())
  }

    const handleOrders = ()=>{
      navigate('/userorders')
    };

    useEffect(()=>{
      getOrdersData()
    },[]);

  return (
    <>
    <div className="wrapper mt-5 mb-5">
      <div className="left">
        <img src={UserVerifyData[0]?.userprofile} alt="user" width="100" height='100px' />
        <h6>{UserVerifyData[0]?.firstname} {UserVerifyData[0]?.lastname}</h6>
        <p>UI Developer</p>
      </div>
      <div className="right">
        <div className="info">
          <h3>Information</h3>
          <div className="info_data">
            <div className="data">
              <h4>Email</h4>
              <p>{UserVerifyData[0]?.email}</p>
            </div>

          </div>
        </div>

        <div className="projects">
          <h3>Orders</h3>
          <div className="projects_data">
            <div className="data">
              <h4>Total Orders</h4>
              <p style={{ fontSize: "20px" }}>{fetchOrderDetailsData?.length}</p>
            </div>
            <div className="data">
              <button className='btn btn-primary' onClick={handleOrders}> <p style={{color:'white', marginBottom:"5px"}}>See Orders</p> </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </>
  )
}

export default UserProfile