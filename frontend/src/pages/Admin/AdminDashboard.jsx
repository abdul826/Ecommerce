import React, { useEffect, useState } from 'react'
import { AdminFetchAllProducts } from '../../redux/slice/productSlice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { getAlluser } from '../../redux/slice/userAuthSlice/userAuthSlice';
import "./admin.css"
import AdminUserTable from './AdminUserTable'
import { getAllUser } from '../../redux/slice/UserAuthSlice/UserAuthSlice';
// import { Ordersforadmin } from '../../redux/slice/adminAuthSlice/AdminSlice';
// import { getAllHomeProducts, } from '../../redux/slice/productSlice/ProductSlice';
// import AdminuserTable from "./AdminuserTable"

const AdminDashboard = () => {

  const  {ProductsData}  = useSelector((state) => state.Product);

  const {getAllUserData} = useSelector((state)=> state.User)

  const {DeleteUserData} = useSelector((state)=> state.User);

  // console.log("DeleteUserData Dashboaard", DeleteUserData);

  const dispatch = useDispatch()

  const [allUserCount, setAllUserCount] = useState(0)
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const productApi = () => {

    const data = {
        // backend me ye value hm URL k through get kr rahe hai as a query to yaha data k andar as an object send kr rahe
        selectedcategory: "all",           
        page
    }

    dispatch(AdminFetchAllProducts(data))
    .then((res) => {
  
    }).catch((err) => {
        console.log("err", err)
    })
}

  const getAllUserFunction = ()=>{
    const data = {
      page
    }

    dispatch(getAllUser(data)).then((res)=>{
      if(res?.payload){
        setPageCount(res.payload.Pagination.pageCount);
        setAllUserCount(res.payload.Pagination.count);
      }
    }).catch((error)=>{
      console.log("Error=>", error);
    })
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

    getAllUserFunction();
}, [page,DeleteUserData]);

  return (
    <>
      <div className="overview-boxes">
        <div className="box">
          <div className="right-side">
            <div className="box-topic">50</div>
            <div className="number">12</div>
            <div className="indicator">
              <i className="bx bx-up-arrow-alt"></i>
              <span className="text">Up from yesterday</span>
            </div>
          </div>
          <i className="bx bx-cart-alt cart"></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Products</div>
            <div className="number">{ProductsData?.Pagination?.totalProducts}</div>
            <div className="indicator">
              <i className="bx bx-up-arrow-alt"></i>
              <span className="text">Up from yesterday</span>
            </div>
          </div>
          <i className="bx bxs-cart-add cart two"></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Users</div>
            <div className="number">{allUserCount}</div>
            <div className="indicator">
              <i className="bx bx-up-arrow-alt"></i>
              <span className="text">Up from yesterday</span>
            </div>
          </div>
          <i className="bx bx-cart cart three"></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Return</div>
            <div className="number">11,086</div>
            <div className="indicator">
              <i className="bx bx-down-arrow-alt down"></i>
              <span className="text">Down From Today</span>
            </div>
          </div>
          <i className="bx bxs-cart-download cart four"></i>
        </div>
      </div>

      <div className="sales-boxes">
        <div className="recent-sales box">
          <div className="title">Recent Sales</div>
          <div className="sales-details">
            {/* <AdminuserTable getAlluserdata={getAlluserdata}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              page={page}
              setPage={setPage}
              pageCount={pageCount}
            /> */}
            <AdminUserTable 
              getAllUserData={getAllUserData}
              page={page}
              setPage={setPage}
              pageCount={pageCount}
              handlePrevious={handlePrevious}
              handleNext = {handleNext}
            />

          </div>

        </div>
        <div className="top-sales box">
          <div className="title">Top Selling Product</div>
          <ul className="top-sales-details">
            {/* {
              productsHome?.map((element, inde) => {
                return (
                  <> */}
                    <li>
                      <a href="#">
                        <img src='element.productimage' alt="" />
                        <span className="product">element.productname</span>
                      </a>
                      <span className="price">₹element.price</span>
                    </li>
                  {/* </>
                )
              })
            } */}

          </ul>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard