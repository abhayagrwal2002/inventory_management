import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"

const ProductItem = (props) => {
    const context =useContext(noteContext);
    const {deleteProduct} = context;
    const { product , updateProduct} = props;
  return (
    <div className="col-md-3"> 
    <div className="card my-3"> 
        <div className="card-body">
        <h5 className="card-title"><b>{product.name}</b></h5>
        <p className="card-text">₹{product.price}</p> 
        <i className="fa-solid fa-pen-to-square mx-2"onClick={()=>{updateProduct(product)}} ></i>
        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteProduct(product._id)}}></i>
        </div>
    </div>
</div>
  )
}

export default ProductItem
