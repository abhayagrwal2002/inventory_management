import noteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    const host = "http://localhost:4000"
    const productsInitial = []
    const [products, setProducts] = useState(productsInitial)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")


    // get user data
    const getUser = async () => {
      // API Call 
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: 'POST',
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json()
      setName(json.name); 
      setEmail(json.email)  
    }

    // Get all product
  const getProduct = async () => {
    // API Call 
    const response = await fetch(`${host}/api/products/fetchallproducts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json)
    setProducts(json)
  }


// Add a Product
const addProduct= async(name,price,category)=>{
    // API Call
    const response = await fetch(`${host}/api/products/addproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({name,price,category})
      });
      const product = await response.json();
      setProducts(products.concat(product)) 
}

    // Delete a Product
const deleteProduct = async(id)=>{
    // API Call
    const response = await fetch(`${host}/api/Products/deleteProduct/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      console.log(json);
    console.log("Deleting the Product with id" + id);
    const newProducts = products.filter((product)=>{return product._id!==id})
    // props.showAlert("Deleted Successfully","success");
    setProducts(newProducts);
    
}

// Edit a Product
const editProduct = async (id, name,price,category) => {
    // API Call 
    const response = await fetch(`${host}/api/products/updateproduct/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({name, price, category})
    });
    const json = await response.json();
    console.log(json);

    // Logic to edit in client
    let newProducts = JSON.parse(JSON.stringify(products))
    for (let index = 0; index < newProducts.length; index++) {
      const element = newProducts[index];
      if (element._id === id) {
        newProducts[index].name = name;
        newProducts[index].price = price;
        newProducts[index].category = category;
        break;
      }
    }
    setProducts(newProducts);
}

const ChangePass=async(password)=>{
   // API Call 
   const response = await fetch(`${host}/api/auth/updatepassword`, {
    method: 'PUT',
    headers: {
      "auth-token": localStorage.getItem('token'),
    },
    body: JSON.stringify({password})
  });
  const json = await response.json();
  console.log(json);
}
    return(
      <noteContext.Provider value={{products, addProduct,deleteProduct,editProduct,getProduct,name,email,getUser,ChangePass}}>
        {props.children}
    </noteContext.Provider>
    )

}

export default NoteState; 