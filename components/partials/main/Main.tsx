"use client";
import React, { useContext, useState } from "react";
import styles from "./main.module.css";
import Image, { StaticImageData } from "next/image";
import { assets } from "@/public/assets/assets";
import { Context } from "@/context/Context";
import CodeBlock from "@/components/codeblocker";
import Sidebar from "../../mobilesidebar/mobileSidebar";

interface SuggestCards {
  Icon: StaticImageData;
  prompt: string;
}
const Cards: SuggestCards[] = [
  {
    Icon: assets.compass_icon,
    prompt: "Suggest beautiful places to see on an upcoming road trip",
  },
  {
    Icon: assets.bulb_icon,
    prompt: "Brainstorm team bonding activities for our work retreat",
  },
  {
    Icon: assets.message_icon,
    prompt: "Improve communication skills for remote teams",
  },
  {
    Icon: assets.code_icon,
    prompt: "Tell me about React JS and React Native",
  },
];
export default function Main() {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Context must be used within a ContextProvider");
  }

  const {
    onSent,
    recentPromts,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    setRecentPromts,
  } = context;

  const extractCodeFromResponse = (response: string) => {
    const codeBlockRegex = /```[\s\S]*?```/g;
    const matches = response.match(codeBlockRegex);
    if (matches) {
      return matches.map((match) => match.replace(/```/g, "").trim());
    }
    return [];
  };

  const codeBlocks = extractCodeFromResponse(resultData);

  const SuggestPrompts = (prompt: string) => {
    onSent(prompt);
    setRecentPromts(prompt);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") { 
      onSent(input); 
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <p>Gemini</p>
        <div className={styles.nav_Icons}>
        <Image
          src={assets.user_icon}
          alt="User Icon"
          width={34}
          height={38}
          className={styles.avatar_img}
        />
          <Image
       onClick={toggleSidebar}
          src={assets.menu_icon}
          alt="User Icon"
          width={34}
          height={38}
          className={styles.menu_Icon}
        />
        </div>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      </div>
      <div className={styles.main_container}>
        {!showResult ? (
          <>
            <div className={styles.greet}>
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className={styles.cards}>
              {Cards.map((card, index) => (
                <div
                  key={index}
                  className={styles.card}
                  onClick={() => SuggestPrompts(card.prompt)}
                >
                  <p>{card.prompt}</p>
                  <Image
                    className={styles.icon_Images}
                    src={card.Icon}
                    alt={`Icon ${index}`}
                    width={30}
                    height={30}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.result}>
            <div className={styles.result_title}>
              <Image
                src={assets.user_icon}
                alt=""
                className={styles.user_Icon}
                width={40}
                height={40}
              />
              <p>{recentPromts}</p>
            </div>
            <div className={styles.result_data}>
              <Image src={assets.gemini_icon} width={40} height={40} alt="" />
              {loading ? (
                <div className={styles.loader}>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <div>
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                  {codeBlocks.map((code, index) => (
                    <CodeBlock key={index} code={code} language="javascript" />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.main_bottom}>
          <div className={styles.promt_box}>
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={handleKeyPress} 
              placeholder="Enter a prompt here"
            />
            <div className={styles.icons_container}>
              <Image
                src={assets.gallery_icon}
                className={styles.icon_Images}
                id={styles.gallery_Icon}
                alt="Gallery Icon"
                width={30}
                height={30}
              />
              <Image
                src={assets.mic_icon}
                alt="Mic Icon"
                className={styles.icon_Images}
                id={styles.mic_Icon}
                width={30}
                height={30}
              />
              <Image
                src={assets.send_icon}
                className={styles.icon_Images}
                onClick={() => {
                  onSent(input);
                }}

                alt="Send Icon"
                width={30}
                height={30}
              />
            </div>
          </div>
          <p className={styles.bottom_Info}>
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
}
