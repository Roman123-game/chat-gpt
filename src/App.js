import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const speakText = () => {
    if (text.trim() === '') {
      alert('Please enter some text to speak.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Text to Speech</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here"
        rows="4"
        cols="50"
        style={{ marginBottom: '10px' }}
      />
      <br />
      <button onClick={speakText} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Speak
      </button>
    </div>
  );
}

export default App;