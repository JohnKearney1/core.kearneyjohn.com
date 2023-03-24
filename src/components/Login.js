import React, { useEffect } from 'react';
import './Login.css';
import logo from './logo512.png';

export const Login = ({ onLogin }) => {

  function handleCallbackResponse(response) {
    if (response && response.credential) {
      const encodedToken = response.credential;
      localStorage.setItem('jwtToken', encodedToken);
      onLogin();
    } else {
      console.error('Invalid response from Google One Tap API');
    }
  }
   
  useEffect(() => {
    try {
      /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID.toString(),
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    )
    }
    catch (error) {
      console.log('Google Loaded too soon:', error.message)
      // onLogout();
    }  
  });

  function log(text) {
    console.log(text);
  }
  
  return (
    <div className="login-container" onLoad={log("loaded Login.js component")}>
      <div className="login-window">
        <a href="/" className="logo-link">
          <img src={logo} alt="Freebase logo" className="logo" width="150px" height="150px"/>
        </a>
        <div id="signInDiv"></div>
        <a href="https://auth.kearneyjohn.com" className="login-link">Privacy Policy</a>
      </div>
    </div>
  );
};

export default Login;
