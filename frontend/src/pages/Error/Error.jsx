import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./error.scss"

const Error = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
        <div style={{ minHeight: "85vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <img src='https://en.ryte.com/magazine/wp-content/uploads/2017/10/1500x800-404EInstellungen-1.png' alt="error" style={{ width: "500px",maxWidth:"100%", marginBottom: 20 }} />
          {/* <h1 className="mb-3">404 ERROR </h1> */}
          <h2 className="mb-3">PAGE NOT FOUND</h2>
          <NavLink to="/" className="btn btn-primary" style={{ fontSize: 18 }}> Back To Home Page </NavLink>
        </div>
      </div>
    )
}

export default Error