import React, { useEffect } from 'react';
import { string } from 'prop-types';

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

NotificationAudio.propTypes = {
  src: string.isRequired,
};

export default NotificationAudio;
