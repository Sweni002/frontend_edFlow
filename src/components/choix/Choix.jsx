import React from "react";
import "./style/choix.css";
import Logo from "../../assets/img/6.png";
import LogoDrote from "../../assets/img/18.JPG";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Input, Select, Space } from "antd";
const { Search } = Input;

const Choix = () => {
  const navigate = useNavigate();
  const goCreate = () => {
    navigate("/create");
  };
    const goBack = () => {
    navigate("/");
  };
  return (
    <div className="flexible">
      <div className="gaucheChoix">
        <div className="logoChoix">
          <img src={Logo} alt="" />
          <h1>ecourses</h1>
        </div>
        <div className="hbtn">
          <h1>Start session course</h1>

          <div className="btnAcceuilChoix">
          <button className="createBtn" onClick={goCreate}>
    <i className="fa-solid fa-video"></i>
    Create
  </button>
        
            <div className="inputJoinContainer">
  <div className="inputBox">
  <i className="fa-solid fa-keyboard" style={{fontSize : 23 ,color :"black"}}></i> 
    <input
      type="text"
      placeholder="Enter a code to join"
      className="customInput"
    />
  </div>
  <button className="joinBtn" disabled>
    <i class="fa-solid fa-arrow-right-to-bracket"></i>
  </button>

            </div>
          </div>
   
     <div className="footer">
          <div className="deconnecter">
            <button onClick={goBack}>
       <i class="fa-solid fa-arrow-left" style={{paddingRight : 15}}></i>
           Back
            </button>
             
          </div>
      </div>
        </div>
    
   
  </div>
           <div className="droiteChoix">
        <div className="imageChoix">
          <img src={LogoDrote} alt="" />
        </div>
      </div> 
    </div>
  );
};

export default Choix;
