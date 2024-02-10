import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Paginations = ({pageCount,page,handlePrevious,handleNext,setPage}) => {
    return (
        <>
            {
                pageCount > 0 ?
                <div className="mt-3">
                <div className="pgaination_div d-flex justify-content-center mt-5">
                    <Pagination>
                        
                        <Pagination.Prev onClick={handlePrevious} />
                        {
                            Array(pageCount).fill(null).map((element,index)=>{
                                return (
                                    <>
                                        <Pagination.Item 
                                        active ={page === index+1 ? true : false}
                                        onClick={()=>setPage(index+1)}
                                        >{index + 1}</Pagination.Item>
                                    </>
                                )
                            })
                        }
                        <Pagination.Next onClick={handleNext} />
                        
                    </Pagination>
                </div>
            </div>
            :
            ""
            }
        </>
    )
}

export default Paginations