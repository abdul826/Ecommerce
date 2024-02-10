import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { AdminGetCategory,AdminAddProducts } from '../../redux/slice/productSlice/productSlice';
// import {  } from '../../Api/ProductApis/ProductApi';
import { toast } from 'react-hot-toast';
// import { AddProductscall, getCategory } from '../../redux/slice/productSlice/ProductSlice';
// import toast from 'react-hot-toast';

const AddProducts = () => {

    const {CategoryData} = useSelector((state)=>state.Product);

    const dispatch = useDispatch();

    const [inputVal, setInputVal] = useState({
        productname:'',
        price:'',
        discount:'',
        productimage:'',
        quantity:'',
        description:""
    });

    const [productimg,setProductImg] = useState("");
    const [categoryId,setCategoryId] = useState("");

    const [categorystate,setcategorystate] = useState([]);

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setInputVal({...inputVal,[name]:value});
      }
  
      const handlesetCategory = (e)=>{
        const {value} = e;
        setCategoryId(value)
      }
  
      const handleProductImg = (e)=>{
        setProductImg(e.target.files[0]);
      }

      const handleSubmit = (e)=>{
        e.preventDefault();
  
        const {productname,price,quantity,description,discount} = inputVal;
  
        if (productname === "") {
          toast.error("productname is Required !");
        } else if (price === "") {
          toast.error("price is Required !");
        } else if (categoryId === "") {
          toast.error("categoryId is Required !");
        }else if(quantity == ""){
          toast.error("quantity is required");
        } else if(productimg == ""){
          toast.error("productimg is required");
        }else if (discount === "") {
          toast.error("discount is Required !");
        }else if(description === ""){
          toast.error("description is Required !");
        }else{
            // Form data ka use tb krte hai jb hm image upload krte hai
            const data = new FormData();
            data.append("productname",productname)
            data.append("productimage",productimg)
            data.append("price",price)
            data.append("discount",discount)
            data.append("quantity",quantity)
            data.append("description",description);
            
            // yaha pr config pr btana padega kyo ki image me hm multipart/form-data ka use krte hai 
            const config = {
            "Content-Type":"multipart/form-data"
            }

            // datasend me 3 values bhej rahe hai 
            // 1st data jisme frontend se jo b data jayega
            // 2nd categoryId ye hm url me asa query lenge kyo ki backend me hmne asa aquery get kiya hai
            // 3rd config is se header ko pta chalega URL me ki image aa rahi hai 
            const datasend={
            data,
            categoryId,
            config
            }
  
            dispatch(AdminAddProducts(datasend))
            .then((res)=>{
                if(res.payload){
                    setInputVal({...inputVal,productname:"",price:"",quantity:"",description:"",discount:""});
                    setProductImg("");
                    setCategoryId("Select Category");
                }
            }).catch((error)=>{
                console.log("err",error);
            })
        }

    }

    useEffect(()=>{
        dispatch(AdminGetCategory())
    },[])

    useEffect(()=>{
        let arr = []
        for(let i =0;i<CategoryData?.length;i++){

          let setcategoryval = {value:CategoryData[i]._id,label:CategoryData[i].categoryname}
          arr.push(setcategoryval);
        }
        setcategorystate(arr)
        
    },[CategoryData])


  return (
    <>
       <div className="container">
                <section>
                    <div className="form_data">
                        <div className="form_heading">
                            <h1>Add Products</h1>
                        </div>

                        <form>
                            <div className="form_input">
                                <input type="text" value={inputVal.productname} name="productname" onChange={handleChange}  placeholder='Products Name'/>
                            </div>
                            <div className="form_input">
                            <Select options={categorystate} onChange={handlesetCategory}  placeholder="Product category" />
                            </div>
                            <div className="form_input">
                                <input type="text" value={inputVal.price} name="price" onChange={handleChange}  placeholder='Price'/>
                            </div>
                            <div className="form_input">
                                <input type="text" value={inputVal.discount} name="discount" onChange={handleChange}  placeholder='discount'/>
                            </div>
                            <div className="form_input">
                                <input type="file" onChange={handleProductImg} name="productimage" />
                            </div>
                            <div className="form_input">
                                <input type="text" value={inputVal.quantity} name="quantity"  onChange={handleChange}  placeholder='quantity'/>
                            </div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" value={inputVal.description} onChange={handleChange} name='description' rows={3} />
                            </Form.Group>

                            <button className='btn' onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                </section>
            </div>
    </>
  )
}

export default AddProducts