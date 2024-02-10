import React, { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserCartDetails } from '../../redux/slice/CartSlice/CartSlice';
import { UserVerify, UserLogout } from '../../redux/slice/UserAuthSlice/UserAuthSlice';


import './header.scss';
import './header.css';
import { AdminFetchAllProducts } from '../../redux/slice/productSlice/productSlice';
import axios from 'axios';
import { SearchContext } from '../../context/SearchContext';

const DefaultImg = 'https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Free-Download.png';

const Header = () => {

    const {searchVal,setSearchVal} = useContext(SearchContext);

    const { UserVerifyData } = useSelector((state) => state.User);
    const { loginUserData } = useSelector((state) => state.User);
    const { AddCartData } = useSelector((state) => state.Cart);
    const { UserCartData } = useSelector((state) => state.Cart);
    const { DecrementCartData, RemoveCartItmeData, deleteCartItem } = useSelector((state) => state.Cart);

    // console.log("UserVerifyData",UserCartData);

    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Verify the user
    const handleUserVerify = () => {
        dispatch(UserVerify())
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // logout
    const userLogouthandle = () => {
        dispatch(UserLogout())
            .then((res) => {
                handleClose()
                UserCartData = [];
                navigate('/');
            }).catch((err) => {
                console.log(err);
                navigate('/');
            })
    }

    // Cart Details

    const handleCartDetails = () => {
        dispatch(UserCartDetails())
    }

    useEffect(() => {
        handleCartDetails();
    }, [loginUserData, AddCartData, DecrementCartData, RemoveCartItmeData, deleteCartItem])

    // Verify USer
    useEffect(() => {
        handleUserVerify();
    }, [loginUserData])

    useEffect(()=>{
      let data = {
            selectedcategory: "all",           
            page:1,
            search:searchVal
        }
        dispatch(AdminFetchAllProducts(data))
    },[searchVal]);

    return (
            <>
                <header>
                <div className="container">
                    <nav>
                        <div className="left">
                            <div className="navlogo">
                                {/* <h1>Male Fashion</h1> */}
                                <NavLink to="/"> <img src="https://i.postimg.cc/TP6JjSTt/logo.webp" alt="logo" /> </NavLink>
                            </div>

                            <div className="searchbar">
                                <div className="search col-lg-8" >
                                    <Form className="">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                            onChange={(e) => setSearchVal(e.target.value)}
                                        />
                                    </Form>
                                </div>
                            </div>
                        </div>

                        <div className="right">
                            <div className='hamburgur' onClick={handleShow}>
                                <i class="fa-solid fa-bars"></i>
                            </div>
                            <div className="nav_btn">
                                <NavLink to="/products">Product</NavLink>
                                {/* <NavLink to="/login">Sign in</NavLink> */}
                            </div>
                            <div id="ex4" className='cartsicon'>
                                <NavLink to="/carts" className="text-dark">
                                    <span className="p1 fa-stack fa-2x has-badge"
                                        data-count={UserVerifyData?.length > 0 ? UserCartData?.length : "0"}>
                                        <i className="p1 fa-solid fa-cart-shopping" />
                                    </span>
                                </NavLink>
                            </div>
                            <div className='profile'>
                                <Dropdown className='text-center' >
                                    <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                        <img src={UserVerifyData?.length > 0 ? UserVerifyData[0]?.userprofile : `${DefaultImg}`} style={{ width: "50px", height: '50px', borderRadius: '50%' }} alt="" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            UserVerifyData?.length > 0 ?
                                                (
                                                    <>
                                                        <Dropdown.Item>
                                                            <NavLink to="/userprofile" className="text-dark">
                                                                <i class="fa-solid fa-user"></i>&nbsp;&nbsp;&nbsp;Profile
                                                            </NavLink>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={userLogouthandle}>

                                                            <i class="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp;&nbsp;LogOut

                                                        </Dropdown.Item>

                                                    </>
                                                )
                                                :
                                                <Dropdown.Item>
                                                    <NavLink to="/login" className="text-dark">
                                                        <i class="fa-solid fa-user"></i>&nbsp;&nbsp;&nbsp;Login
                                                    </NavLink>
                                                </Dropdown.Item>

                                        }

                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </nav>
                </div>

                {/* sidebar for responsive */}
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            <img src={UserVerifyData?.length > 0 ? UserVerifyData[0]?.userprofile : `${DefaultImg}`} 
                            className="sidebarImg"
                             alt="" />
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body style={{ background: "black", }}>
                        <NavLink to="/products" className="text-light text-decoration-none" onClick={handleClose}><i class="fa-solid fa-shop"></i>&nbsp;&nbsp;Product</NavLink> <br />

                        {
                            UserVerifyData?.length > 0 ? (
                                <>
                                    <NavLink to="/userprofile" onClick={handleClose} className="text-light text-decoration-none">
                                        <i class="fa-solid fa-user"></i>&nbsp;&nbsp;&nbsp;Profile
                                    </NavLink> <br />
                                    <div onClick={userLogouthandle} className="text-light" style={{ cursor: 'pointer' }}>
                                        <i class="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp;&nbsp;Logout
                                    </div>
                                </>
                            )

                                : <NavLink to="/login" className="text-light text-decoration-none" onClick={handleClose}><i class="fa-solid fa-right-to-bracket"></i>&nbsp;&nbsp;Login</NavLink>
                        }

                        <div id="ex4" className='cartsicon'>
                            <NavLink to="/carts" className="text-light" onClick={handleClose}>
                                <span className="p1 fa-stack fa-2x has-badge" data-count={0}>
                                    <i className="p1 fa-solid fa-cart-shopping" />
                                </span>
                            </NavLink>
                        </div>

                    </Offcanvas.Body>
                </Offcanvas>

            </header>
            </>
    )
}

export default Header