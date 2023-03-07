import { Box, Button, TextField } from '@mui/material';
import { doc, addDoc, collection } from 'firebase/firestore/lite';
import React, { useState } from 'react';
import './chatInput.css';
import db from './firebase';
import { useStateValue } from './StateProvider';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Picker from 'emoji-picker-react';

function ChatInput({ channelName, channelId, roomId }) {
  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    const emoji = emojiObject.emoji;
  
    setInput(input.concat(emoji));
  };

  const toggleEmojiPicker = (e) => {
    e.preventDefault();
    setShowEmojiPicker(!showEmojiPicker);
  };

  const publish = (e) => {
    e.preventDefault();

    const addmsg = async () => {
      const roomRef = doc(db, 'rooms', roomId);
      const msgCollectionRef = collection(roomRef, 'messages');
      await addDoc(msgCollectionRef, {
        message: input,
        user: user.displayName,
        userImage: user.photoURL,
        // timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    };

    if (channelId && input !== '') {
      addmsg();
    }
  };
  return (
    <Box className='chatInput'>
      <form>
        <TextField
        sx={{backgroundColor:"white"}}
          fullWidth
          placeholder='write your announcement'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          InputProps={{
            endAdornment: (
              <>
                <Button type="button" onClick={toggleEmojiPicker} >
                  <EmojiEmotionsIcon sx={{mr:-8,color:"gray"}}/>
                </Button>
                <Button type="submit" ><SendIcon sx={{ mr:-4,color:"gray"}}/></Button>
              </>
            ),
          }}
          
        />
        
      </form>
      {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}
    </Box>
  );
}

export default ChatInput;