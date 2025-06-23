import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <ModalContext.Provider value={{ openLogin, setOpenLogin }}>
      {children}
    </ModalContext.Provider>
  );
};
