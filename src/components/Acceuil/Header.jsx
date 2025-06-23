import React, { useState } from "react";
import "./style/header.css";
import Logo from "../../assets/img/6.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom"
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Spin } from 'antd';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "white",
    borderRadius: "40px",
    padding: theme.spacing(4),
    width: "100%",
    maxWidth: "500px", // taille fixe si tu veux limiter la largeur du modal
  },
}));

const Header = ({ openLogin, setOpenLogin}) => {
  const navigate=useNavigate()
  const [nom, setNom] = useState("");
  const [email, setMail] = useState("");
  const [mdp, setMdp] = useState("");

  const [emailLogin ,setMailLogin]=useState('')
  const [mdpLogin  , setMdpLogin]=useState('')
  const [logout ,setOut] =useState(false)
const [loading ,setLoading] =useState(false)
const [submitted, setSubmitted] = useState(false);
const [submittedMdp, setSubmittedMdp] = useState(false);
const [submittedMail, setSubmittedMail] = useState(false);

const [loadingLogin ,setLoadingLogin]=useState(false)
const [loadingOut ,setLoadingOut]=useState(false)

const [submittedMdpLogin, setSubmittedMdpLogin] = useState(false);
const [submittedMailLogin, setSubmittedMailLogin] = useState(false);

  const [openSign, setOpenSign] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false); // <-- pour le menu déroulant
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(()=> {
 const token = localStorage.getItem("token");

  if (!token) {
    setOut(true)
  }
   
  } ,[] )
  const handleClickOpenMenu = () => {
    setOpen(true);
    setMenuOpen(false); // fermer le menu si ouvert
  };
  const handleClickOpen = () => {
    setOpenSign(false);
    setOpenLogin(true);
  };
  const handleClose = () => {
    setOpenLogin(false);
  };
  const handleCloseSign = () => {
    setOpenSign(false);
  };

  const openSignin = () => {
    setOpen(false);
    setOpenSign(true);
  };

const  goChoix =()=>{
  navigate("/choix")
}
const handleSignin = async () => {
  setSubmitted(true);
 setSubmittedMail(true)
 setSubmittedMdp(true)
 
  if(!nom || !email || !mdp){
      return;
  }
  setLoading(true)
  const data = {
    name: nom,
    email: email,
    password: mdp,
  };


  try {
    const response = await fetch("http://127.0.0.1:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
       localStorage.setItem("token", result.access_token);

      console.log("Inscription réussie :", result);
      setOpenSign(false);
       goChoix()
    } else {
      const errorData = await response.json();
      console.error("Erreur d'inscription :", errorData);
      alert("Échec de l'inscription : " + (errorData.detail || "Erreur inconnue"));
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
    alert("Erreur réseau lors de l'inscription.");
  } finally {
    setLoading(false); 
     }

  }

  const handleLogin = async () => {
  setSubmittedMailLogin(true);
 setSubmittedMdpLogin(true)

 
  if( !emailLogin || !mdpLogin){
      return;
  }
  setLoadingLogin(true)
  const data = {
      email: emailLogin,
    password: mdpLogin,
  };


  try {
    const response = await fetch("http://127.0.0.1:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
       localStorage.setItem("token", result.access_token);
       
      console.log("Authentification réussie :", result);
      setOpenSign(false);
       goChoix()
    } else {
      const errorData = await response.json();
      console.error("Erreur d'authentification :", errorData);
      alert("Échec de l'authentification : " + (errorData.detail || "Erreur inconnue"));
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
    alert("Erreur réseau lors de l'auth.");
  } finally {
    setLoadingLogin(false); 
     }
    
  }

  const handleLogOut =() =>{
    const token =localStorage.removeItem("token")
   window.location.reload()
    setOut(true)
    
  }
  return (
    <div className="navbar">
      <div className="logo">
        <div className="icon">
          <img src={Logo} alt="ceourses" />
        </div>
        <h1>ecourses</h1>
      </div>
      <div className="menuIcon" onClick={toggleMenu}>
        <span className="material-symbols-outlined">menu</span>
      </div>

      {menuOpen && (
        <div className="dropdownMenu" ref={dropdownRef}>
          <button className="menuBtn">Sign Up for free</button>
          <button className="menuBtn" onClick={handleClickOpen}>
            Log In
          </button>
        </div>
      )}
      <div className="button">
        
  { logout && (
    <div className="button">
    <div className="btn1">
          <button onClick={openSignin}>Sign Up for free</button>
        </div>
        <div className="btn2">
          <button onClick={handleClickOpen}>Log In</button>
        </div>
    
        </div>

        )

        }
        
      
        
            { !logout && (
       <div className="vueOut">
    <button onClick={handleLogOut}>
       {loadingOut? <Spin size="default" /> :
       <>  <i class="fa-solid fa-arrow-right-to-bracket" style={{paddingRight : 14}}></i>
                 Log out 
 </> }

 
       </button>
        </div>
 
        )

        }
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
              open={openLogin}
        >
          <div className="entete">
            <h1>Sign up</h1>
            <div className="siginin">
              <p style={{ textAlign: "center" }}>
                Don't have an acount ? <span onClick={openSignin}>Sign in</span>
              </p>
            </div>
          </div>

          <DialogContent>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
                 value={emailLogin}
              onChange={(e) => setMailLogin(e.target.value)}
       error={submittedMailLogin && emailLogin.trim() === ""}
  helperText={submittedMailLogin && emailLogin.trim() === "" ? "Email is required" : ""}

            />
            <TextField
              fullWidth
              label="Mot de passe"
              margin="normal"
              type="password"
              variant="outlined"
                 value={mdpLogin}
              onChange={(e) => setMdpLogin(e.target.value)}
        error={submittedMdpLogin && mdpLogin.trim() === ""}
  helperText={submittedMdpLogin && mdpLogin.trim() === "" ? "Password is required" : ""}

            />
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
              onClick={handleLogin}
            >
 {loadingLogin ? <Spin size="default" /> : "Login"}

            </Button>
          </DialogActions>
        </BootstrapDialog>

        <BootstrapDialog
          onClose={handleCloseSign}
          aria-labelledby="customized-dialog-title"
          open={openSign}
        >
          <div className="entete">
            <h1>Sign in</h1>
            <div className="siginin">
              <p style={{ textAlign: "center" }}>
                Already have an acount ?{" "}
                <span onClick={handleClickOpen}>Sign up</span>
              </p>
            </div>
          </div>

          <DialogContent>
          <TextField
  fullWidth
  label="Name"
  value={nom}
  onChange={(e) => setNom(e.target.value)}
  type="text"
  variant="outlined"
  error={submitted && nom.trim() === ""}
  helperText={submitted && nom.trim() === "" ? "Name is required" : ""}
/>

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              type="email"
              variant="outlined"
                value={email}
              onChange={(e) => setMail(e.target.value)}
            error={submittedMail && email.trim() === ""}
  helperText={submittedMail && email.trim() === "" ? "Mail is required" : ""}

            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type="password"
              variant="outlined"
                value={mdp}
              onChange={(e) => setMdp(e.target.value)}
            error={submittedMdp && mdp.trim() === ""}
  helperText={submittedMdp && mdp.trim() === "" ? "Password is required" : ""}

            />
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
              onClick={handleSignin}
         
>
  {loading ? <Spin size="default" /> : "Sign in"}

      </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </div>
  );
};

export default Header;
