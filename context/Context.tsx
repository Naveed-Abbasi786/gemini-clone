"use client";
import runChat from "@/components/config/gemini";
import { createContext, useState, ReactNode, FC, SetStateAction, Dispatch } from "react";

interface ContextProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  recentPromts: string;
  setRecentPromts: Dispatch<SetStateAction<string>>;
  prevPrompts: string[];
  setPrevPromts: Dispatch<SetStateAction<string[]>>;
  showResult: boolean;
  setShowResult: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  resultData: string;
  setResultData: Dispatch<SetStateAction<string>>;
  onSent: (prompt: string) => Promise<void>;
  newChat: () => void
}

export const Context = createContext<ContextProps | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

const ContextProvider: FC<ProviderProps> = ({ children }) => {
  const [input, setInput] = useState<string>("");
  const [recentPromts, setRecentPromts] = useState<string>("");
  const [prevPrompts, setPrevPromts] = useState<string[]>([]); 
  const [showResult, setShowResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultData, setResultData] = useState<string>("");

  const delayPara = (index: number, nextWord: string) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord + " "); 
    }, 75 * index);
  };

  const newChat=()=>{
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt: string) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPromts(input);
    setPrevPromts((prev) => [...prev, input]); 
    const response = await runChat(input);
    const responseArray = response?.split("**") || [];
    let newResponse = ""; 

    for (let i = 0; i < responseArray?.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>"; 
      }
    }

    let newResponse2 = newResponse.split("*").join("<br/>");
    let newResponseArray = newResponse2.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord);
    }

    setLoading(false);
    setInput("");
  };

  const contextValue: ContextProps = {
    input,
    setInput,
    recentPromts,
    setRecentPromts,
    prevPrompts,
    setPrevPromts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
    newChat,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;