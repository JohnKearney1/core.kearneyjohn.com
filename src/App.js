import './App.css';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function checkIfUserIsLoggedIn() {
    // Check if the user has a valid token
    console.log("Validating JWT Token Presence in Local Storage...");
    const token = localStorage.getItem('jwtToken');

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }
  
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, [isLoggedIn]);
  
  

  return (
    <div onLoad={checkIfUserIsLoggedIn} className="App">
      {isLoggedIn ? <Home onLogout={checkIfUserIsLoggedIn} /> : <Login onLogin={checkIfUserIsLoggedIn} onLogout={checkIfUserIsLoggedIn}/>}
    </div>
  );
}

export default App;

// 