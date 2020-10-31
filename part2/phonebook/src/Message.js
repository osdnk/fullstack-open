import React, { useEffect, useState } from "react";
import "./index.css"

const Message = ({ message, positive }) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!message) {
      return;
    }
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
    }, 3000);
  }, [message])
  return visible ?
    <div className={`message${positive ? " positive" : " negative"}`}>{message}</div>
    : null
}


export default Message
