import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from "react";
import './Chat.css';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from "./firebase";
import { useStateValue } from './StateProvider';
import firebase from "firebase";

function Chat() {
  const { roomId } = useParams();
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();
  
  useEffect(() => {
    if (roomId) {
        db.collection("rooms")
          .doc(roomId)
          .onSnapshot(snapshot => setRoomName(snapshot.data().name)
        );

        db
          .collection("rooms")
          .doc(roomId)
          .collection("messages")
          .orderBy("timestamp", "asc")
          .onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc => doc.data()))
        ));
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    
    db
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add ({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput("");
  };

  return (
    <div className="chat">
        <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            
            <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                <p>
                    Last seen{" "}
                    {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                </p>
            </div>

            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
        </div>

        <div className="chat__body">
            {messages.map((message) => (
                <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                </p>
            ))}
        </div>

        <div className="chat__footer">
            <IconButton>
                <InsertEmoticon />
            </IconButton>

            <form>
                <input 
                    type="text" 
                    placeholder="Type a message" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" onClick={sendMessage}>Send a message</button>
            </form>

            <IconButton>
                <MicIcon />
            </IconButton>
        </div>
    </div>
  );
}

export default Chat;