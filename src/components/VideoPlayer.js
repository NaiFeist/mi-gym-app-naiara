import React, { useRef } from 'react';
import YouTube from 'react-youtube';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VozOrdenes = () => {
  const videoRef = useRef(null); 

  const commands = [
    {
      command: 'Reproduce.',
      callback: () => videoRef.current && videoRef.current.playVideo()  // REPRODUCIR
    },
    {
      command: 'Stop.',
      callback: () => videoRef.current && videoRef.current.pauseVideo() // PARAR 
    },
    {
      command: 'Moon.',
      callback: () => videoRef.current && videoRef.current.mute() // MUTE
    },
    {
      command: 'The smooth.',
      callback: () => videoRef.current && videoRef.current.unMute() // DESMUTAR 
    },
    {
      command: 'Rewind.',
      callback: () => {
        if (videoRef.current) {
          const currentTime = videoRef.current.getCurrentTime(); // ADELANTAR
          videoRef.current.seekTo(currentTime - 10, true);
        }
      }
    },
    {
      command: 'Bus.',
      callback: () => {
        if (videoRef.current) {
          const currentTime = videoRef.current.getCurrentTime(); // ATRASAR
          videoRef.current.seekTo(currentTime + 10, true);
        }
      }
    },
  ];

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <p>El navegador no soporta el reconocimiento de voz.</p>;
  }

  const opts = {
    height: '480',
    width: '720',
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = (event) => {
    // Acceso al reproductor de YouTube en el evento `onReady`
    videoRef.current = event.target;
  };

  return (
    <div>
      <YouTube videoId="whNxJd9r20Q" opts={opts} onReady={onReady} />
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <p>Transcripción: {transcript}</p>

      <table className="commands-table">
        <thead>
          <tr>
            <th>Comando de Voz</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Reproduce</td>
            <td>reproducir</td>
          </tr>
          <tr>
            <td>Stop</td>
            <td>parar</td>
          </tr>
          <tr>
            <td>Moon</td>
            <td>mutear</td>
          </tr>
          <tr>
            <td>The Smooth</td>
            <td>desmutear</td>
          </tr>
          <tr>
            <td>Rewind</td>
            <td>adelantar</td>
          </tr>
          <tr>
            <td>Bus</td>
            <td>atrasar</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VozOrdenes;
