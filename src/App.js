import React, { useState } from 'react';
import AudioResponse from './AudioResponse';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      message
    ]);
  };

  const handleUserMessage = async (event) => {
    event.preventDefault();
    const userInput = event.target.elements.message.value;
    if (!userInput) return;
    addMessage({ text: userInput, sender: 'user' });
    event.target.reset();

    // Optionally send user text message to the backend
    try {                     //please change ngrok url each time you rerun the server
      const response = await fetch('https://7775-34-125-208-121.ngrok-free.app/api/chat/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),

      });
      const data = await response.json();
      addMessage({ text: data.text, sender: 'bot' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <div className="chat-box">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'bot' ? 'bot-message' : 'user-message'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleUserMessage}>
          <input type="text" name="message" placeholder="Type your message..." />
          <button type="submit">Send</button>
        </form>
        <AudioResponse onNewMessage={addMessage} />
      </div>
    </div>
  );
};

export default App;