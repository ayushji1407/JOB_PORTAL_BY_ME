import './App.css';
import React, {useEffect, useContext} from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import {Context} from "./index"
import Login from "./Auth/Login";
import Ragister from "./Auth/Ragister";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import Home from "./Home/Home";
import Jobs from "./Job/Jobs";
import JobDetails from "./Job/JobDetails";
import MyJobs from "./Job/MyJobs";
import PostJobs from "./Job/PostJobs";
import Application from './Application/Application';
import MyApplications from "./Application/MyApplications"
import NotFound from "./NotFound/Nofound"
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

const App = ()=>{
  const {isAuthorized, setIsaAuthorized, setUser} = useContext(Context);

  useEffect(() =>{
    const fetchUser = async () =>{
      try{
        const response = await axios.get("http://localhost:5000/api/v1/user/getuser",{withCredentials: true});
        setUser(response.data.user)
        setIsaAuthorized(true)
      }catch(error){
        // setIsaAuthorized(false)
      }
    }
    fetchUser();
  },[isAuthorized])

 
  return (
    < >
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/ragister' element={<Ragister/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/job/getall' element={<Jobs/>}/>
          <Route path='/job/:id' element={<JobDetails/>}/>
          <Route path='/job/post' element={<PostJobs/>}/>
          <Route path='/job/me' element={<MyJobs/>}/>
          <Route path='/application/:id' element={<Application/>}/>
          <Route path='/application/me' element={<MyApplications/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footer/>
        <Toaster/>
      </Router>
    </>
  );
}

export default App;
