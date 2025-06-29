"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { io } from "socket.io-client";
import { Container } from "@/components/common/container/Container";
import { user } from "@clerk/nextjs";

// Connect to socket
const socket = io("http://localhost:8000");

export default function RoomPage() {
  const { room: rawRoom } = useParams();
  const room = decodeURIComponent(rawRoom);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const sender = useRef(`User-${Math.floor(Math.random() * 10000)}`); // mock sender

  const bottomRef = useRef(null);

  useEffect(() => {
    socket.emit("join_room", room);
    console.log(`Joined room: ${room}`);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [room]);

  //scroll to bottom

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (message.trim() === "") return;
    socket.emit("send_message", {
      room,
      message,
      sender: sender.current,
    });
    setMessage("");
  };

  return (
    <Container>
      <div className={styles.chatUi}>
        <div
          className={`${styles.chatHeader} flex justify-between items-center`}
        >
          <div className={styles.roomName}>#{room}</div>
          <div className={styles.buzzers}> Buzzers: N/A</div>
          <Link href="/rooms">
            <button className={styles.backButton}>← Back to Rooms</button>
          </Link>
        </div>

        <div className={styles.chat}>
          {messages.length === 0 ? (
            <div className={styles.noMessages}>No messages yet</div>
          ) : (
            <div className={styles.messages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${msg.sender === sender.current ? styles.ownMessage : ""}`}
                >
                  <span className={styles.sender}>{msg.sender}: </span>
                  <span className={styles.text}>{msg.message}</span>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <div
          className={`${styles.chatActions} flex items-center justify-between`}
        >
          <div
            className={`${styles.chatInputContainer} flex items-center justify-between`}
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              type="text"
              placeholder="Type your message..."
              className={styles.chatInput}
            />
            <button className={styles.sendButton} onClick={handleSend}>
              Send
            </button>
          </div>
          {/* <button>emoji</button> */}
        </div>
      </div>
    </Container>
  );
}
