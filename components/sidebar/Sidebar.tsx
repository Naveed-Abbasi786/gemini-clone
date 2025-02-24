"use client";
import React, { useContext, useState } from "react";
import styles from "./sidebar.module.css";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { Context } from "@/context/Context";

export default function Sidebar() {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Context must be used within a ContextProvider");
  }

  const {  prevPrompts,loadChat, selectedChat , newChat } = context;
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
       
       <div className={styles.header}>
        <h1 className={styles.heading}>Gemini</h1>
        <Image src={assets.plus_icon} alt="new chat" width={20} height={20} className={styles.icon_Images}/>

       </div>
        <div onClick={() => newChat()} className={styles.newChat}>
          <Image src={assets.plus_icon} alt="new chat" width={20} height={20} />
          <input type="text" placeholder="Search Recent Chat" className={styles.search_Recent}/>
        </div>
        <div className={styles.recent}>
            <p className={styles.recentTitle}>Recent Promts</p>

            {prevPrompts.map((item, idx) => (
              <div   onClick={() => loadChat(idx)} key={idx} className={styles.recentEntry}>
                <Image
                  src={assets.message_icon}
                  alt="chat"
                  width={20}
                  height={20}
                />
                <p>{item.slice(0,20)}...</p>
              </div>
            ))}
          </div>
       
      </div>
      <div className={styles.bottom}>
        <div className={`${styles.bottomItem} ${styles.recentEntry}`}>
          <Image src={assets.question_icon} alt="help" width={20} height={20} />
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
  );
}
