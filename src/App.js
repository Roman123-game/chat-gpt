import React, { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);

      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name); // Select the first voice by default
      }
    };

    // Load voices when they are available
    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
  };

  const speakText = () => {
    if (text.trim() === '') {
      alert('Please enter some text to speak.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(voice => voice.name === selectedVoice);
    utterance.voice = voice;
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
      <select value={selectedVoice} onChange={handleVoiceChange} style={{ marginBottom: '10px' }}>
        {voices.map((voice, index) => (
          <option key={index} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>
      <br />
      <button onClick={speakText} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Speak
      </button>
    </div>
  );
}

export default App;
