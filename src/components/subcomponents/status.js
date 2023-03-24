import React, { useState, useEffect } from "react";
import "./status.css" 

function Status() {
  const [isOnline, setIsOnline] = useState(false);
  const [isOnline2, setIsOnline2] = useState(false);
  const [isOnline3, setIsOnline3] = useState(false);
  const [isOnline4, setIsOnline4] = useState(false);

  useEffect(() => {

    const checkWebsiteStatus = async (url="https://kearneyjohn.com") => {
      try {
        const response = await fetch(url , { mode: 'no-cors'});
        console.log(response)
        if (response !== null) {
          setIsOnline(true)
        }
      } catch (error) {
        console.log(error)
        setIsOnline(false);
      }
    };

    const checkWebsiteStatus2 = async (url="https://core.kearneyjohn.com") => {
      try {
        const response = await fetch(url , { mode: 'no-cors'});
        console.log(response)
        if (response !== null) {
          setIsOnline2(true)
        }
      } catch (error) {
        console.log(error)
        setIsOnline2(false);
      }
    }; 

    const checkWebsiteStatus3 = async (url="https://auth.kearneyjohn.com") => {
      try {
        const response = await fetch(url , { mode: 'no-cors'});
        console.log(response)
        if (response !== null) {
          setIsOnline3(true)
        }
      } catch (error) {
        console.log(error)
        setIsOnline3(false);
      }
    }; 

    const serverIp = 'mc.kearneyjohn.com';
    const serverPort = '25565'; // default Minecraft server port

    fetch(`https://api.mcsrvstat.us/2/${serverIp}:${serverPort}`)
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data))
        if (data.online) {
          console.log('The MC server is online.');
          setIsOnline4(true)
        } else {
          console.log('The MC server is offline.');
          setIsOnline4(false)
          
        }
      })
      .catch(error => console.error('Error:', error));

    checkWebsiteStatus();
    checkWebsiteStatus2();
    checkWebsiteStatus3();
  }, []);

  const indicatorStyle = {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "10px",
  };

  const onlineIndicator = <div style={{ ...indicatorStyle, backgroundColor: "green" }}></div>;
  const offlineIndicator = <div style={{ ...indicatorStyle, backgroundColor: "red" }}></div>;

  return (
    <div className="onlineDiv">
      {isOnline ? onlineIndicator : offlineIndicator}
      <span className="urlText">kearneyjohn.com {isOnline ? "- online" : "- offline"}</span>
      <div className="spacer"/>
      {isOnline2 ? onlineIndicator : offlineIndicator}
      <span className="urlText">core.kearneyjohn.com {isOnline2 ? "- online" : "- offline"}</span>
      <div className="spacer" />
      {isOnline3 ? onlineIndicator : offlineIndicator}
      <span className="urlText">auth.kearneyjohn.com {isOnline3 ? "- online" : "- offline"}</span>
      <div className="spacer" />
      {isOnline4 ? onlineIndicator : offlineIndicator}
      <span className="urlText">mc.kearneyjohn.com {isOnline4 ? "- online" : "- offline"}</span>
    </div>

  );
}

export default Status;
