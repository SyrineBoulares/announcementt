import { Button } from '@mui/material';
import React from 'react'
import "./login.css";
import {auth , provider} from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    const [state , dispatch]= useStateValue();
    const signIn = () => {
        signInWithPopup(auth, provider)
          .then(result => {
            console.log(result);
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
          })
          .catch(error => {
            alert(error.message);
          });
      };

  return (
    <div className='login'>
        <div className='login_container'>
            <img src='https://cdn.dribbble.com/users/1889528/screenshots/7239609/0aba6579301149.5cbf290c5a8dd.jpg' alt=''/>
            <h1>sign in to aouncements</h1>
            <Button onClick={signIn}> sign in with google</Button>
        </div>
    </div>
  )
}

export default Login