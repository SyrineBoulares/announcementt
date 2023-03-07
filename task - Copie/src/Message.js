import { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Popover from '@mui/material/Popover';
import Emoji from 'react-emoji-render';
import "./message.css"

function Message({ message, timestamp, user, userImage }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [reactionCount, setReactionCount] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    setReactionCount(reactionCount + 1);
    handleClose();
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent style={{ display: 'flex', flexDirection: 'row' }}>
        <img width="50px" height="50px" src={userImage} alt="" />
        <div className='message_info'>
          <h4>
            {user}, <span className='message_timestamp'>{new Date(timestamp?.toDate()).toUTCString()}</span>
          </h4>
          <p>{message}</p>
          {selectedEmoji && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Emoji text={selectedEmoji} />
              <div style={{ marginLeft: '5px' }}>{reactionCount}</div>
            </div>
          )}
        </div>
        <div className='icons'>
          <IconButton onClick={handleClick}>
            <AddReactionIcon sx={{ color: "rgb(205, 150, 255)" }} />
          </IconButton>
          <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}>
            <MoreHorizIcon />
          </IconButton>
        </div>
      </CardContent>
      <Popover 
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <div className="emoji-list"
          style={{   
            display: 'flex', 
            justifyContent: 'space-between', 
            cursor: 'pointer', 
            alignItems: 'center',
            padding: '5px 0',
            transition: 'all 0.3s ease',
          }}>
         <IconButton> <Emoji style={{ 
        margin:'5px'
        , fontSize: '15px'
          
        }}  text="😂" onClick={() => handleEmojiClick('😂')} /></IconButton>
         <IconButton><Emoji style={{ 
        margin:'5px', fontSize: '15px'
        }}  text="❤️" onClick={() => handleEmojiClick('❤️')} /> </IconButton>
      <IconButton><Emoji style={{ 
         margin:'5px' , fontSize: '15px'
        }} text="👍" onClick={() => handleEmojiClick('👍')} /> </IconButton>
      <IconButton><Emoji style={{ 
          margin:'5px' , fontSize: '15px'
        }}  text="👎" onClick={() => handleEmojiClick('👎')} /></IconButton>
      <IconButton><Emoji style={{ 
       margin:'5px' , fontSize: '15px'
        }} text="✅" onClick={() => handleEmojiClick('✅')} /></IconButton>
      <IconButton><Emoji style={{ 
         margin:'5px' , fontSize: '15px'
        }}  text="😠" onClick={() => handleEmojiClick('😠')} /></IconButton>
</div>

      </Popover>
    </Card>
  )
}

export default Message;
