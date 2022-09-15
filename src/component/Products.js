import React, {useContext,useEffect ,useRef, useState} from 'react'
import noteContext from "../context/notes/noteContext"
import AddProduct from './AddProduct';
import Productitem from './ProductItem';
import { useNavigate } from 'react-router-dom'
import ChangePassword from './ChangePassword';

const Product = (props) => {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const {products, getProduct,editProduct} = context;
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getProduct()
        }
        else
        {
            navigate("/login")
        }
        // eslint-disable-next-line 
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [product, setProduct] = useState({ename: "", eprice: "", ecategory: ""})

    const updateProduct = (currentProduct) => {
        ref.current.click();
        setProduct({id:currentProduct._id, ename: currentProduct.name, eprice: currentProduct.price, ecategory:currentProduct.category})
    }

    const handleClick = (e)=>{
        editProduct(product.id, product.ename, product.eprice, product.ecategory)
        refClose.current.click(); 
    }

    const onChange = (e)=>{
        setProduct({...product, [e.target.name]: e.target.value})
    }

    // const ChangePass=()=>{
    //     <ChangePassword/>
    // }
    return (
        <div className='container'> 
         <AddProduct/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="ename" name="ename" value={product.ename} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" className="form-control" row="5" id="eprice" name="eprice" value={product.eprice} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                <label htmlFor="inputState" className="form-label">Category</label>
                                <select id="ecategory" className="form-control" value={product.ecategory} name="ecategory" onChange={onChange} >
                                <option selected>General</option>
                                <option selected>Personal</option>
                                <option selected>Business</option>
                                <option selected>Education</option>
                                </select>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  disabled={product.ename.length<3 || product.eprice.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Product</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Products</h2>
                <div className="container mx-2"> 
                {products.length===0 && 'No products to display'}
                </div>
                {products.map((product) => {
                    return <Productitem key={product._id} updateProduct={updateProduct} product={product} />
                })}
            </div>
            {/* <button type='btn' onClick={ChangePass}>Change Password</button> */}
            
            <ChangePassword/>
            </div>
    )
}

export default Product