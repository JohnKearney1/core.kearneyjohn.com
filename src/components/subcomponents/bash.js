import React, { useState } from 'react';
import jwt_decode from "jwt-decode";
// import './pitm.css';

const Bash = () => { 

  const [textValue1, setTextValue1] = useState('');
  const [logValue, setLogValue] = useState('');
  const [messages, setMessages] = useState([]);

  function log(text) {
    // Update the log textarea (append text)
    setLogValue(prevValue => prevValue + '\n' + text +'\n');

    // Set clear the input textbox
    setTextValue1('');
  }

  const handleInputChange = (e) => {
    setTextValue1(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // disable the textbox until handled
    const myInput = document.getElementById('input');
    myInput.disabled = true;
    myInput.readOnly = true;

    if (textValue1 === 'clear') {

      // clear the log
      setLogValue('');

      // clear the input field
      setTextValue1('');
    }
    else if (textValue1 === 'token') {
      const encodedToken = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode(encodedToken);
      log('Encoded: ' + encodedToken)
      log('Decoded: ' + JSON.stringify(decodedToken));
    }
    else {
      // Update the messages log
      setTextValue1('');
      ask(messages);
    } 

    const textarea = document.getElementById('textArea');
    textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight;

    // give focus back to the text box
    myInput.disabled = false;
    myInput.readOnly = false;
    myInput.focus();
    myInput.select();

  };

  function handleInputKeyDown(event) {
    if (event.key === 'ArrowUp') {
      const lastMessage = messages[messages.length - 2];
      if (lastMessage) {
        const inputArea = document.getElementById('input');
        inputArea.value = lastMessage.content
      }
    }
    if (event.key === 'ArrowDown') {
      const lastMessage = messages[messages.length - 2];
      if (lastMessage) {
        // set the 

        const inputArea = document.getElementById('input');
        inputArea.value = "";
      }
    }
  }


  async function ask(previousMessages) {
    console.log("async function Ask()");

    const messages = [...previousMessages, { role: "user", content: textValue1 }];

    // const messagesSet = new Set(messages);
    // const uniqueMessages = [...messagesSet];

    const uniqueMessages = messages.filter((message, index, self) =>
      index === self.findIndex((m) => m.content === message.content)
    );

    console.log(uniqueMessages);
    log(`User: ${textValue1}`);

    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: uniqueMessages,
    });
    log(`CoreAI: ${completion.data.choices[0].message.content.trim()}`)
    // setMessages(prevLogValues => [...prevLogValues, {role: 'assistant', content: completion.data.choices[0].message.content.trim()}]);
    console.log(`CoreAI: ${completion.data.choices[0].message.content.trim()}`);

    // set the response message from OpenAI
    setMessages([...uniqueMessages, { role: "user", content: textValue1 }, { role: "assistant", content: completion.data.choices[0].message.content.trim() }]);
  }

  return (
      <form className= 'form-div' onSubmit={handleFormSubmit}>
        <div className='spacer' />
        <textarea className='textArea' id='textArea' placeholder='> kearneyonline CoreAPI v0.1.0' value={logValue} readOnly></textarea>
        <div className='spacer' />
        <input type="text" id='input' onKeyDown={handleInputKeyDown} className='textbox' autoComplete='off' value={textValue1} onChange={handleInputChange} />
      </form>
  );
  
}

export default Bash;
