import React, { useState } from "react";
import context from "./context";

interface ContextProviderProps {
  children: React.ReactNode; 
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  return (
    <context.Provider value={{ modalVisible, setModalVisible,scrollHeight,setScrollHeight }}>
      {children}
    </context.Provider>
  );
};

export default ContextProvider;
