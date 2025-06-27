import React, { useEffect, useState } from "react";
import "./style/choix.css";
import Logo from "../../assets/img/6.png";
import LogoDrote from "../../assets/img/18.JPG";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Input, Select, Space ,Spin ,message } from "antd";
const { Search } = Input;

const Choix = () => {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState("");
const [loading ,setLoading]=useState(false)
  const [messageApi, contextHolder] = message.useMessage();
 const [errorVisible, setErrorVisible] = useState(false);

useEffect(() => {
  if (errorVisible) {
    messageApi.open({
      type: 'error',
      content: 'Code not found',
    });
    setErrorVisible(false); // reset pour ne pas boucler
  }
}, [errorVisible, messageApi]);

const errorC = () => {
  setErrorVisible(true);
};


  const goCreate = () => {
    navigate("/create");
  };
    const goBack = () => {
    navigate("/");
  };
 const handleJoin = async () => {
  setLoading(true)
  const code = joinCode.trim();
  if (!code){
setLoading(false)
 return;
  } 

  try {
    const token = localStorage.getItem("token");

    // 1. Vérifie que la session existe via le code
    const sessionRes = await fetch(`http://127.0.0.1:8000/sessions/by-code/${code}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!sessionRes.ok) {
      // Code inexistant → rester ou afficher une erreur
      console.error("Code invalide");
      errorC()
      setLoading(false)
      return;
    }

    const sessionData = await sessionRes.json();
    const sessionId = sessionData.id;

    // 2. Récupérer l'utilisateur connecté
    const userRes = await fetch("http://127.0.0.1:8000/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!userRes.ok) {
      console.error("Utilisateur non authentifié");
      setLoading(false)
      return;
    }

    const userData = await userRes.json();
    const userId = userData.id;
setLoading(false)
    // 3. Rediriger vers /joign avec les infos nécessaires
    navigate("/joign", {
      state: {
        userId,
        sessionId ,
          fromCreate: true
      }
    });

  } catch (err) {
    console.error("Erreur lors de la vérification du code :", err);
  }
};

  return (
    <div className="flexible">
      {contextHolder}
      <div className="gaucheChoix">
        <div className="logoChoixs">
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
      value={joinCode}
      onChange={(e) => setJoinCode(e.target.value)}
    placeholder="Enter a code to join"
      className="customInput"
    />
  </div>
  <button className="joinBtn" disabled={!joinCode.trim()} onClick={handleJoin}>
     {loading ? <Spin size="default" /> : (
        <>
         <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </>
      )}
  
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
