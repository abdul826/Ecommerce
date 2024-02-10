import React, { useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { NavLink } from 'react-router-dom';
import "./order.scss"
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderByAdmin, OrderUpdateStatus } from '../../redux/slice/OrderSlice/orderSlice';
// import { OrderUpdateStatus, Ordersforadmin } from '../../redux/slice/adminAuthSlice/AdminSlice';
// import { useDispatch, useSelector } from 'react-redux';

const Orders = () => {

  const { fetchOrderByAdminData } = useSelector((state) => state.Orders);

  const { OrderUpdateData } = useSelector((state) => state.Orders);
  
  console.log("OrderUpdateData=>", OrderUpdateData);

  const dispatch = useDispatch();

  // Update Order Status
  const handleOrderChange = (orderdata,orderid)=>{
  
    const finaldata = {
      orderStatus:orderdata,
      orderid:orderid
    }
    dispatch(OrderUpdateStatus(finaldata))
  }


  const getAllOrderByAdmin = () => {
    dispatch(fetchOrderByAdmin());
  }

  useEffect(() => {
    getAllOrderByAdmin();
  }, [OrderUpdateData])

  return (
    <>
      <div className="container mb-3">
        <h3>Orders</h3>
        <Row>
          <div className="col mt-0">
            <Card className='shadow'>
              <Table className='align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>totalPrice</th>
                    <th>orderItems</th>
                    <th>userId</th>
                    <th>&nbsp;&nbsp;&nbsp;Status</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    fetchOrderByAdminData.length > 0 ? fetchOrderByAdminData.map((elm, ind) => {
                      return (
                        <>
                          <tr>
                            <td>{ind + 1}</td>
                            <td>₹ &nbsp; {elm.totalPrice}</td>
                            <td>{elm.otherData.length}</td>
                            <td>{elm.userid}</td>
                            <td>
                            {elm.orderstatus == "Processing" ?
                                <Dropdown className=''>
                                  <Dropdown.Toggle id="dropdown-basic">
                                    {elm.orderstatus}
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>handleOrderChange("Confirmed",elm._id)}>Confirm</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown> :
                                elm.orderstatus === "Confirmed" ?
                                  <Dropdown className=''>
                                    <Dropdown.Toggle id="dropdown-basic">
                                      {elm.orderstatus}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Dropdown.Item onClick={()=>handleOrderChange("Shipped",elm._id)}>Shipped</Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown> :
                                  elm.orderstatus === "Shipped" ?
                                    <Dropdown className=''>
                                      <Dropdown.Toggle id="dropdown-basic">
                                        {elm.orderstatus}
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu>
                                        <Dropdown.Item onClick={()=>handleOrderChange("Delivered",elm._id)}>Delivered</Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown> : elm.orderstatus

                              }
                            </td>
                            <td>
                              <div>
                                <i class="fa-solid fa-trash" style={{ color: "red" }}></i>
                              </div>
                            </td>
                          </tr>
                        </>
                      )
                    })
                      :
                      <div className='no_data text-center'>NO Data Found</div>
                  }
                </tbody>
              </Table>

            </Card>
          </div>
        </Row>

      </div>
    </>
  )
}

export default Orders