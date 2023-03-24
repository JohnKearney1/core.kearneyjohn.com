import React, { useState, useEffect } from 'react';
import './Home.css';
import logo from './logo512.png';
import jwt_decode from 'jwt-decode';
import Status from './subcomponents/status'
import Bash from './subcomponents/bash'


const Home = ({ onLogout }) => {

    // field variables
    const [fileDropdownOpen, setFileDropdownOpen] = useState(false);
    const [decoded, setDecoded] = useState('');
    const [encodedToken, setEncodedToken] = useState('');
    const [userEmail, setUserEmail ] = useState('');
    const [userName, setUserName ] = useState('');
    const [isHome, setIsHome] = useState(true)

    // Load the Name and Email from JWT token
    useEffect(() => {
        setEncodedToken(localStorage.getItem('jwtToken'));
        if (encodedToken) {
            setDecoded(jwt_decode(encodedToken));
            setUserEmail(decoded.email);
            setUserName(decoded.name);
            window.console.log('JWT decoded');
        }
    }, [userName, userEmail, encodedToken, decoded.email, decoded.name]);

    // Toolbar Click
    const handleButtonClick = (type) => {
        if (type === 'file') {
        setFileDropdownOpen(!fileDropdownOpen);
        } else {
        setFileDropdownOpen(false);
        }
    }

    // Toolbar Logout
    function logout() {
        localStorage.removeItem('jwtToken');
        onLogout();
    }

    // Tab Switching
    const showBash = () => {
        setIsHome(true);
        setFileDropdownOpen(false);
      };
    
      const showStatus = () => {
        setIsHome(false);
        setFileDropdownOpen(false);
      };

    return (
        <div className="App" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="window">
            <a href="/" className="logo-link">
            <img src={logo} alt="logo" className="logo" width="50px" height="50px"/>
            </a>
            <div className="upper-window">
            <div className="toolbar">
                <button className="toolbar-button" onClick={() => handleButtonClick('file')}>
                File
                {fileDropdownOpen &&
                    <div className="dropdown">
                    <ul>
                        <li onClick={showBash}>Shell</li>
                        <li onClick={showStatus}>Status</li>
                    </ul>
                    </div>
                }
                </button>
                <button onClick={logout} className="toolbar-button">Logout</button>
                <textarea rows='1' className='session' id='session' placeholder={`${userName}`} disabled readOnly></textarea>
            </div>
            { isHome ? <Bash /> : <Status /> }
            </div>
        </div>
        </div>
    );
};



 export default Home;