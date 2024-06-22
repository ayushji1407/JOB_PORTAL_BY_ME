import React, { useContext, useState } from 'react'
import {Context} from "../index"
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import Logo from "../Image/joblogofinal.png";
import RegisterLogo from "../Image/ragisterFinal.jpg"
import { FaPencilAlt, FaRegUser} from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { RiLock2Fill } from "react-icons/ri";

const Ragister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState();

  const {isAuthorized, setIsAuthorized,} = useContext(Context);

  const handleRegister = async(e)=>{
    e.preventDefault();
    try{
      
    const {data} = await axios.post(
      "http://localhost:5000/api/v1/user/ragister",
      {name, phone, email,role,password},
      {
        withCredentials: true,
        headers:{
          "Content-Type":"application/json"
        }
      }
    );
    toast.success(data.message);
    setEmail("");
    setName("");
    setPhone("");
    setPassword("");
    setRole("");
    setIsAuthorized(true);

    }catch(error){
      toast.error(error.response.data.message)
    }
  };

  if(isAuthorized){
    return<Navigate to={"/"}/>
  }
  return (
    <>
    <div className='authPage'>
      <div className='container'>
        <div className='header'>
          <img src={Logo} alt='logo'/>
          <h3>Create a New Account</h3>
        </div>
        <form>
          <div className='inputTag'>
            <label>Register As</label>
            <div>
              <select value={role} onChange={(e)=>setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser/>
            </div>
          </div>
          <div className='inputTag'>
            <label>Name</label>
            <div>
              <input type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter Your Name'/>
              <FaPencilAlt />
            </div>
          </div>
          <div className='inputTag'>
            <label>Email Address</label>
            <div>
              <input type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Your Eamil'/>
              <MdOutlineMailOutline />
            </div>
          </div>
          <div className='inputTag'>
            <label>Phone</label>
            <div>
              <input type='number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='Enter Your Phone Number'/>
              <FaPhoneFlip />
            </div>
          </div>
          <div className='inputTag'>
            <label>Password</label>
            <div>
              <input type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Your Password'/>
              <RiLock2Fill />
            </div>
          </div>
          <button onClick={handleRegister} type='submit'>Register</button>
          <Link to={"/login"}>Login Now</Link>
        </form>
      </div>
      <div className='banner'>
        <img src={RegisterLogo} alt='register'/>
      </div>
    </div>
    </>
  )
}

export default Ragister