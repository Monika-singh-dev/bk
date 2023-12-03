import { createContext, useState } from "react";

export const Appactions = createContext();

export const ActionProvider = ({ children }) => {
  const [isBmOpen, setIsBmOpen] = useState(false);
  const [isCmOpen, setIsCmOpen] = useState(false);
  const bmModelHandler = () => {
    setIsBmOpen(!isBmOpen);
  };
  const cmModelHandler = () => {
    setIsCmOpen(!isCmOpen);
  };

  return (
    <Appactions.Provider
      value={{ isBmOpen, bmModelHandler, isCmOpen, cmModelHandler }}
    >
      {children}
    </Appactions.Provider>
  );
};
