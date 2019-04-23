import React, { useEffect } from 'react';

const audioSrc = `${process.env.PUBLIC_URL}/audio/timer.mp3`;

function NotificationAudio() {
  useEffect(() => {
    const audio = document.getElementById('audio');
    audio.play();
    return () => audio.pause();
  }, []);

  return (
    <audio id="audio" loop>
      <source src={audioSrc} type="audio/mpeg" />
    </audio>
  );
}

export default NotificationAudio;
