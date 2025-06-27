import React, { useEffect, useRef } from "react";
import Acceuil from "../components/Acceuil/Acceuil";
import Header from "../components/Acceuil/Header";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Choix from "../components/choix/Choix";
import Create from "../components/create/Create";
import VideoCall from "../components/create/VideoCall";
import RequireAuth from "../RequireAuth";
import Joindre from "../components/joindre/Joindre";

const Layout=()=> {

  return  <>
          <Routes>
            <Route path="/" element={<Acceuil />}></Route>
            
       <Route path="/choix" element={
        <RequireAuth>
          <Choix />
        </RequireAuth>
      } />
        <Route path="/joign" element={
        <RequireAuth>
          <Joindre />
        </RequireAuth>
      } />
      <Route path="/create" element={
        <RequireAuth>
          <Create />
        </RequireAuth>
      } />
      <Route path="/create/video_call" element={
        <RequireAuth>
          <VideoCall />
        </RequireAuth>
      } />  <Route path="/create/video_call" element={<VideoCall />} />
  
        </Routes>

    </>

}
export default Layout