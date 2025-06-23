import React from "react";
import "./style/content.css";
import { Card } from "antd";
import LogoAcceuil from "../../assets/img/3.jpeg";
import Logo1 from "../../assets/img/12.jpg";
import Logo2 from "../../assets/img/4.jpg";
import Logo3 from "../../assets/img/11.jpeg";
import Logo4 from "../../assets/img/15.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";


const Content = ({openLoginModal}) => {
  const navigate=useNavigate()

  const goChoix=()=>{
      const token = localStorage.getItem("token");
     
       if (!token) {
        openLoginModal()
         return ;

         }   
    navigate('/choix')

  }
  const { Meta } = Card;
  const title1 = "Interactive Live Learning";
  const description1 =
    "Deliver a real-time learning experience where students can follow the session live, ask questions, and engage directly with the instructor";
  const title2 = "Seamless Session Access";
  const description2 =
    "Allow users to easily create or join live sessions through a simple, user-friendly interface — no technical setup required.";
  const title3 = "Controlled Communication";
  const description3 =
    "Empower session creators to fully manage the flow of interaction by approving questions, handling participant audio/video settings, and keeping the session organized.";
  const title4 = "Support Personalized";
  const description4 =
    "Adapt the platform to individual needs by offering interactive tools, downloadable materials, and continuous support.";
  return (
    <div>
      <div className="content">
        <div className="imgAcceuil">
          <img src={LogoAcceuil} alt="acceuil" />
          <div className="texte">
         <h1>
  Learn and Teach <span style={{ color: "#06B4BA" }}>Live</span>
</h1>
<p>
  Start a session to share your knowledge,<br />
  or join one to connect, ask, and learn in real time.
</p>

            <div className="btnAcceuil">
              <button onClick={goChoix}>
                <i class="fa-solid fa-arrow-right"></i>
                Get started
              </button>
              <div className="btnAcc2">
                <button>Learn more</button>
              </div>
            </div>
          </div>
        </div>
        <div className="browser">
          <h1>Why ecourses ?</h1>
          <div className="card">
            <div className="cardImg">
              <img alt="example" src={Logo1} />
              <div className="gauche">
                       <h2>{title1}</h2>
                <p>{description1}</p>
           

              </div>
                    </div>
                           <div className="cardImg">
              <img alt="example" src={Logo2} />
              <div className="gauche">
                       <h2>{title2}</h2>
                <p>{description2}</p>
           

              </div>
                    </div>

       <div className="cardImg">
              <img alt="example" src={Logo4} />
              <div className="gauche">
                       <h2>{title3}</h2>
                <p>{description3}</p>
           

              </div>
                    </div>

        </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
