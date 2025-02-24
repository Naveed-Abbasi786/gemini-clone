"use client";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow  } from "react-syntax-highlighter/dist/esm/styles/prism"; 
import ClipboardJS from "clipboard";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    const clipboard = new ClipboardJS(".copy-button", {
      text: () => code,
    });

    clipboard.on("success", () => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      clipboard.destroy();
    });

    clipboard.on("error", () => {
      console.error("Failed to copy text");
      clipboard.destroy();
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <SyntaxHighlighter language={language} style={tomorrow }>
        {code}
      </SyntaxHighlighter>
      <button
        className="copy-button"
        onClick={copyToClipboard}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "5px 10px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isCopied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CodeBlock;