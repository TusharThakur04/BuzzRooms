"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

export default function RoomPage() {
  var { room } = useParams();
  room = decodeURIComponent(room);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const sender = useRef(`User-${Math.floor(Math.random() * 10000)}`); // mock sender

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
    <div style={{ padding: 20 }}>
      <h1>Room: {room}</h1>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.sender}: </strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        style={{ marginRight: 10 }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
