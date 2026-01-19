import { useState } from "react";
import axios from "axios";
import "./Register.css";

export default function Register(){
  const [data,setData] = useState({name:"",email:"",password:""});

  const submit = async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/register", data);
    alert("Registered");
  };

  return(
    <div className="register-container">
  <div className="register-card">
    <h2>Create Account</h2>

    <form onSubmit={submit}>
      <input placeholder="Name" onChange={e=>setData({...data,name:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setData({...data,password:e.target.value})}/>
      <button>Register</button>
    </form>
    </div>
    </div>
  );
}
