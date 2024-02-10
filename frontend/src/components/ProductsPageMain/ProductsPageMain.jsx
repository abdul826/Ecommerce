import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import { AdminFetchAllProducts, AdminGetCategory } from '../../redux/slice/productSlice/productSlice';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext.js';
import Paginations from '../Pagination/Paginations';
import "./Productspage.scss";

const ProductsPageMain = () => {

    const {searchVal} = useContext(SearchContext);

    const { ProductsData } = useSelector((state) => state.Product);

    const { CategoryData } = useSelector((state) => state.Product);

    // console.log("ProductsData", ProductsData);

    const dispatch = useDispatch();

    const [selectedcategory, setSelectedCategory] = useState("all");

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const [categorystate, setcategorystate] = useState([]);

    // Fetch ALl Product
    const productApi = () => {

        // let search = '';
        const data = {
            // backend me ye value hm URL k through get kr rahe hai as a query to yaha data k andar as an object send kr rahe
            selectedcategory: selectedcategory,
            page,
            search:searchVal
        }

        dispatch(AdminFetchAllProducts(data))
            .then((res) => {
                setPageCount(res.payload.Pagination.pageCount)
            }).catch((err) => {
                console.log("err", err)
            })
    }

    // pagination
    // handle prev btn
    const handlePrevious = () => {
        setPage(() => {
            if (page === 1) return page;
            return page - 1
        })
    }

    // handle next btn
    const handleNext = () => {
        setPage(() => {
            if (page === pageCount) return page;
            return page + 1
        })
    }

    useEffect(() => {
        dispatch(AdminGetCategory())      // call the funtion for category
    }, []);

    // We get category in key:value so we use loop
    useEffect(() => {
        let arr = [{ value: 'all', label: "All" }]
        for (let i = 0; i < CategoryData?.length; i++) {

            let setcategoryval = { value: CategoryData[i]._id, label: CategoryData[i].categoryname }
            arr.push(setcategoryval);
        }
        setcategorystate(arr)

    }, [CategoryData])

    useEffect(() => {
        productApi();
    }, [page, selectedcategory,searchVal]);

    return (
        <>
            <section id="sellers">
                <div class="seller containers">
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2>Products</h2>
                        <div className='category-filter mt-5'>
                            <Select options={categorystate} onChange={(e) => setSelectedCategory(e.value)}  />
                        </div>

                    </div>

                    <div class="best-seller">
                        {
                            ProductsData?.allProducts?.map((element, index) => {
                                return (
                                    <>
                                        <div className="best-p1 mb-5">
                                            <img src={element.productimage} alt="img" />
                                            <div className="best-p1-txt">
                                                <div className="name-of-p">
                                                    <p>{element.productname.substr(0,20)} <span style={{color:'blue'}}>....</span></p>
                                                </div>
                                                <div className="rating">
                                                    {/* <i className="bx bxs-star"></i>
                                                    <i className="bx bxs-star"></i>
                                                    <i className="bx bxs-star"></i>
                                                    <i className="bx bx-star"></i>
                                                    <i className="bx bx-star"></i> */}
                                                </div>
                                                <div className="price">
                                                ₹ {element.price}

                                                </div>
                                                <div className="buy-now">
                                                    <button><NavLink to={`/productdetails/${element._id}`}>Buy Now</NavLink></button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                    <Paginations
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                        page={page}
                        pageCount={pageCount}
                        setPage={setPage}
                    />
                </div>
            </section>
        </>
    )
}

export default ProductsPageMain