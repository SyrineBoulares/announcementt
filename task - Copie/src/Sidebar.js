import React, { useEffect, useState } from 'react'
import "./sidebar.css";
import SidebarOption from './SidebarOption';
import CreateIcon from '@mui/icons-material/Create';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AddIcon from '@mui/icons-material/Add';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DraftsIcon from '@mui/icons-material/Drafts';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { collection, getDocs } from 'firebase/firestore/lite';

import db from "./firebase";
import { useStateValue } from './StateProvider';


function Sidebar() {

  const [channels, setChannels] = useState([]);
  const [{user}]=useStateValue();

  useEffect(() => {
    async function getRooms(db) {
      const roomsCol = collection(db, 'rooms');
      const roomSnapshot = await getDocs(roomsCol);
      setChannels(roomSnapshot.docs.map((doc) => ({
      
        id: doc.id,
        name: doc.data().name,
      })));
    }
  
    // Call the getRooms function
    getRooms(db);
  }, []);

  return (
    <div className='sidebar'>
        <div className='sidebar_header'>
            <div className='sidebar_info'>
            <h2>announcements</h2>
            <h3>
                <FiberManualRecordIcon/>
                {user?.displayName}
            </h3>
            </div>
            
        </div>
        {channels.map((channel,i) =>(
            <SidebarOption title={channel.name} id={channel.id} key={i}/>
        ))}
    </div>
  )
}

export default Sidebar;

