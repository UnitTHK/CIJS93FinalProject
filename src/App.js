import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Function to handle sending messages
  const sendMessage = async () => {
    const messageContent = input.trim();
    if (!messageContent) return;

    // Display the user's message on the chat interface
    setMessages(prevMessages => [...prevMessages, { text: messageContent, sender: 'user' }]);
    setInput('');

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: messageContent })
      });

      const data = await response.json();

      // Display the API's response on the chat interface
      setMessages(prevMessages => [...prevMessages, { text: data.reply, sender: 'api' }]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
      <div className="App">
        <div className="chat-container">
          <header className="chat-header">
            ChatBot Interface
          </header>
          <ul className="chat-messages">
            {messages.map((msg, index) => (
                <li key={index} className={`message ${msg.sender === 'user' ? 'user' : 'api'}`}>
                  {msg.text}
                </li>
            ))}
          </ul>
          <div className="chat-input">
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
  );
}

export default App;
