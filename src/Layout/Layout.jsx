import React from "react";
import Acceuil from "../components/Acceuil/Acceuil";
import Header from "../components/Acceuil/Header";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

const Layout=()=> {

  return  <>
          <Routes>
        <Route path="/" element={<Acceuil />} />
        </Routes>

    </>

}
export default Layout