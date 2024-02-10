import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { toast } from 'react-hot-toast';
import { AdminAddCategory } from '../../redux/slice/productSlice/productSlice';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { AdminAddCategory } from '../../redux/slice/adminAuthSlice/AdminSlice';
// import toast from 'react-hot-toast';

const AddCategory = () => {

    const [inputVal, setInputVal] = useState({
        categoryname:"",
        description:""
    });

    const dispatch = useDispatch();

    const handleChange = (e)=>{
        const {name,value} = e.target;

        setInputVal({
            ...inputVal,
            [name]:value
        })
    }


    const handleAddCategory = (e)=>{
        e.preventDefault();

        const {categoryname,description} = inputVal;

        if(categoryname === ''){
            toast.error("Category is required")
        }else if(description === ''){
            toast.error("Description is required")
        }else{
            dispatch(AdminAddCategory(inputVal)).then((res)=>{
                setInputVal({
                    ...inputVal, categoryname:"", description:""
                })
            })
        }
    }

    
    return (
        <>
            <div className="container">
                <section>
                    <div className="form_data">
                        <div className="form_heading">
                            <h1>Add Category</h1>
                        </div>

                        <form>
                            <div className="form_input">
                                <label htmlFor="category">Category Name</label>
                                <input type="text"  value={inputVal.categoryname} name="categoryname" id="category" onChange={handleChange} />
                            </div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" value={inputVal.description} name='description' rows={3} onChange={handleChange} />
                            </Form.Group>

                            <button className='btn' onClick={handleAddCategory}>Submit</button>
                        </form>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AddCategory