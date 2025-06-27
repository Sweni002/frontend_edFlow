import React, { useEffect, useRef, useState } from 'react';
import './style/video.css';
import Logo from '../../assets/img/6.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogContentText from '@mui/material/DialogContentText';
import Button from "@mui/material/Button";
import { Spin } from 'antd';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "white",
    borderRadius: "30px",
    padding: theme.spacing(1),
    width: "100%",
    maxWidth: "300px", // taille fixe si tu veux limiter la largeur du modal
  },
}));
const VideoCall = () => {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [inCall, setInCall] = useState(true);
    const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [isCommentActive, setIsCommentActive] = useState(true);
  const [isDocActive, setIsDocActive] = useState(false);
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
const navigate=useNavigate()
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);
 const location = useLocation();
  const { userId, sessionId } = location.state || {};
 const [sessionFiles, setSessionFiles] = useState([]);
const [screenSharing, setScreenSharing] = useState(false);
const screenTrackRef = useRef(null);
const messageEndRef = useRef(null);
const fileInputRef = useRef(null);
 const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [loading ,setLoading]=useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };
    const handleClose = () => {
    setOpen(false);
  };

  const goBack=()=>{
    
    navigate("/choix")

  }
  useEffect(() => {
    if (!location.state?.fromCreate) {
      // pas autorisé, redirige vers Create
      navigate('/create', { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    console.log("User ID:", userId);
    console.log("Session ID:", sessionId);
  }, [userId, sessionId]);
  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Erreur caméra/micro :', err);
      }
    };

    startMedia();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interim = '';
      let final = finalTranscript;

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript + ' ';
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      setFinalTranscript(final);
      setInterimTranscript(interim);
    };

    recognition.onerror = (event) => {
      console.error('Erreur reconnaissance vocale:', event.error);
    };

    recognitionRef.current = recognition;
    recognition.start();

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);
  useEffect(() => {
  if (messageEndRef.current) {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [messages]);

useEffect(() => {
  if (!sessionId) return;


  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://127.0.0.1:8000/files/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const files = await res.json();
        console.log(files)
        setSessionFiles(files);
      } else {
        console.error("Erreur chargement fichiers");
      }
    } catch (error) {
      console.error("Erreur réseau fichiers :", error);
    }
  };

  fetchFiles();
}, [sessionId]);
const fetchFiles = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://127.0.0.1:8000/files/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const files = await res.json();
      setSessionFiles(files);
    } else {
      console.error("Erreur chargement fichiers");
    }
  } catch (error) {
    console.error("Erreur réseau fichiers :", error);
  }
};
useEffect(() => {
  if (sessionId) fetchFiles();
}, [sessionId]);

useEffect(() => {
  const fetchMessages = async () => {
    if (!sessionId) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/comments/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data);console.log("messagsv:" , data)
   
      } else {
        console.error("Erreur de récupération des messages");
      }
    } catch (error) {
      console.error("Erreur réseau lors du chargement des messages :", error);
    }
  };

  fetchMessages();
}, [sessionId]);


  const stopMedia = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setInCall(false);
  };

  const toggleMic = () => {
    if (!streamRef.current) return;
    const audioTrack = streamRef.current.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
      if (recognitionRef.current) {
        audioTrack.enabled ? recognitionRef.current.start() : recognitionRef.current.stop();
      }
    }
  };

  const toggleCam = () => {
    if (!streamRef.current) return;
    const videoTrack = streamRef.current.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setCamOn(videoTrack.enabled);
    }
  };
