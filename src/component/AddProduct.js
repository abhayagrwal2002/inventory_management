import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"
import '../App.css';

const AddProduct = () => {
     const context = useContext(noteContext);
     const {addProduct} = context;
     const{getUser} = context;
     const{name}=context;
     const [product, setProduct] = useState({name: "", price: "", category: ""})

     const handleClick = (e)=>{ 
         e.preventDefault();
         addProduct(product.name, product.price, product.category);
         setProduct({name: "", price: "", category: ""});
     }

     const onChange = (e)=>{
         setProduct({...product, [e.target.name]: e.target.value})
     }  
     getUser();
  return (
    <div className="container my-5">
            <h2 className= 'add-note-heading'>Hello</h2>
            <form className="my-3  add-note">
                <div className="my-3 ">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" value={product.name}aria-describedby="emailHelp" onChange={onChange} /> 
                </div>
                <div className="my-3 ">
                    <label htmlFor="price" className="form-label">Price:</label>
                    <input type="number"  className="form-control" id="price" row="5" value={product.price} name="price" onChange={onChange} />
                </div>
                <div>
                <label htmlFor="inputState" className="form-label">Category:</label>

                <select id="category" className="form-control" value={product.category} name="category" onChange={onChange} >
                <option selected>Grocery</option>
                <option selected>Furniture</option>
                <option selected>Clothes</option>
                <option selected>Other</option>
                </select>
                </div>
                <div className="text-center">
                <button disabled={product.name.length<3 || product.price.length<1} type="submit" className="btn btn-primary  text " onClick={handleClick}>Add Product</button>
                </div>
            </form>
        </div>
  )
}

export default AddProduct
