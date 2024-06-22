import React, { useContext } from 'react'
import {Context} from ".."
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const {isAuthorized} = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow":"footerHide"}>
      <div>
         &Copy: All Rights Reserved By Ayush Baghel.
      </div>
      <div>
        <Link to={"https://github.com/ayushji1407"} target='_blanck'><FaGithub/></Link>
        <Link to={"https://www.linkedin.com/in/ayush-baghel-660894257/"} target='_blanck'><FaLinkedin/></Link>
      </div>
    </footer>
  )
}

export default Footer