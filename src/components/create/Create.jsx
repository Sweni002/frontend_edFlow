import React, { useEffect, useRef, useState } from 'react'
import './style/create.css'
import Logo from "../../assets/img/6.png";
import LogoAcceuil from "../../assets/img/3.jpeg";
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';

const Create = () => {
  const navigate=useNavigate()
const [title , setTitle]=useState('')
const [descr ,setDescr]=useState('')
  const fileInputRef = useRef(null);
  const [fileNames, setFileNames] = useState([]);
 const [userId, setUserId] = useState(null); // <- ici on stocke l'id de l'utilisateur
const [titleError, setTitleError] = useState(false);

  const [loading ,setLoading]=useState(false)
  const handleDivClick = () => {
    fileInputRef.current.click(); // ouvrir le sélecteur de fichier
  };
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch("http://127.0.0.1:8000/auth/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const result = await response.json();
          console.log('moi', result);
          setUserId(result.id); // stocker l'id
        } else {
          const errorData = await response.json();
          console.error("Erreur de récupération d'user :", errorData);
          alert("Échec de récupération : " + (errorData.detail || "Erreur inconnue"));
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Erreur réseau.");
      }
    };

    fetchUser(); // appel
  }, []);
 const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFileNames = [...fileNames];

    selectedFiles.forEach((file) => {
      if (!newFileNames.includes(file.name)) {
        newFileNames.push(file.name);
      }
    });

    setFileNames(newFileNames);
  };

  const removeFile = (index) => {
    const updated = [...fileNames];
    updated.splice(index, 1);
    setFileNames(updated);
  };
const goVideo = (e) => {

    e.preventDefault();
      setLoading(true)
 if (title.trim() === "") {
    setTitleError(true);
     setLoading(false)
    return;
  } else {
    setTitleError(false);

  }

    const formData = {
      title: title,
      description: descr,
      user_id: userId
    };
    
      
    console.log("FormData to send:", formData);
    setLoading(false)
     };

   
   const goChoix=() =>{

    navigate("/choix")
  }
  return (
        <div>

 <div className="formContainer">

    <form className="formBox">

      <div className='enteteCreate'>
         <div className='close'>
  <i className="fa-solid fa-arrow-left" style={{fontSize:22}} 
  onClick={goChoix}></i>
 
  </div>
  <h1>Create a session</h1>

      </div>
    
    <div className="formInputGroup">
      <label htmlFor="nomProjet">
        Title of course <span className="required">*</span>
      </label>
      <p className="inputHint">Example : Biologie  , Suite numérique</p>
     <input
  id="nomProjet"
  className={`cleanInput ${titleError ? "errorBorder" : ""}`}
  type="text"
  value={title}
  onChange={(e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() !== "") setTitleError(false); // désactiver l'erreur
  }}
/>
{titleError && (
  <p className="errorMessage">Title is required</p>
)}

    </div>

    <div className="formInputGroup">
      <label htmlFor="membres">
        Description <span className="required">*</span>
      </label>
      <p className="inputHint">Please enter the course description (optional). </p>
      <textarea id="membres" className="cleanInput" rows="4"  value={descr}
       onChange={(e)=>setDescr(e.target.value)}/>
    </div>

    <div className="formInputGroup">
      <label htmlFor="contact">
        Documents <span className="required">*</span>
      </label>

      <p className="inputHint">Please choose a file (optional)</p>
 <input
  type="file"
  multiple  // ✅ Important : autorise la sélection de plusieurs fichiers
  ref={fileInputRef}
  style={{ display: 'none' }}
  onChange={handleFileChange}
/>
     <div className='doc' onClick={handleDivClick} >
      <p>
          {fileNames.length > 0
            ? fileNames.map((name, index) => (
                <span key={index} style={{ marginRight: '10px' }}>
                  {name}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // évite d'ouvrir à nouveau le sélecteur
                      removeFile(index);
                    }}
                    style={{
                      fontSize : 18 ,
                      marginLeft: '5px',
                      color: 'red',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
         <i class="fa-solid fa-circle-xmark"></i>           </button>
                </span>
              ))
            : ''}
        </p>     <i class="fa-solid fa-link" style={{color :"grey" ,
          fontSize : 20
         }}></i>
    
     </div>
      </div>
    <div className="suivant">
      <button onClick={goVideo}>  {loading ? <Spin size="default" /> : "Suivant"}
      
       </button>
    </div>
  </form>
</div>


</div>
  )

}
export default Create