"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { io } from "socket.io-client";
import { Container } from "@/components/common/container/Container";
import { useUser } from "@clerk/nextjs";

// Connect to socket
const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

export default function RoomPage() {
  const { room: rawRoom } = useParams();
  const room = decodeURIComponent(rawRoom);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sender = useRef(`User-${Math.floor(Math.random() * 10000)}`); // mock sender

  const bottomRef = useRef(null);

  const { user } = useUser();
  const username =
    user?.firstName ||
    user?.lastName ||
    user?.primaryEmailAddress?.emailAddress;

  const clerkId = user?.id || "guest";

  // console.log("User:", username);

  useEffect(() => {
    socket.emit("join_room", room);

    socket.on("previous_messages", (prevMessages) => {
      if (prevMessages && prevMessages.length > 0) {
        setMessages(
          prevMessages.map((msg) => ({
            message: msg.content,
            sender: msg.user.username,
            username: msg.user.username,
          }))
        );
      } else {
        console.log(`No previous messages found for room: ${room}`);
      }
    });

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [room]);

  //scroll to bottom

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  const handleSend = () => {
    if (message.trim() === "") return;
    socket.emit("send_message", {
      room,
      message,
      sender: sender.current,
      username,
      clerkId,
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
                  <span className={styles.sender}>{msg.username}: </span>
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
