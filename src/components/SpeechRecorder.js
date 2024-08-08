import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import './SpeechRecorder.css';

const SpeechRecorder = ({ onStop }) => {
  const [recording, setRecording] = useState(false);

  const startRecording = () => {
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  return (
    <div>
      <ReactMic
        record={recording}
        className="sound-wave"
        onStop={onStop}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <div className="controls">
        <button onClick={startRecording} disabled={recording}>Start</button>
        <button onClick={stopRecording} disabled={!recording}>Stop</button>
      </div>
    </div>
  );
};

export default SpeechRecorder;
