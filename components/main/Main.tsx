"use client";
import React, { useContext } from "react";
import styles from "./main.module.css";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { Context } from "@/context/Context";

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
  } = context;

  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <p>Gemini</p>
        <Image
          src={assets.user_icon}
          alt="User Icon"
          width={34}
          height={38}
          className={styles.avatar_img}
        />
      </div>
      <div className={styles.main_container}>
        {!showResult ? (
          <>
            {" "}
            <div className={styles.greet}>
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className={styles.cards}>
              <div className={styles.card}>
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <Image
                                className={styles.icon_Images}
                  src={assets.compass_icon}
                  alt="Compass Icon"
                  width={30}
                  height={30}
                />
              </div>

              <div className={styles.card}>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <Image
                  src={assets.bulb_icon}
                  className={styles.icon_Images}

                  alt="Bulb Icon"
                  width={30}
                  height={30}
                />
              </div>

              <div className={styles.card}>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <Image
                  src={assets.message_icon}
                  className={styles.icon_Images}

                  alt="Message Icon"
                  width={30}
                  height={30}
                />
              </div>

              <div className={styles.card}>
                <p>Tell me about React JS and React Native</p>{" "}
                {/* Corrected the capitalization */}
                <Image
                  src={assets.code_icon}
                  className={styles.icon_Images}

                  alt="Code Icon"
                  width={30}
                  height={30}
                />
              </div>
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
              <Image src={assets.gemini_icon}
                width={40}
                height={40}  alt="" />
              {loading ? (
                <div className={styles.loader}>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className={styles.main_bottom}>
          <div className={styles.search_box}>
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Enter a prompt here"
            />{" "}
            {/* Corrected the placeholder text */}
            <div>
              <Image
                src={assets.gallery_icon}
                className={styles.icon_Images}
                alt="Gallery Icon"
                width={30}
                height={30}
              />
              <Image
                src={assets.mic_icon}
                alt="Mic Icon"
                className={styles.icon_Images}
                width={30}
                height={30}
              />
              <Image
                src={assets.send_icon}
                className={styles.icon_Images}
                onClick={() => {
                  console.log("Send button clicked");
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
