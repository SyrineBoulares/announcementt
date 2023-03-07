import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './Chat';
import Login from './Login';
import { useStateValue } from './StateProvider';
function App() {
  const [{user} , dispatch]= useStateValue();
  return (
    <Router>
      <div className="App">
        {!user ? (
          <Login/>
        ) : (
          <div>
            <div className='app_body'>
              <Sidebar/>
              <Routes>
                <Route path="/room/:roomId" element={<Chat/>} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;

