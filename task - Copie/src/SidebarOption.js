import React from 'react';
import './sidebarOption.css';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
import db from './firebase';
function SidebarOption({Icon,title, id, addChannelOption}) {
  const navigate = useNavigate();

  const selectChannel = () => {
    if(id) {
      navigate(`/room/${id}`);
    } else {
      navigate(title);
    }
  };
  const addChannel = () => {

    const channelName = prompt('Please enter the channel name:');
    // if (channelName) {
    //   const add = async ()=>{
    //     const roomRef = collection(db,'rooms')
    //     await addDoc(roomRef ,channelName)
    //    }
    //    add();
    // }
    
  };

  return (
    <div className='sidebarOption' 
    onClick={addChannelOption ? addChannel : selectChannel}
    >
        {Icon && <Icon className="sidebarOption_icon"/>}
        {Icon ?  <h3>{title}</h3> :(
            <h3 className='sidebarOption_channel'> 
            <span className='sidebarOption_hash'>#{title}</span></h3>
        )}
    </div>
  )
}

export default SidebarOption;