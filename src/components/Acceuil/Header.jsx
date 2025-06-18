import React from "react";
import "./style/header.css";
import Logo from "../../assets/img/6.png";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: 'white',
    borderRadius: '40px',
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: '500px', // taille fixe si tu veux limiter la largeur du modal
  },
}));



const Header = () => {
   const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
          <button onClick={handleClickOpen}>Log In</button>
        </div>
   <BootstrapDialog
  onClose={handleClose}
  aria-labelledby="customized-dialog-title"
  open={open}
>
  <DialogTitle
    id="customized-dialog-title"
    sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 28 }}
  >
    Sign up
  </DialogTitle>

  <DialogContent>
    <TextField
      fullWidth
      label="Nom"
      margin="normal"
      variant="outlined"
    />
    <TextField
      fullWidth
      label="Email"
      margin="normal"
      type="email"
      variant="outlined"
    />
    <TextField
      fullWidth
      label="Mot de passe"
      margin="normal"
      type="password"
      variant="outlined"
    />
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
    <Button
      fullWidth
      variant="contained"
      sx={{
        backgroundColor: '#033638',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        paddingY: 1.5,
        borderRadius: '8px',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#022c2e',
        },
      }}
    >
      Se connecter
    </Button>
  </DialogActions>
</BootstrapDialog>    </div>
    </div>
  );
};

export default Header;
