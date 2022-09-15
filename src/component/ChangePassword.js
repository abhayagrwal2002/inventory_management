import React,{useState,useContext} from 'react'
import noteContext from "../context/notes/noteContext"

const ChangePassword = () => {
    const context = useContext(noteContext);
    const {ChangePass,email} = context;
    const[pass,setPass] =useState("");

    const handleClick = ()=>{
        ChangePass(pass);
    }

    const onChange = (e)=>{
        setPass(e.target.value)
        console.log(pass);
    }
  return (
    <div>
<form class="row g-3">
    <div class="col-auto">
    <label for="staticEmail2" class="visually-hidden">Email</label>
    <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value={email}/>
    </div>
    <div class="col-auto">
    <label for="inputPassword2" class="visually-hidden">Password</label>
    <input type="password" class="form-control" id="inputPassword2" value={pass} placeholder="Password" onChange={onChange}/>
    </div>
    <div class="col-auto">
    <button type="submit" class="btn btn-primary mb-3" onClick={handleClick}>Change Password</button>
    </div>
</form>
    </div>
  )
}

export default ChangePassword
