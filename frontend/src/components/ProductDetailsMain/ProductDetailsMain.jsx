import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Addreview, get{SingleProduct, productsReview, reviewDelete } from '../../redux/slice/productSlice/ProductSlice';
// import { AddtoCart } from '../../redux/slice/userAuthSlice/userAuthSlice';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
// import toast from 'react-hot-toast';
import Select from 'react-select'
import { Form } from 'react-bootstrap';
import './ProductDetailsmain.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { AddProductReview, deleteReview, FetchSingleProduct, GetProductReview } from '../../redux/slice/productSlice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { AddToCart } from '../../redux/slice/CartSlice/CartSlice';
import moment from 'moment';

const ProductDetailsMain = () => {

    const {SingleProduct} = useSelector((state)=>state.Product);

    const {UserVerifyData} = useSelector((state)=>state.User);

    const {AddReview} = useSelector((state)=>state.Product);

    const {FetchReview} = useSelector((state)=>state.Product);

    const {DeleteReviewData} = useSelector((state)=>state.Product);

    const {UserCartData}  = useSelector((state) => state.Cart);

    // console.log("DeleteReviewData",DeleteReviewData);

    const dateAfter7Days = moment().add(7, 'days').format('YYYY-MM-DD');

    const [description, setDescription] = useState("");

    const [rating, setRating] = useState("");

    const [show, setShow] = useState(false);

    const [showrating,setShowrating] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {id} = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // Fetch Single Product
    const getProductDetails = ()=>{
        const data = {
            productid:id
        }

        dispatch(FetchSingleProduct(data))
    }

    // Set review
    const handlesetRating = (e)=>{
        const {value,label} = e;
        setRating(value);
    }

    // Add Product Review
    const handleAddReview = (e)=>{
        e.preventDefault();

        if (rating == "") {
            toast.error("rating is required")
        } else if (description == "") {
            toast.error("description is required")
        } else {
            const data = {
                username: UserVerifyData.length > 0 ? UserVerifyData[0]?.firstname : "",
                rating: rating,
                description: description,
                userid: UserVerifyData.length > 0 ? UserVerifyData[0]?._id : ""
            }
            const productsDataAdd = {
                data ,
                productid: SingleProduct[0]?._id
            }

            dispatch(AddProductReview(productsDataAdd))
            .then((res) => {
                console.log(res);
                setDescription({description: "" })
                navigate(`/productdetails/${id}`);
                handleClose();
            }).catch((error) => {
                console.log("error", error)
            })
        }
    }

    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
    ];

    // console.log(AddReview[0]?.userid);
    // console.log(UserVerifyData[0]?._id);
    const handleReviewBtn = ()=>{
        if(UserVerifyData?.length == 0){
            toast.error("Please Login before review the product");
        }else if(FetchReview[0]?.userid == UserVerifyData[0]?._id){
            toast.error("You already reviewd the product");
        } else {
             handleShow();
        }
    }

    // GEt Product Review
    const getSingleFetchReviewDetails = ()=>{
        // backend me productId url se le raha hai to hm yaha set pr rahe hai product id as an object and then dispatch krwa rahe hai
        const data = {
            productid : SingleProduct[0]?._id
        }

        dispatch(GetProductReview(data))
    }

    // Delete the Review
    const handleReviewDelete = (id)=>{
        const data = {
            reviewid: id
        }
        dispatch(deleteReview(data))
    }


    // Add to cart
    const handleCart = (e)=>{
        dispatch(AddToCart(e));
    }

      useEffect(()=>{
        getProductDetails()     // call the function
      },[id,AddReview,UserCartData]);

    //   Calculate Product Rating
    useEffect(() => {
        let totalrating = 0
        FetchReview?.map((el) => {
            console.log(el.rating)
            totalrating = parseInt(el?.rating) + totalrating
        });
        console.log(totalrating / FetchReview?.length)
        setShowrating(Math.round(totalrating / FetchReview?.length));
    }, [FetchReview])

      useEffect(()=>{
        getSingleFetchReviewDetails();
      },[SingleProduct,DeleteReviewData])

  return (
    <>
         <div className="cart_section">
                <h2 className='text-center mt-2'>Product Details</h2>
                <div className="cart_container">
                    <div className="left_cart">
                        <img src={SingleProduct[0]?.productimage} alt="img" />
                    </div>
                    <div className="right_cart">
                        <h3>{SingleProduct[0]?.productname}</h3>
                        {
                            showrating ? <div className='reviewicon'>

                                {
                                    Array.from({ length: showrating }).map((el, ind) => {
                                        return <i class="fa-solid fa-star"></i>
                                    })
                                }
                                <span> &nbsp;{showrating} &nbsp;Rating</span>
                            </div> : "No Rating"
                        }

                        <p className="mrp">M.R.P. : ₹ {SingleProduct[0]?.price} </p>



                        <div className="discount_box">
                            <h5 >Discount : <span style={{ color: "#111" }}>{SingleProduct[0]?.discount} </span> </h5>
                            <p>Iteams left : <span style={{ color: "#B12704" }}>{SingleProduct[0]?.quantity}</span></p>
                            <h4>Delivery Date  : <span style={{ color: "#111", fontWeight: "600" }}>{ dateAfter7Days}</span> Details</h4>
                            <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
                        </div>
                        <p className="description">About the Iteam : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{SingleProduct[0]?.description.substr(0,30)}</span>...</p>
                        <div className='addtocart'>
                            {
                                SingleProduct[0]?.quantity > 0 ? 
                                <Button className="btn mt-3 addcartbtn" variant='dark' onClick={()=>handleCart(SingleProduct[0]?._id)}>Add to Cart</Button>
                                :
                                <p style={{color:'red'}}> <b>Product Sold Out.</b> </p>
                            }
                           
                        </div>
                    </div>
                </div>

                {/* review code */}
                <div className='container' style={{ width: "100%" }}>
                    <div className=' d-flex justify-content-between'>
                        <h3>Customer Review</h3>
                            <button className='btn btn-primary' onClick={handleReviewBtn} >Write A review</button>                       
                    </div>
                    <div className='mt-2 mb-5 d-flex justify-content-between flex-wrap'>
                        {
                            FetchReview?.length > 0 ? FetchReview?.map((element, index) => {
                                return (
                                    <>
                                        <Card style={{ width: '20rem' }} className='mb-3'>

                                            <Card.Body>
                                                <Card.Title>{element.username}</Card.Title>

                                                <Card.Text className='d-flex' style={{ color: "#f5d742" }}>
                                                    {
                                                        Array.from({ length: element.rating }).map((el, ind) => {
                                                            return (
                                                                <>
                                                                <i class="fa-solid fa-star"></i>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </Card.Text>

                                                <Card.Text>
                                                    {element.description}
                                                </Card.Text>
                                                {
                                                    UserVerifyData[0]?._id === element?.userid ? <Button variant='none' onClick={() => handleReviewDelete(element._id)}> <i class="fa-solid fa-trash" style={{ color: "red" }}></i></Button> : ""
                                                }
                                                 {/* <Button variant='none'> <i class="fa-solid fa-trash" style={{ color: "red" }}></i></Button> */}


                                            </Card.Body>
                                        </Card>
                                    </>
                                )
                            }) :
                             <div>
                                No review
                            </div>
                        }

                    </div>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Write Your Review Here</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form_data">
                            <form>
                                <div className="form_input">
                                    <label htmlFor="username">Your Name</label>
                                    <input type="text" value={UserVerifyData.length > 0 ? UserVerifyData[0]?.firstname : ""}  name="username" id="username" disabled />
                                </div>
                                <div className="form_input">
                                    <label htmlFor="username">Give The Rating</label>
                                    <Select options={options} onChange={handlesetRating}  />
                                </div>
                                <Form.Group className="mb-3 mt-2" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" onChange={(e)=>setDescription(e.target.value)}  name='description' rows={3}  />
                                </Form.Group>

                                <button className='btn' onClick={handleAddReview}>Submit</button>
                            </form>
                        </div></Modal.Body>
                </Modal>

            </div>
    </>
  )
}

export default ProductDetailsMain