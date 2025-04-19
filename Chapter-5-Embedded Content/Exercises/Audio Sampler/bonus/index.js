document.addEventListener('DOMContentLoaded', () => {
    const samples = document.querySelectorAll('.sample');
    let currentBtn = null;
  
    samples.forEach(btn => {
      const audio = btn.querySelector('audio');
  
      // when you click a sample…
      btn.addEventListener('click', () => {
        // if another clip is playing, stop & reset it
        if (currentBtn && currentBtn !== btn) {
          const prevAudio = currentBtn.querySelector('audio');
          prevAudio.pause();
          prevAudio.currentTime = 0;
          currentBtn.classList.remove('active');
        }
  
        // play / pause this one
        if (audio.paused) {
          audio.play();
          btn.classList.add('active');
          currentBtn = btn;
        } else {
          audio.pause();
          audio.currentTime = 0;
          btn.classList.remove('active');
          currentBtn = null;
        }
      });
  
      // when this clip ends, clear the active state
      audio.addEventListener('ended', () => {
        btn.classList.remove('active');
        if (currentBtn === btn) currentBtn = null;
      });
    });
  });
  