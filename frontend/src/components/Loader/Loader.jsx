import React from 'react'
import "./Loader.scss";

const Loader = ({backgroundColor,height,width}) => {
    const loaderStyle = {
        backgroundColor: backgroundColor ? backgroundColor : "#f05e8a",
        height: height ? height : "18px",
        width: width ? width : "18px",
        marginRight: "3px",
      };
  return (
    <div className="loader">
        <div style={loaderStyle}></div>
        <div style={loaderStyle}></div>
        <div style={loaderStyle}></div>
      </div>
  )
}

export default Loader