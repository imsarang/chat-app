import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { chatUser, user } from "../redux/userReducer";
import "../styles/chatbodymsg.css";
import Message from "./Message";
import io from "socket.io-client";
import ChatBottom from "./ChatBottom";
import { FaAngleDoubleRight } from "react-icons/fa";

let socket, selectedChatCompare;

const ENDPOINT = "http://localhost:5000";

const ChatBodyMsg = ({ accessToken }) => {
  const [messages, setMessages] = useState([]);
  const chat_user = useSelector(chatUser);
  const curr_user = useSelector(user);
  const [load, setLoad] = useState(false);
  const [socketConnected, setSocket] = useState(false);

  const [message, setMessage] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState(1);
  const divHeight = useRef();
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    console.log(chat_user);
    socket = io(ENDPOINT);
    socket.emit("setup", curr_user);
    socket.on("connection", () => {
      setSocket(true);
    });
  }, [chat_user]);

  useEffect(() => {
    handleShowMessage();
    selectedChatCompare = chat_user;
  }, [chat_user]);

  useEffect(() => {
    socket.on("message recieved", (newMsgRcv) => {
      if (!chat_user || chat_user._id !== newMsgRcv.chat._id) {
        console.log(selectedChatCompare);
        // give Notification
      } else {
        console.log(selectedChatCompare);
        console.log(newMsgRcv);
        setMessages([...messages, newMsgRcv]);
      }
    });
  });
  const handleShowMessage = async () => {
    setLoad(true);
    const result = await fetch(`/api/message/fetch/${chat_user._id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    const ans = await result.json();
    console.log(ans);
    if (ans.success) setMessages(ans.message);
    setLoad(false);
    socket.emit("join chat", chat_user);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    // const height = e.target.scrollHeight;
    // const rowHeight = 20;
    // const trows = Math.ceil(height / rowHeight) - 1;
    // if (message == "") setTextAreaHeight(1);
    // else setTextAreaHeight(trows);
    // divHeight.current.style.height = divHeight.current.clientHeight;

    // if (!socketConnected) return;
    // if (!typing) {
    //   setTyping(true);
    //   socket.emit("typing", chat_user._id);
    // }

    // let lastTypingTime = new Date().getTime();
    // let timerLength = 3000;

    // setTimeout(() => {
    //   let timeNow = new Date().getTime();
    //   let timeDiff = timeNow - lastTypingTime;

    //   if (timeDiff >= timerLength && typing) {
    //     socket.emit("stop typing", chat_user._id);
    //     setTyping(false);
    //   }
    // }, timerLength);
  };

  const handleSendMessage = async (e) => {
    // e.preventDefault();
    let msg = message;
    setMessage("");
    // socket.emit("stop typing", chat_user._id);
    const result = await fetch(`/api/message`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatID: chat_user._id,
        content: msg,
      }),
    });

    const ans = await result.json();
    socket.emit("new message", ans.message);
    setMessages([...messages,ans.message]);
  };

  if (load)
    return (
      <>
        <Loading />
      </>
    );
  else
    return (
      <div className="chat-body-main">
        <div className="chat-body-msg-all">
          {messages?.map((item) => {
            return (
              <Message
                id={item.sender._id}
                pic={item?.sender?.profilePic}
                name={item?.sender?.username}
                email={item?.sender?.email}
                content={item?.content}
                createdAt={item?.createdAt}
              />
            );
          })}
        </div>
        <div>
          <div className="chat-body-bottom" ref={divHeight}>
            <div className="chat-input">
              {isTyping ? (
                <>
                  <Loading />
                </>
              ) : (
                <></>
              )}
              <input
                type="text"
                value={message}
                onChange={(e) => handleChange(e)}
                className="msg-box"
                placeholder="Enter message"
              />
            </div>
            <div className="chat-send">
              <button
                id="submit-btn-send"
                onClick={handleSendMessage}
              >
                <FaAngleDoubleRight id="faRight" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ChatBodyMsg;
