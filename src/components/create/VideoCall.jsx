import React, { useEffect, useRef, useState } from 'react';

const MicIcon = ({ muted }) => (
  muted ? (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 11v2h-2v-2h2zM12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11h2v2H5zM12 21a7 7 0 0 0 7-7h-2a5 5 0 0 1-10 0H5a7 7 0 0 0 7 7z"/>
    </svg>
  ) : (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11h2v2H5zM12 21a7 7 0 0 0 7-7h-2a5 5 0 0 1-10 0H5a7 7 0 0 0 7 7z"/>
    </svg>
  )
);

const CamIcon = ({ off }) => (
  off ? (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17 10.5V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5.5"/>
      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ) : (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17 10.5V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-3.5"/>
      <polygon points="17 10.5 21 7 21 17 17 13.5"/>
    </svg>
  )
);

const PowerIcon = () => (
  <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
    <path d="M12 2v10M6.343 6.343a8 8 0 1 0 11.314 0"/>
  </svg>
);

const VideoCall = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [inCall, setInCall] = useState(true);

  // On sépare final et interim pour un effet live
  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  useEffect(() => {
    // Démarre média
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Erreur accès caméra/micro :", err);
      }
    };

    startMedia();

    // SpeechRecognition
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
      console.error("Erreur reconnaissance vocale:", event.error);
    };

    recognitionRef.current = recognition;
    recognition.start();

    return () => {
         if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const stopMedia = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
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
        if (audioTrack.enabled) {
          recognitionRef.current.start();
        } else {
          recognitionRef.current.stop();
        }
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

  if (!inCall)
    return (
      <div style={{ textAlign: 'center', padding: 20, color: '#222' }}>
        <h2>👋 Vous avez quitté l'appel.</h2>
      </div>
    );

  return (
    <div
      style={{
        position: 'relative',
       width: '100%',
        maxWidth: 900,
        margin: '0 auto',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#000',
        boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '100%', height: 'auto', backgroundColor: 'black' }}
      />

      {/* Sous-titres style YouTube en bas de la vidéo */}
      <div
        aria-live="polite"
        style={{
          position: 'absolute',
          bottom: 70,
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '90%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '10px 20px',
          borderRadius: 20,
          fontSize: 18,
          color: '#fff',
          textAlign: 'center',
          textShadow: '0 0 5px black',
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'pre-wrap',
          minHeight: 40,
          maxHeight: 80,
          overflowY: 'auto',
          fontWeight: 'bold',
        }}
      >
        <span>{finalTranscript}</span>
        <span style={{ color: '#aaf', fontStyle: 'italic' }}>{interimTranscript}</span>
      </div>

      {/* Barre de contrôle */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '10px 0',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'center',
          gap: 30,
          alignItems: 'center',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Bouton Micro */}
        <button
          onClick={toggleMic}
          aria-label={micOn ? 'Couper le micro' : 'Activer le micro'}
          style={{
            backgroundColor: micOn ? '#10b981' : '#555',
            border: 'none',
            width: 52,
            height: 52,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: micOn ? '#fff' : '#ccc',
            transition: 'all 0.3s ease',
            boxShadow: micOn ? '0 0 10px #10b981' : 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <MicIcon muted={!micOn} />
        </button>

        {/* Bouton Quitter */}
        <button
          onClick={stopMedia}
          aria-label="Quitter l'appel"
          style={{
            backgroundColor: '#ef4444',
            border: 'none',
            width: 60,
            height: 60,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            boxShadow: '0 0 12px #ef4444',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <PowerIcon />
        </button>

        {/* Bouton Caméra */}
        <button
          onClick={toggleCam}
          aria-label={camOn ? 'Couper la caméra' : 'Activer la caméra'}
          style={{
            backgroundColor: camOn ? '#3b82f6' : '#555',
            border: 'none',
            width: 52,
            height: 52,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: camOn ? '#fff' : '#ccc',
            transition: 'all 0.3s ease',
            boxShadow: camOn ? '0 0 10px #3b82f6' : 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <CamIcon off={!camOn} />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
