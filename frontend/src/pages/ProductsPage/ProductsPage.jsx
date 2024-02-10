import React, { useEffect, useState } from 'react'
import ProductsPageMain from '../../components/ProductsPageMain/ProductsPageMain';
import Loader from '../../components/Loader/Loader';

const ProductsPage = () => {

  const [spin, setSpin] = useState(true);


  useEffect(()=>{
    setTimeout(()=>{
      setSpin(false);
    },2000)
  },[]);

  useEffect(()=>{
    window.scrollTo(0,0)
  },[]);

  return (
    <>
    {
      spin ? <Loader/> : <ProductsPageMain />
    }
        
    </>
  )
}

export default ProductsPage