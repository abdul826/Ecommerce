import React from 'react'
import AdminSidebar from '../../components/AdminCommonLayout/Adminheader/AdminSidebar'

const AdminCommonLayout = ({children}) => {
  return (
    <>
        <AdminSidebar >
            {children}
        </AdminSidebar >
    </>
  )
}

export default AdminCommonLayout