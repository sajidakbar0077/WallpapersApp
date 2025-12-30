import React, { createContext, Context } from "react";

interface MyContextType {
  modalVisible: boolean;
  scrollHeight:number;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setScrollHeight:React.Dispatch<React.SetStateAction<number>>
}

const context: Context<MyContextType | undefined> = createContext<MyContextType | undefined>(undefined);

export default context;
