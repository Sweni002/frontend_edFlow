import React from "react";
import "./style/header.css";
import Logo from "../../assets/img/6.png";


const Header = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <div className="icon">
          <img src={Logo} alt="ceourses" />
        </div>
        <h1>ecourses</h1>
      </div>
            <div>
             <span class="material-symbols-outlined">
menu
</span>  
        </div>
      <div className="button">
        <div className="btn1">
          <button>Sign Up for free</button>
        </div>
        <div className="btn2">
          <button>Log In</button>
        </div>
  
       
      </div>
    </div>
  );
};

export default Header;
