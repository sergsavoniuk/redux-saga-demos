import React, { useEffect } from 'react';

function NotificationAudio({ src }) {
  useEffect(() => {
    const audio = document.getElementById('audio');
    audio.play();
    return () => audio.pause();
  }, []);

  return (
    <audio id="audio" loop>
      <source src={src} type="audio/mpeg" />
    </audio>
  );
}

export default NotificationAudio;
