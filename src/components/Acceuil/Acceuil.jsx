import React, { useState } from "react"; 
import Header from "./Header";
import Content from "./Content";

const Acceuil =() =>{
const [openLogin, setOpenLogin] = useState(false);

    return  <div>
    <Header openLogin={openLogin} setOpenLogin={setOpenLogin} />
      <Content openLoginModal={() => setOpenLogin(true)} />
   </div>
}

export default Acceuil