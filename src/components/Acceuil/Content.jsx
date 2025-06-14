import React from "react";
import "./style/content.css";
import { Card } from "antd";
import LogoAcceuil from "../../assets/img/3.jpeg";
import Logo1 from "../../assets/img/12.jpg";
import Logo2 from "../../assets/img/4.jpg";
import Logo3 from "../../assets/img/11.jpeg";
import Logo4 from "../../assets/img/15.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Content = () => {
  const { Meta } = Card;
  const title1 = " Quality of Education";
  const description1 =
    "Enable students in all regions to attend live lessons through video, breaking geographical and economic barriers";
  const title2 = "Encourage Real-Time";
  const description2 =
    "Allow students to ask questions during live sessions, fostering engagement and better understanding.";
  const title3 = "Provide On-Demand";
  const description3 =
    "Give students access to recorded lessons and lesson summaries for flexible review and self-paced learning.";
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
              Let's transform <br />{" "}
              <span style={{ color: " #06B4BA" }}>education </span> together
            </h1>
            <p>
              whether you are teacher or studient ,discover <br />a new way to
              learn together,wherever you are.
            </p>

            <div className="btnAcceuil">
              <button>
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
