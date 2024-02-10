import React from 'react'
// import { useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Checkout = () => {

  const {state} = useLocation();

  const {UserCartData}  = useSelector((state) => state.Cart);

  const navigate = useNavigate();

  // console.log("state", state);
  const dateAfter2Days = moment().add(7, 'days').format('DD-MM-YYYY');

  // We send this final state data to payment page
  const finalState = {
    ...state,
    otherData:UserCartData
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate('/payment', {state:finalState})

  }


  return (
    <>
      <div className='container'>
        <Card style={{ width: '22rem', border: "2px solid #32a897", marginTop: "5px" }}>
          <Card.Body>
            <Card.Title>Shipping Details</Card.Title>
            <Card.Text>
              <span style={{ fontWeight: "bold" }}>Address:- </span>  {state?.address}
            </Card.Text>
            <Card.Text>
              <span style={{ fontWeight: "bold" }}>City:- </span>     {state?.city}
            </Card.Text>
            <Card.Text>
              <span style={{ fontWeight: "bold" }}>State:-</span>     {state?.state}
            </Card.Text>
            <Card.Text>
              <span style={{ fontWeight: "bold" }}>Country:-</span>     {state?.country}
            </Card.Text>
            <Card.Text>
              <span style={{ fontWeight: "bold" }}> Mobile:-</span>    {state?.mobile}
            </Card.Text>
            <Card.Text>
              <span style={{ fontWeight: "bold" }}>pincode:-</span>     {state?.pincode}
            </Card.Text>
            <Card.Text>
              <span style={{ fontWeight: "bold" }}>shipingPrice:-</span>     {state?.shipingPrice}
            </Card.Text>
            <Card.Text>
              <span style={{ fontWeight: "bold" }}>TotalPrice:-  </span>    {state?.totalPrice} ₹
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="card mt-3" style={{ border: "2px solid #32a897" }}>
          <Card.Title>Your Orders</Card.Title>
          {
            UserCartData?.map((ele, ind) => {
              return (
                <>
                  <div className="mt-2 store-item bottom-line pb-3 store-item mt-2">
                    <Row>
                      <Col lg={3}>
                        <img className="image-store" src={ele.productDetails?.productimage} alt="" />
                      </Col>
                      <Col lg={9}>
                        <div className="mt-3 mt-lg-0 d-flex align-items-center justify-content-between">
                          <h4>{ele.productDetails?.productname}</h4>

                        </div>
                        <div className="list-store d-flex align-items-center justify-content-between">
                          <p><span style={{ fontWeight: "bold" }}>  discount :- </span> {ele.productDetails?.discount}</p>
                        </div>
                        <div className="list-store d-flex align-items-center justify-content-between">
                          <p><span style={{ fontWeight: "bold" }}> Price :-</span>{ele.productDetails?.price}</p>
                        </div>
                        <div className="list-store d-flex align-items-center justify-content-between">
                          <p><span style={{ fontWeight: "bold" }}> Delivery date :-</span>{dateAfter2Days}</p>
                        </div>
                        <div className="list-store d-flex align-items-center justify-content-between">

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
      </div>
      <div className='container mt-3 mb-2'>

        <Button type="submit" onClick={handleSubmit}>Procee to payment</Button>
      </div>
    </>
  )
}

export default Checkout