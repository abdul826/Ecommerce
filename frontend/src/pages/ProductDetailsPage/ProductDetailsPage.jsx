import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader';
import ProductDetailsMain from '../../components/ProductDetailsMain/ProductDetailsMain'

const ProductDetailsPage = () => {
  const [spin, setSpin] = useState(true);


  useEffect(()=>{
    setTimeout(()=>{
      setSpin(false);
    },1000)
  },[]);

  useEffect(()=>{
    window.scrollTo(0,0)
  },[]);

  return (
    <>
    {
      spin ? <Loader/> : <ProductDetailsMain />
    }
    </>
  )
}

export default ProductDetailsPage