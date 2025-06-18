import React from "react";
import Acceuil from "../components/Acceuil/Acceuil";
import Header from "../components/Acceuil/Header";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Choix from "../components/choix/Choix";
import Create from "../components/create/Create";

const Layout=()=> {

  return  <>
          <Routes>
        <Route path="/" element={<Acceuil />} />
  <Route path="/choix" element={<Choix />} />
         <Route path="/create" element={<Create />} />
  
        </Routes>

    </>

}
export default Layout