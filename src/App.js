import React from 'react';
import './App.css';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/pesas.png" className="header-logo" alt="Logo" />
        <h1>MY GYM VIRTUAL by Naiara Feist</h1>
      </header>
      <main>
        <VideoPlayer />
      </main>
    </div>
  );
}

export default App;
