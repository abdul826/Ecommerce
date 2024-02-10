import React from 'react';
import { NavLink } from 'react-router-dom';
import './Homeproduct.scss';

const HomeProduct = ({ ProductsData, LatestProduct }) => {
    return (
        <>
            <section id="sellers">
                <div class="seller containers">
                    <h2>Products</h2>
                    <div class="best-seller">
                        {
                            ProductsData?.length > 0 ?
                                ProductsData.slice(0, 4).map((element, index) => {
                                    return (
                                        <>
                                            <div className="best-p1">

                                                <img src={element.productimage} alt="img" />
                                                <div className="best-p1-txt">
                                                    <div className="name-of-p">
                                                        <p>{element.productname.substr(0,20)} <span style={{color:'blue'}}>....</span></p>
                                                    </div>
                                                    <div className="rating">
                                                        <i className="bx bxs-star"></i>
                                                        <i className="bx bxs-star"></i>
                                                        <i className="bx bxs-star"></i>
                                                        <i className="bx bx-star"></i>
                                                        <i className="bx bx-star"></i>
                                                    </div>
                                                    <div className="price">
                                                        ₹ {element.price}
                                                        {/* <div className="colors">
                                                                <i className="bx bxs-circle red"></i>
                                                                <i className="bx bxs-circle blue"></i>
                                                                <i className="bx bxs-circle white"></i>
                                                            </div> 
                                                        */}
                                                    </div>
                                                    <div className="buy-now">
                                                        <button><NavLink to={`/productdetails/${element._id}`}>Buy Now</NavLink></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                                :
                                "No Data Available"
                        }
                    </div>
                </div>
                <div class="seller containers">
                    <h2>New Arrivals</h2>
                    <div class="best-seller">
                        {
                            LatestProduct?.length > 0 ?
                                LatestProduct?.slice(0, 4).map((element, index) => {
                                    return (
                                        <>
                                            <div className="best-p1">
                                                <img src={element.productimage} alt="img" />
                                                <div className="best-p1-txt">
                                                    <div className="name-of-p">
                                                        <p>{element.productname.substr(0,25)}</p>
                                                    </div>
                                                    <div className="rating">
                                                        <i className="bx bxs-star"></i>
                                                        <i className="bx bxs-star"></i>
                                                        <i className="bx bxs-star"></i>
                                                        <i className="bx bxs-star"></i>
                                                        <i className="bx bxs-star"></i>
                                                    </div>
                                                    <div className="price">
                                                        ₹ {element.price}
                                                        {/* <div className="colors">
                                                        <i className="bx bxs-circle blank"></i>
                                                        <i className="bx bxs-circle blue"></i>
                                                        <i className="bx bxs-circle brown"></i>
                                         </div> 
                                    */}
                                                    </div>
                                                    <div className="buy-now">
                                                        <button><NavLink to={`/productdetails/${element._id}`}>Buy Now</NavLink></button>

                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                                :
                                "No Latest PRoduct Available"
                        }

                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeProduct