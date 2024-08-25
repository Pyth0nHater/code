import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    return () => {
      tg.close();
    };
  }, []);

  const sendData = () => {
    const tg = window.Telegram.WebApp;
    tg.sendData("Hello from WebApp!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Telegram Web App</h1>
        <p>This is a simple web application served by your Telegram bot.</p>
        <button onClick={sendData}>Send Data to Bot</button>
      </header>
    </div>
  );
}

export default App;
