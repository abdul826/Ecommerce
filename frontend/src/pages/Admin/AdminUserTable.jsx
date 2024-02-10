import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import {NavLink} from "react-router-dom"
import "./tabel.scss"
import Paginations from '../../components/Pagination/Paginations';
import { useDispatch, useSelector } from 'react-redux';
import { dleteUserByAdmin } from '../../redux/slice/UserAuthSlice/UserAuthSlice';

const AdminUserTable = ({getAllUserData,page,pageCount,setPage,handleNext,handlePrevious}) => {

  const {DeleteUserData} = useSelector((state)=> state.User);

  // console.log("DeleteUserData=>", DeleteUserData);

  let allUsers = getAllUserData?.userData;
  // console.log(getAllUserData.userData);

  const dispatch = useDispatch();

    const handleDeleteUser = (id)=>{
      const data={
        userid : id
      }
      
      dispatch(dleteUserByAdmin(data))
    }

  return (
    <>
         <div className="container">
            <h4>Users</h4>
        <Row>
          <div className="col mt-0 mb-3">
            <Card className='shadow'>
              <Table className='align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                   
                    
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                   allUsers?.length > 0 ? allUsers?.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1 + (page - 1)*4}</td> 
                            <td>{element.firstname}</td>
                            <td>{element.email}</td>
                           
                           
                            <td className='img_parent'>
                              <img src={element.userprofile} alt="img" />
                            </td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                 
                                  <Dropdown.Item >
                                    <div onClick={()=>handleDeleteUser(element._id)}>
                                      <i class="fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      )
                    }) :
                     <div className='no_data text-center'>NO Data Found</div>
                  } 


                </tbody>
              </Table>
              <Paginations
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                    page={page}
                    pageCount={pageCount}
                    setPage={setPage}
                     />
            </Card>
          </div>
        </Row>
        
      </div>
    </>
  )
}

export default AdminUserTable