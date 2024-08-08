import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import './AudioResponse.css';

const AudioResponse = ({ onNewMessage }) => {
    const [recording, setRecording] = useState(false);
    const [loading, setLoading] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [textMessage, setTextMessage] = useState('');
    const startRecording = () => {
        setRecording(true);
    };

    const stopRecording = () => {
        setRecording(false);
    };

    const onData = (recordedBlob) => {
        console.log('chunk of real-time data is:', recordedBlob);
    };

    const sendAudioToServer = async (audioFile) => {
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 600000); 
        const formData = new FormData();
        formData.append('file', audioFile, 'audio.wav');

        try {       //Please provide url for ngrok each time you start the server cell
            const response = await fetch('https://7775-34-125-208-121.ngrok-free.app/api/chat', {
                method: 'POST',
                body: formData,
                mode: 'no-cors',
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                onNewMessage({ text: data.text, sender: 'bot' });
                setResponseText(data.text); // Update the state with the response text
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('Request timed out');
            } else {
                console.error('Request failed:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        sendAudioToServer(textMessage);
    };
    const onStop = async (recordedBlob) => {
        try {
            const audioURL = URL.createObjectURL(recordedBlob.blob);
            setAudioURL(audioURL);
            sendAudioToServer(recordedBlob.blob);
        } catch (error) {
            console.error('Error processing audio:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className="audio-response">
            <ReactMic
                record={recording}
                className="sound-wave"
                onStop={onStop}
                onData={onData}
                strokeColor="#000000"
                backgroundColor="#FF4081"
                mimeType="audio/wav"
            />
            <div>
                <button onClick={startRecording} disabled={recording}>
                    Start Recording
                </button>
                <button onClick={stopRecording} disabled={!recording}>
                    Stop Recording
                </button>
            </div>
            </div>
            {loading && <p>Loading...</p>}
            {audioURL && <audio controls src={audioURL} />}
            {responseText && (
                <div className="response-container">
                    <p>{responseText}</p>
                </div>
            )}
         </form>

    );
};

export default AudioResponse;
