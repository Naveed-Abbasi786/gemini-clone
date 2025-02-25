"use client"; 

import React, { useContext, useState } from "react";
import styles from "./mobileSidebar.module.css";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { Context } from "@/context/Context";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Context must be used within a ContextProvider");
  }

  const { prevPrompts, loadChat, newChat } = context;

  const recentChat=(idx:number)=>{
    loadChat(idx)
    onClose()
  }


  
  const [searchQuery, setSearchQuery] = useState("");


  const filteredPrompts = prevPrompts.filter((prompt) =>
    prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highlightSearchQuery = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");

    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>

        <div className={styles.top}>
          <div className={styles.header}>
            <h1 className={styles.heading}>Gemini</h1>
            <Image
              onClick={() => newChat()}
              src={assets.plus_icon}
              alt="new chat"
              width={20}
              height={20}
              className={styles.icon_Images}
            />
          </div>

          {/* Search Bar */}
          <div className={styles.newChat}>
            <Image
              src={assets.search_icon}
              alt="search"
              width={16}
              height={16}
            />
            <input
              type="text"
              placeholder="Search Recent Chat"
              className={styles.search_Recent}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Recent Prompts */}
          <div className={styles.recent}>
            <p className={styles.recentTitle}>Recent Prompts</p>

            {filteredPrompts.map((item, idx) => (
              <div
                onClick={() => recentChat(idx)}
                key={idx}
                className={styles.recentEntry}
              >
                <Image
                  src={assets.message_icon}
                  alt="chat"
                  width={20}
                  height={20}
                />
                <p>{highlightSearchQuery(item.slice(0, 20), searchQuery)}...</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <div className={`${styles.bottomItem} ${styles.recentEntry}`}>
            <Image
              src={assets.question_icon}
              alt="help"
              width={20}
              height={20}
            />
            <p>Help</p>
          </div>
          <div className={`${styles.bottomItem} ${styles.recentEntry}`}>
            <Image
              src={assets.history_icon}
              alt="history"
              width={20}
              height={20}
            />
            <p>History</p>
          </div>
          <div className={`${styles.bottomItem} ${styles.recentEntry}`}>
            <Image
              src={assets.setting_icon}
              alt="settings"
              width={20}
              height={20}
            />
            <p>Settings</p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
    </>
  );
};

export default Sidebar;