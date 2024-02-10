import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { AddToCart, DecrementCartProductValue, RemoveCartItme } from '../../redux/slice/CartSlice/CartSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import moment from 'moment';

import './cartsmain.scss';
import EmptyCart from '../EmptyCart/EmptyCart';

const CartsMain = () => {

  const {UserCartData}  = useSelector((state) => state.Cart);

  
  const [totalprice, setPrice] = useState(0);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // delivery date
  const dateAfter2Days = moment().add(7, 'days').format('DD-MM-YYYY');

  // Increment cart
    const handleIncrementCart = (e)=>{
      dispatch(AddToCart(e));
    }

    // Decrement cart Value
    const handleDecrementCart = (id)=>{
      dispatch(DecrementCartProductValue(id));
    }

    const handleRemoveItme= (id)=>{
      dispatch(RemoveCartItme(id))
    }

    const handleShipping = ()=>{
      navigate('/shipping', {state:totalprice});
    }

  // count total price
  const total = () => {
    let totalprice = 0
    UserCartData?.map((ele, ind) => {
      totalprice = ele.productDetails?.price * ele.quantity + totalprice
    });
    setPrice(totalprice)
  }


  useEffect(() => {
    total()
  }, [total])

  return (
    <>
      <Container className="pt-4 pb-4">
        <h2 className="text-center">Shopping Cart</h2>
        {
          UserCartData?.length > 0 ? 
          <Row className="mt-5 gap-3 gap-md-0 gap-lg-0">
          <Col lg={8} md={7}>

            <Card className="card">
              <Card.Title>Cart items : {UserCartData?.length}</Card.Title>
              {
                UserCartData?.map((ele, ind) => {
                  return (
                    <>
                      <div className={true ? "mt-2 store-item bottom-line pb-3" : "store-item mt-2"}>
                        <Row>
                          <Col lg={3}>
                            <NavLink to={`/productdetails/${ele.productDetails?._id}`}>
                              <img className="image-store" src={ele.productDetails?.productimage} alt="img" />
                            </NavLink>
                           
                          </Col>
                          <Col lg={9}>
                            <div className="mt-3 mt-lg-0 d-flex align-items-center justify-content-between">
                              <h4>{ele.productDetails?.productname}</h4>
                              <div>
                                <div className="btn-quantity-container d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                                  <Button className="btn-quantity" variant="light" onClick={()=> handleDecrementCart(ele?.productDetails?._id)} >&minus;</Button>
                                  <span className="p-quantity">{ele?.quantity}</span>
                                  <Button className="btn-quantity" variant="light" onClick={()=> handleIncrementCart(ele?.productDetails?._id)}>+</Button>
                                </div>
                              </div>
                            </div>
                            <div className="list-store d-flex align-items-center justify-content-between">
                              <p>discount :- {ele.productDetails?.discount}</p>
                            </div>
                            <div className="list-store d-flex align-items-center justify-content-between">
                              <p>Price :- {ele.productDetails?.price}</p>
                            </div>
                            <div className="list-store d-flex align-items-center justify-content-between">
                              <p>Delivery date :- {dateAfter2Days}</p>
                            </div>
                            <div className="list-store d-flex align-items-center justify-content-between">
                              <div className="d-flex gap-2">
                                <Button className="btn-list" onClick={()=> handleRemoveItme(ele?.productDetails?._id)} variant="danger" size="xsmall">
                                  <i className="fa fa-trash"></i>
                                  <span> Remove Item</span>
                                </Button>
                                <Button className="btn-list" variant="secondary" size="xsmall">
                                  <i className="fa fa-heart"></i>
                                  <span> Move To Wish List</span>
                                </Button>
                              </div>
                              <div className="d-flex">
                                <h5>Total :- {ele.productDetails?.price * ele?.quantity}</h5>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <hr />
                    </>
                  )
                })
              }
            </Card>


          </Col>
          <Col lg={4} md={5}>
            <Row className="gap-3">
              <Col>
                <Card className="card">
                  <Card.Title>The total amount of</Card.Title>
                  <div className="store-item mt-2">
                    <Row>
                      <Col>
                        <div className="list-store d-flex align-items-center justify-content-between">
                          <p>Temporary amount</p>
                          <p>{totalprice}</p>
                        </div>
                        {/* <div className="list-store d-flex align-items-center justify-content-between">
                          <p>Shipping</p>
                          <p>Gratis</p>
                        </div> */}
                        <div className="bottom-line"></div>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col className="col-6">
                        <p className="p-total-label">The total amount of (Including VAT)</p>
                      </Col>
                      <Col className="col-6">
                        <p className="p-total">{totalprice}</p>
                      </Col>
                    </Row>
                    <Row className="mt-1">
                      <Col>
                        <Button className="w-100"  variant="primary" size="medium" block onClick={handleShipping}>
                          Go To Checkout
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
          </Row>

       :
       <EmptyCart /> 
         }

      </Container>
    </>
  )
}

export default CartsMain