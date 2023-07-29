import React, { useEffect, useRef, useState } from "react";
import "../styles/chatbodybottom.css";
import {
  FaAlignRight,
  FaAngleDoubleRight,
  FaAngleRight,
  FaChevronRight,
  FaUser,
} from "react-icons/fa";
import { chatUser, CHAT_USER, user, username } from "../redux/userReducer";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import GetUserInfo from "../hooks/getUserInfo";
import Loading from "../Loading";

const ENDPOINT = "http://localhost:5000";

let socket, selectedChatCompare;

const ChatBottom = ({ accessToken, socketConnected }) => {
  const [message, setMessage] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState(1);
  const divHeight = useRef();
  const chat_user = useSelector(chatUser);
  const e_mail = useSelector(username);

  const currUser = useSelector(user);
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    socket = io(ENDPOINT);
    // socket.emit('setup',currUser)
    // socket.on("connection",()=>setSocket(true))
    // socket.on("typing",()=>setIsTyping(true))
    // socket.on('stop typing',()=>setIsTyping(false))
  }, []);
  const handleChange = (e) => {
    setMessage(e.target.value);
    const height = e.target.scrollHeight;
    const rowHeight = 20;
    const trows = Math.ceil(height / rowHeight) - 1;
    if (message == "") setTextAreaHeight(1);
    else setTextAreaHeight(trows);
    divHeight.current.style.height = divHeight.current.clientHeight;

    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", chat_user._id);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chat_user._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    // socket.emit("stop typing", chat_user._id);
    const result = await fetch(`/api/message`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatID: chat_user._id,
        content: message,
      }),
    });
    setMessage("");

    const ans = await result.json();
    console.log(ans);

    socket.emit("new message", ans.message);

  };
  return (
    <form onSubmit={handleSendMessage} className="form">
      <div className="chat-body-bottom" ref={divHeight}>
        <div className="chat-input">
          {isTyping ? (
            <>
              <Loading />
            </>
          ) : (
            <></>
          )}
          <textArea
            type="text"
            value={message}
            onChange={(e) => handleChange(e)}
            className="msg-box"
            placeholder="Enter message"
            rows={textAreaHeight}
          />
        </div>
        <div className="chat-send">
          <button type="submit" id="submit-btn-send">
            <FaAngleDoubleRight id="faRight" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatBottom;