useEffect(() => {
  if (!userId || !sessionId) return;

  const timer = setTimeout(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${sessionId}/${userId}`);

    socket.onopen = () => {
      console.log("✅ WebSocket connecté");
      setWs(socket);
    };

socket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    setMessages((prev) => [...prev, data]);
  } catch {
    if (event.data === "__fichier_ajoute__") {
      // ✅ Mise à jour des fichiers en temps réel
      fetchFiles();
    } else {
      setMessages((prev) => [...prev, { user_id: "Système", message: event.data }]);
    }
  }
};



    socket.onerror = (error) => {
      console.error("❌ WebSocket erreur :", error);
    };

    socket.onclose = () => {
      console.log("❌ WebSocket déconnecté");
    };

    setWs(socket);

  }, 300); // attendre 300ms avant de créer la WebSocket

  return () => clearTimeout(timer);
}, [userId, sessionId]);

const handleSend = () => {
  if (newMessage.trim() !== "" && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(newMessage.trim());
    setNewMessage("");
  }
};

const shareScreen = async () => {
  try {
    if (!screenSharing) {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];
      screenTrackRef.current = screenTrack;

      // Affiche le partage dans la vidéo
      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
      }

      screenTrack.onended = () => {
        stopScreenSharing();
      };

      setScreenSharing(true);
    } else {
      stopScreenSharing();
    }
  } catch (err) {
    console.error("Erreur de partage d'écran :", err);
  }
};

const stopScreenSharing = () => {
  if (screenTrackRef.current) {
    screenTrackRef.current.stop();
    screenTrackRef.current = null;
  }

  // Revenir à la caméra
  if (streamRef.current && videoRef.current) {
    videoRef.current.srcObject = streamRef.current;
  }

  setScreenSharing(false);
};

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const docFile = () => {
    setIsCommentActive(false);
    setIsDocActive(true);
  };

  const commentAct = () => {
    setIsCommentActive(true);
    setIsDocActive(false);
  };

  if (!inCall)
    return (
      <div style={{ textAlign: 'center', padding: 20 }}>
        <h2>👋 Vous avez quitté l'appel.</h2>
      </div>
    );
const handleFileUpload = async (event) => {
  const selectedFiles = event.target.files;
  if (!selectedFiles.length) return;

  const formData = new FormData();
  for (let i = 0; i < selectedFiles.length; i++) {
    formData.append("files", selectedFiles[i]);
  }

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://127.0.0.1:8000/files/upload-multiple/${sessionId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const uploadedFiles = await response.json();
      setSessionFiles((prev) => [...prev, ...uploadedFiles]);
  // ✅ Notifier les autres participants
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send("__fichier_ajoute__");
  }
    } else {
      console.error("Erreur lors de l'envoi des fichiers");
    }
  } catch (err) {
    console.error("Erreur réseau :", err);
  }
};
 const deconnexion=()=>{
  setOpen(true)
 }
  return (
    <div className="videoFlex">
      <div className="chat">
        <div className="fixer">
          <div className="entete">
              <div className="logoChoix">
        <div>
          <img src={Logo} alt="" />
          <h1>ecourses</h1>
        </div>
      </div>
      
          </div>
          <div className="menu">
            <div
              className={`comment-icon-wrapper ${isCommentActive ? 'active' : ''}`}
              onClick={commentAct}
            >
              <i className="fa-regular fa-comment" style={{fontSize : 21}}></i>
            </div>
            <div
              className={`comment-icon-wrapper ${isDocActive ? 'active' : ''}`}
              onClick={docFile}
            >
              <i className="fa-regular fa-file-lines" style={{fontSize : 21}}></i>
            </div>
          </div>
        </div>
   {isCommentActive && (
     <div className="messages-area">
{messages.map((msg, idx) => (
  <div
    key={idx}
    className={`message ${
      msg.user_id.toString() === userId.toString() ? 'own-message' : 'received-message'
    }`}
  >
    {msg.user_id.toString() !== userId.toString() && (
      <strong style={{ color: 'cyan', marginRight: 4 }}>
        @{msg.user_name}:
      </strong>
    )}
    {msg.message}
    <div style={{ fontSize: '0.7rem', color: 'lightgrey' }}>
      {msg.created_at ? new Date(msg.created_at).toLocaleTimeString() : ''}
    </div>
  </div>
))}


  <div ref={messageEndRef} />
</div>

        )}


{isDocActive && (
  <div className="files-container">
    {sessionFiles.length > 0 ? (
      sessionFiles.map((file) => (
        <div key={file.id} className="file-item">
          <a
            href={`http://127.0.0.1:8000/${file.file_path}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{color :"white"}}
          >
            <i class="fa-solid fa-circle-down" style={{color : "white" , paddingRight : 10}}></i>{file.filename}
          </a>
        </div>
      ))
    ) : (
      <div className="no-files"> No documents shared yet.</div>
    )}
  </div>
)}

     <div className="bottomBar">
  {isCommentActive && (
    <>
      <input
        type="text"
        placeholder="Send message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="sent" onClick={handleSend}>
        <i className="fa-regular fa-paper-plane"></i>
        
      </div>
    </>
  )}

  {isDocActive && (
    <div className="sent" onClick={() => fileInputRef.current.click()}>
      <i className="fa-solid fa-plus" title="Ajouter un fichier"></i>
      <span>Add files</span>
      <input
  type="file"
  multiple
  style={{ display: 'none' }}
  ref={fileInputRef}
  onChange={handleFileUpload}
/>

    </div>
    
  )}
