import React from 'react'
import './style/choix.css'
import Logo from "../../assets/img/6.png";
import LogoDrote from "../../assets/img/18.JPG";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Choix = () => {
  const navigate=useNavigate()
  const goCreate=()=>{

    navigate("/create")
  }
  return (

        <div className='flexible'>
          <div className='gaucheChoix'>
             <div className="logoChoix">
              <img src={Logo} alt="" />
              <h1>ecourses</h1>
             </div>
             <div className='hbtn'>
         <h1>
              Start session course
              </h1>
           
              <div className="btnAcceuilChoix">
                          <button onClick={goCreate}>
                            <i class="fa-solid fa-add"></i>
                            Create
                          </button>
                          <div className="btnAcc2Choix">

                            <button>
                             <i class="fa-solid fa-right-to-bracket"></i>
                              Join  </button>
                          </div>
                        </div>
   
             </div>
            </div>
          <div className='droiteChoix'>
        <div className="imageChoix">
          <img src={LogoDrote} alt="" />
        </div>
          </div>
        </div>
 

  )
}

export default Choix