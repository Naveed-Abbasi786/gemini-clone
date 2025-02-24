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
  newChat: () => void;
  loadChat: (index: number) => void;
  selectedChat: string | null;
  prevResults: string[]; // Add this
  setPrevResults: Dispatch<SetStateAction<string[]>>; // Add this
}

export const Context = createContext<ContextProps | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

const ContextProvider: FC<ProviderProps> = ({ children }) => {
  const [input, setInput] = useState<string>("");
  const [recentPromts, setRecentPromts] = useState<string>("");
  const [prevPrompts, setPrevPromts] = useState<string[]>([]); 
  const [prevResults, setPrevResults] = useState<string[]>([]); 
  const [showResult, setShowResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultData, setResultData] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null); // Track selected chat

  const delayPara = (index: number, nextWord: string) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord + " "); 
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setSelectedChat(null); // Reset selected chat when starting a new chat
  };
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
  
    // Store the result data in the prevResults array
    setPrevResults((prev) => [...prev, newResponse2]);
  };

  const loadChat = (index: number) => {
    const selectedPrompt = prevPrompts[index];
    setRecentPromts(selectedPrompt);
    setSelectedChat(selectedPrompt); // Set the selected chat
    setShowResult(true); // Show the result section
  
    const selectedResult = prevResults[index]; 
    setResultData(selectedResult || ""); 
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
    loadChat, // Add loadChat to context
    selectedChat, // Add selectedChat to context
    prevResults, // Add this
    setPrevResults, // Add this
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;