</div>
     </div>
   
      <div className="videoC">
        <button
  onClick={deconnexion}
>
  <i className="fa-solid fa-right-from-bracket" style={{ marginRight: 6 }}></i>
  Exit
</button>

        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', height: '100%', backgroundColor: 'black', objectFit: 'cover' }}
          />
          <div className="controle">
            <div className="autres">
              <i
                className={micOn ? 'fa-solid fa-microphone' : 'fa-solid fa-microphone-slash'}
                onClick={toggleMic}
                title={micOn ? 'Couper le micro' : 'Activer le micro'}
              />
           <i
  className="fa-solid fa-rectangle-list"
  title={screenSharing ? "Arrêter le partage d'écran" : "Partager l'écran"}
  onClick={shareScreen}
  style={{ cursor: 'pointer' }}
/>
    <div className="rouge" onClick={stopMedia} title="Terminer l'appel">
                <i className="fa-solid fa-phone" />
              </div>
              <i
                className={camOn ? 'fa-solid fa-video' : 'fa-solid fa-video-slash'}
                onClick={toggleCam}
                title={camOn ? 'Couper la caméra' : 'Activer la caméra'}
              />
            </div>
          </div>
        </div>
         <BootstrapDialog
                  open={open}
                onClose={handleClose}
               aria-labelledby="customized-dialog-title"
                  >   
                         <div className={{ display :"flex" , justifyContent :"center"}}>
                   </div>
                    <div style={{display :"flex" ,width :"100%" ,
                      alignItems :"center" ,justifyContent :"flex-end"
                    }}>
                 
               </div>
                <DialogTitle id="responsive-dialog-title">
                  <h3>Existing...
                    </h3>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                  <div>
                    <p style={{marginTop :4 , fontSize : 19}}>Are you sure to quit ?</p>
                  </div>
                          </DialogContentText>
                </DialogContent>
               <DialogActions  sx={{ justifyContent: "flex-end",display :'flex'   ,
                alignItems :"center" ,width : "100%"
               }}>
            <Button
          variant="outlined"
          sx={{
            width: "20%",
            color : "gray" ,
            backgroundColor: "transparent",
            fontWeight: "bold",
            fontSize: 18,
            borderRadius : 30 ,
            border :"none",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "white",
              color :"#06B4BA",
              opacity :5  ,
              borderRadius :30
            },
          }}
      onClick={handleClose}
        >
        No
          
        
        </Button>
                <Button
          variant="outlined"
          sx={{
            width: "20%",
            color : "#022c2e" ,
            backgroundColor: "transparent",
            fontWeight: "bold",
            fontSize: 18,
            paddingY: 1.5 ,
            borderRadius : 30 ,
            border :"none",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#dcfbfc",
              opacity :5  ,
              borderRadius :30
            },
          }}
      onClick={goBack}
        >
            {loading ? <Spin size="default" /> : (
    <>
        Yes
    </>
  )}
      
          
        
        </Button>
                     </DialogActions>
              </BootstrapDialog>
               
      </div>
    </div>
  );
};

export default VideoCall;
