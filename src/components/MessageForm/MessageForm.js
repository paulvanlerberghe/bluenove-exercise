//import { useEffect } from 'react';

import { useState } from "react";
import "./MessageForm.css";
import { useInput } from "../../hooks/input-hook";

const MessageForm = ({ onHandleSubmit, pending }) => {

  //We use a custom hook here, it'll help to keep ours inputs simple
  const { value, bind, reset } = useInput("");

  const [translateMode, setTranslateMode] = useState("off");

  const handleSubmit = (event) => {
    event.preventDefault();
    value !== "" && onHandleSubmit(value, translateMode);
    reset();
  };

  return (
    <div className="message-form">
      <form onSubmit={handleSubmit}>
        <div className="line">
          <label>
            <input
              type="radio"
              value="off"
              checked={translateMode === "off"}
              onChange={() => setTranslateMode("off")}
            />
            Off
          </label>
          <label>
            <input
              type="radio"
              value="en"
              checked={translateMode === "en"}
              onChange={() => setTranslateMode("en")}
            />
            Traduire en anglais
          </label>
          <label>
            <input
              type="radio"
              value="fr"
              checked={translateMode === "fr"}
              onChange={() => setTranslateMode("fr")}
            />
            Translate to french
          </label>
        </div>
        <div className="line">
          <input type="text" maxLength={120} placeholder="Taper message" {...bind} />
          <input type="submit" value={pending ? "En cours..." : "Envoyez"} disabled={pending || value === ""} />
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
