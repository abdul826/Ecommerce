import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AdminDeleteProduct, AdminFetchAllProducts } from '../../redux/slice/productSlice/productSlice';
import Paginations from '../../components/Pagination/Paginations';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext.js';
// import { deleteProduct } from '../../redux/slice/adminAuthSlice/AdminSlice'; 

const AdminProductspage = () => {
    const  {ProductsData}  = useSelector((state) => state.Product);

    const  {DeleteProduct}  = useSelector((state) => state.Product);

    const {searchVal} = useContext(SearchContext);
    
    const dispatch = useDispatch()

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    // const [productDelete,setProductDelete] = useState(false);

    const productApi = () => {

        const data = {
            // backend me ye value hm URL k through get kr rahe hai as a query to yaha data k andar as an object send kr rahe
            selectedcategory: "all",           
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

    const handleDeleteProducts = (id) => {
        const data = {
            productid: id
        }

        dispatch(AdminDeleteProduct(data))
    }


    // pagination
    // handle prev btn
    const handlePrevious = () => {
        setPage(() => {
            if (page !== 1) return page - 1;
            return page;
        })
    }

    // handle next btn
    const handleNext = () => {
        setPage(() => {
            if (page !== pageCount) return page + 1;
            return page;
        })
    }

    useEffect(() => {
        productApi();
    }, [page,DeleteProduct,pageCount]);


    return (
        <>
            <section id="sellers">
                <div class="seller containers">
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2>Products</h2>


                    </div>

                    <div class="best-seller">
                        {
                            ProductsData?.allProducts?.map((element, index) => {
                                return (
                                    <>
                                        <div className="best-p1 mb-5">
                                            <img src={element.productimage} alt="img"  />
                                            <div className="best-p1-txt">
                                                <div className="name-of-p">
                                                    <p>{element.productname.substr(0,25)}</p>
                                                </div>
                                              
                                                <div className="price">
                                                ₹ {element.price}
                                                    <Button variant='none' onClick={()=>handleDeleteProducts(element._id)}> <i class="fa-solid fa-trash" style={{ color: "red" }}></i></Button>
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

export default AdminProductspage