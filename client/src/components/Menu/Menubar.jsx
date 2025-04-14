import React from "react";
import "./Menubar.css";
import { IoMdCamera } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Toaster,toast } from "react-hot-toast";

const Menubar = () => {
  const navigate=useNavigate()
  const handlelogout=()=> {
    localStorage.removeItem('token')
    toast.success("Logged Out Successfully")
    navigate('/')
  }
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <div className="sidebar">
      {/* Title */}
      <div className="sidebar-title">PixelVault</div>

      {/* Menu Options */}
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <IoMdCamera size={22} />
          <Link to="/myimages">My Photos</Link>
        </li>
        <li className="sidebar-item">
          <MdFavorite size={22} />
          <Link to="/favourites">Favourites</Link>
        </li>
        <li className="sidebar-item">
          <FaTrash size={22} />
          <Link to="/trash">Trash</Link>
        </li>
      </ul>

      {/* Log Out */}
      <div className="sidebar-logout">
        <MdLogout size={22} />
        <button onClick={handlelogout} style={{backgroundColor:"transparent"}}>Log Out</button>
      </div>
    </div>
    </>
  );
};

export default Menubar;
