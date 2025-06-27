import React, { useEffect, useRef, useState } from 'react'
import './style/create.css'
import Logo from "../../assets/img/6.png";
import LogoAcceuil from "../../assets/img/3.jpeg";
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogContentText from '@mui/material/DialogContentText';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "white",
    borderRadius: "40px",
    padding: theme.spacing(3),
    width: "100%",
    maxWidth: "500px", // taille fixe si tu veux limiter la largeur du modal
  },
}));
const Create = () => {
  const navigate=useNavigate()
const [title , setTitle]=useState('')
const [descr ,setDescr]=useState('')
const [sessionCode, setSessionCode] = useState('');

  const fileInputRef = useRef(null);
  const [fileNames, setFileNames] = useState([]);
 const [userId, setUserId] = useState(null); // <- ici on stocke l'id de l'utilisateur
const [titleError, setTitleError] = useState(false);
 const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
const [copied, setCopied] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
const uploadFiles = async (sessionId) => {
  const files = fileInputRef.current.files;
  setLoading(true)
  // ✅ Ne rien faire si aucun fichier sélectionné
  if (!files || files.length === 0) {
    setLoading(false)
    return;
  }

  const token = localStorage.getItem("token");

  for (let i = 0; i < files.length; i++) {
    const formData = new FormData();
    formData.append("file", files[i]);

    try {
      const response = await fetch(`http://127.0.0.1:8000/files/upload/${sessionId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Échec upload :", err);
   setLoading(false)
      }
      setLoading(false)
    } catch (err) {
      console.error("Erreur réseau lors de l'upload :", err);
      setLoading(false)
    }
  }
};

  const handleClose = () => {
    setOpen(false);
  };
  const handleCopy = () => {
  navigator.clipboard.writeText(sessionCode)
    .then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    })
    .catch((err) => {
      console.error("Erreur lors de la copie :", err);
    });
};
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
        // Si le token est invalide ou expiré
        localStorage.removeItem('token');
        navigate("/"); // redirection vers page d’accueil
      }
      } catch (error) {
      console.error("Erreur réseau :", error);
      localStorage.removeItem('token');
      navigate("/");
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

  const goVideo1 =async (e) => {

    e.preventDefault()
       setLoading(true)
 if (title.trim() === "") {
    setTitleError(true);
     setLoading(false)
    return;
  } else {
    setTitleError(false);

  }
   try {
    const response = await fetch("http://127.0.0.1:8000/sessions/generate-code");
    const result = await response.json();
    setSessionCode(result.code);  // stocker le code
    setOpen(true);                // ouvrir le modal
  } catch (err) {
    alert("Erreur de génération de code");
    console.error(err);
  }
  setLoading(false)
       setOpen(true)
  
  }
const goVideo = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = {
    title: title,
    description: descr,
    host_id: userId,
    code: sessionCode  // important !
  };

  try {
    const token = localStorage.getItem('token');

    const response = await fetch("http://127.0.0.1:8000/sessions/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('session créée :', result);
      setOpen(false);
         await uploadFiles(result.id);
    navigate("/create/video_call", {
  state: {
    userId: userId,
    sessionId: result.id  ,
    fromCreate: true
  }
});    } else {
      const errorData = await response.json();
      alert("Erreur : " + (errorData.detail || "Erreur inconnue"));
    }
  } catch (err) {
    alert("Erreur réseau");
    console.error(err);
  }

  setLoading(false);
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
      <button onClick={goVideo1}>  {loading ? <Spin size="default" /> : "Next"}
      
       </button>
    </div>
  </form>
      <BootstrapDialog
          open={open}
        onClose={handleClose}
       aria-labelledby="customized-dialog-title"
          >
                 <div className={{ display :"flex" , justifyContent :"center"}}>
                   {copied && (
  <p style={{ color: "green", textAlign: "center", marginTop: "10px" }}>
    Code copié !
  </p>
)}
              </div>
            <div style={{display :"flex" ,width :"100%" ,
              alignItems :"center" ,justifyContent :"flex-end"
            }}>
         
               <i
    className="fa-solid fa-xmark"
    onClick={handleClose}
    style={{
      cursor: "pointer",
      fontSize: 22,
      color: "#333",
    }}
  ></i>
            </div>
        <DialogTitle id="responsive-dialog-title">
          {"Code of session :"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div className='code'>
     <div className='rect' onClick={handleCopy}>
        <p>{sessionCode}</p>
     </div>
     <div className='copie'  onClick={handleCopy} >
       <i class="fa-regular fa-copy"></i>
     </div>
  
          </div>
                  </DialogContentText>
        </DialogContent>
       <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
    <Button
  variant="contained"
  sx={{
    width: "100%",
    backgroundColor: "#033638",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    paddingY: 1.5,
    borderRadius: "8px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#022c2e",
    },
  }}
  onClick={goVideo}
>
  {loading ? <Spin size="default" /> : (
    <>
      <i className="fa-solid fa-video" style={{ marginRight: 8 , marginTop : 3 }}></i>
      Start
    </>
  )}
</Button>
             </DialogActions>
      </BootstrapDialog>

</div>
 
</div>
  )

}
export default Create