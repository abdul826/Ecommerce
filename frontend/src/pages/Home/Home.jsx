import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeContact from '../../components/HomeContacts/HomeContact'
import Homemain from '../../components/HomeMain/Homemain'
import HomeProduct from '../../components/HomeProducts/HomeProduct';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext.js';
import { AdminFetchAllProducts, getLatestProducts } from '../../redux/slice/productSlice/productSlice'

const Home = () => {
  const {searchVal} = useContext(SearchContext);

  const  {ProductsData}  = useSelector((state) => state.Product);

  const  {LatestProduct}  = useSelector((state) => state.Product);

  // console.log("LatestProduct", LatestProduct);
  
  const dispatch = useDispatch()

  const [page, setPage] = useState(1);

  const productApi = () => {

    const data = {
        // backend me ye value hm URL k through get kr rahe hai as a query to yaha data k andar as an object send kr rahe
        selectedcategory: "all",           
        page,
        search:searchVal
    }

    dispatch(AdminFetchAllProducts(data))
    .then((res) => {
  
    }).catch((err) => {
        console.log("err", err)
    })

    dispatch(getLatestProducts())
    .then((res) => {
  
    }).catch((err) => {
        console.log("err", err)
    })
}

  useEffect(() => {
    productApi();
}, []);

useEffect(()=>{
  window.scrollTo(0,0)
},[]);

  return (
    <div>
        <Homemain />
        <HomeProduct ProductsData={ProductsData.allProducts} LatestProduct={LatestProduct} />
        <HomeContact />
    </div>
  )
}

export default Home