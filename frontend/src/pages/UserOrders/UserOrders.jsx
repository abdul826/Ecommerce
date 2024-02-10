import React, { useEffect } from 'react'
import "./userorders.scss"
// import { useLocation } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchOrderDetails } from '../../redux/slice/OrderSlice/orderSlice';
// import { userorders } from '../../redux/slice/userAuthSlice/userAuthSlice';
// import { useDispatch, useSelector } from 'react-redux';



const UserOrders = () => {

    const  {fetchOrderDetailsData}  = useSelector((state) => state.Orders);
    // console.log("fetchOrderDetailsData ", fetchOrderDetailsData);
  
    const dispatch = useDispatch();
  
    // const navigate = useNavigate();
  
    // Fetch Order Details
    const getOrdersData = ()=>{
      dispatch(fetchOrderDetails())
    }
  
      useEffect(()=>{
        getOrdersData()
      },[]);

    return (
        <>


            <Container className="pt-4 pb-4">
                <h2>Your Orders</h2>
                <Card className="card">
                    
                    {
                        fetchOrderDetailsData?.length > 0 ?    fetchOrderDetailsData?.map((ele, ind) => {
                            return (
                                <>
                    <div className="mt-2 store-item bottom-line pb-3 store-item mt-2">
                        <h5>OrderId :- {ele._id}</h5>

                        {
                            ele.otherData.map((element, index) => {
                                return (
                                    <>
                                        <div className='mb-3'>
                                            <Row>
                                                <Col lg={3}>
                                                    <img className="image-store" src={element.productDetails?.productimage} alt="" />
                                                </Col>
                                                <Col lg={9}>
                                                    <div className="mt-3 mt-lg-0 d-flex align-items-center justify-content-between">
                                                        <h4>{element.productDetails?.productname}</h4>

                                                    </div>
                                                    <div className="list-store d-flex align-items-center justify-content-between">
                                                        <p><span style={{ fontWeight: "bold" }}> Discount :- </span>{element.productDetails?.discount}%</p>
                                                    </div>
                                                    <div className="list-store d-flex align-items-center justify-content-between">
                                                        <p><span style={{ fontWeight: "bold" }}> Price :-</span> {element.productDetails?.price}</p>
                                                    </div>
                                                    <div className="list-store d-flex align-items-center justify-content-between">
                                                        <p><span style={{ fontWeight: "bold" }}> Delivery Address :-</span>{ele?.address }</p>
                                                    </div>
                                                    <div className="list-store d-flex align-items-center justify-content-between">
                                                        <p><span style={{ fontWeight: "bold" }}> OrderStatus :- </span>{ele?.orderstatus} </p>
                                                    </div>
                                                    <div className="list-store d-flex align-items-center justify-content-between">
                                                        <div className="text-end" style={{ width: "100%" }}>
                                                            <h5>Total :- {element.productDetails?.price * element?.quantity}</h5>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                     </>
                                )
                            })

                        } 

                    </div>
                    <hr />
                    </>
                            )
                        }):
                    <div style={{ marginBottom: "25%" }}>No Order</div>
                     } 
                </Card>
            </Container>
        </>
    )
}

export default UserOrders