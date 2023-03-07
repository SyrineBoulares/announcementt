import React, { useEffect, useState } from 'react'
import './chat.css';
import { useParams } from 'react-router-dom';
import {doc,collection , getDocs ,getDoc } from 'firebase/firestore/lite'
import db from './firebase';
import Message from './Message';
import ChatInput from './ChatInput';
import { Container } from '@mui/material';
function Chat() {
  const  {roomId}= useParams();
  const [roomDetails, setRoomDetails]= useState(null)
  const [roomMessages , setRoomMessages] =useState([])

  useEffect(() => {
    const fetchRoomDetails = async () => {
      const roomRef = doc(db, 'rooms', roomId);
      const roomSnap = await getDoc(roomRef);
      if (roomSnap.exists()) {
        const data = roomSnap.data().name;
        setRoomDetails(data);
      }
    };

    if (roomId) {
      fetchRoomDetails();
    }
    const fetchMsg = async () => {
      const roomRef = doc(db, 'rooms', roomId);
      const roomSnap = await getDoc(roomRef);
      const msgCollectionRef = collection(roomRef, 'messages');
      const msgQuerySnapshot = await getDocs(msgCollectionRef);
      setRoomMessages(msgQuerySnapshot.docs.map((msgDoc) => ({
        data: msgDoc.data()
      })));
    };
    
    fetchMsg();

  }, [roomId]);
  const messages = roomMessages.map((messageObj) => messageObj.data.timestamp);
  console.log(messages);
  return (
    <Container className='chat'>

      <div className='chat_messages'>
       {roomMessages.map((messageObj,i) => (
        <Message
          key={i}
          message={messageObj.data.message}
          timestamp={messageObj.data.timestamp}
          user={messageObj.data.user}
          userImage ={messageObj.data.userImage}
        />
      ))}
      <ChatInput channelName={roomDetails?.name} channelId roomId={roomId}/>
    </div>
    </Container>
  );
}

export default Chat