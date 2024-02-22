/*import WaveSurfer from 'https://unpkg.com/wavesurfer.js@beta'*/

const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: '#5bf870',
  progressColor: '#2e6930',
  height: 50
});
wavesurfer.load('/assets/media/song.mp3');
//duration of track functions
const formatTime = (seconds) => {
const minutes = Math.floor(seconds / 60);
const secondsRemainder = Math.round(seconds) % 60;
const paddedSeconds = `0${secondsRemainder}`.slice(-2);
return `${minutes}:${paddedSeconds}`;
};

const timeEl = document.querySelector('#time');
const durationEl = document.querySelector('#duration');

wavesurfer.on('decode', function(duration) {
durationEl.textContent = formatTime(duration);
});

wavesurfer.on('timeupdate', function(currentTime) {
timeEl.textContent = formatTime(currentTime);
});

/*
//progress-bar function
var progressBar = document.getElementById('progress-bar');
wavesurfer.on('audioprocess', function(progress) {
progressBar.style.width = `${progress * 100}%`;
});*/

// Play button
document.querySelector('.play').addEventListener('click', function() {
wavesurfer.play();
});

// Forward button
document.querySelector('.forwards').addEventListener('click', function() {
wavesurfer.skip(5); // Adjust the skip duration as desired
});

// Backward button
document.querySelector('.backwards').addEventListener('click', function() {
wavesurfer.skip(-5); // Adjust the skip duration as desired
});

// Pause button
document.querySelector('.pause').addEventListener('click', function() {
wavesurfer.pause();           
});

// Stop button
document.querySelector('.stop').addEventListener('click', function() {
wavesurfer.stop();
});

// volume button
const volumeButton = document.querySelector('.volume');
const volumeSlider = document.getElementById('volumeSlider');

volumeButton.addEventListener('click', function() {
volumeSlider.style.display = 'block';
volumeSlider.style.transform= 'rotate(270deg)';

});

volumeSlider.addEventListener('input', function() {
var volumeValue = parseFloat(this.value);
wavesurfer.setVolume(volumeValue);
});

document.addEventListener('mouseup', (event) => {
const target = event.target;
if (target !== volumeButton && target !== volumeSlider) {
volumeSlider.style.display = 'none';
}
});


/* lyrics auto scroller starts here */
  
   /*
    document.addEventListener('DOMContentLoaded', function() {
        var temp_lyrics = document.querySelector('.temp_lyrics');
        var verses = temp_lyrics.querySelectorAll('.verse');
        var verseCount = verses.length;
        var currentVerse = 0;
        var verseHeight = temp_lyrics.clientHeight / verseCount;
      
        // Function to update the current verse based on the current time
        function updateLyricsScroll(currentTime) {
          const verseIndex = Math.floor(currentTime / 5); // Assuming each verse takes 5 seconds
          const verseFraction = currentTime % 5 / 5; // Fraction of the current verse elapsed
      
          // Calculate the translateY value to scroll from the bottom to the middle
          const translateY = -(verseIndex + verseFraction) * verseHeight + (temp_lyrics.clientHeight / 2);
      
          temp_lyrics.style.transform = `translateY(${translateY}px)`;
        }
      
        // Function to start the auto-scrolling loop
        function startAutoScrolling() {
          currentVerse = Math.floor(wavesurfer.getCurrentTime() / 5); // Set current verse based on the audio's current time
          updateLyricsScroll(wavesurfer.getCurrentTime()); // Update the initial scrolling position
          wavesurfer.on('audioprocess', function(currentTime) {
            updateLyricsScroll(currentTime);
          });
        }
      
        // Function to stop the auto-scrolling loop
        function stopAutoScrolling() {
          wavesurfer.un('audioprocess');
        }
      
        // Start the lyrics auto-scrolling when the audio starts playing
        wavesurfer.on('play', function() {
          startAutoScrolling();
        });
      
        // Stop the lyrics auto-scrolling when the audio is paused or stops
        wavesurfer.on('pause', function() {
          stopAutoScrolling();
        });
        wavesurfer.on('finish', function() {
          stopAutoScrolling();
        });
      
        // Optional: Reset lyrics position to the first verse when audio is stopped
        wavesurfer.on('stop', function() {
          temp_lyrics.style.transform = `translateY(-${verseHeight}px)`; // Reset to the initial position
        });
      });

      */


      document.addEventListener('DOMContentLoaded', function() {
        var temp_lyrics = document.querySelector('.temp_lyrics');
        var verses = temp_lyrics.querySelectorAll('.verse');
        var verseCount = verses.length;
        var currentVerse = 0;
        var verseHeight = temp_lyrics.clientHeight / verseCount;
      
        // Function to update the current verse based on the current time
        function updateLyricsScroll(currentTime) {
          /*var verseIndex = Math.floor(currentTime / 40); // Assuming each verse takes 5 seconds
          var verseFraction = currentTime % 40 / 40; // Fraction of the current verse elapsed*/

          /*if(currentTime >= 38.0 && currentTime <= 59.0) {
            var verseIndex = Math.floor(currentTime / 35); 
            var verseFraction = currentTime % 35 / 35; 
            console.log(translateY);
          } else {
        // Normal part of the song
            verseIndex = Math.floor(currentTime / 40);
            verseFraction = currentTime % 40 / 40;*/
            var verseDuration = 40;
            if (currentTime >= 38.0 && currentTime <= 59.0) {
              // During the faster part of the song, each verse takes 30 seconds
              verseDuration = 30;
              temp_lyrics.style.transform = `translateY(${translateY + 50}px)`;

            }

            verseIndex = Math.floor(currentTime / verseDuration);
    verseFraction = currentTime % verseDuration / verseDuration;

    // Calculate the verseHeight based on the number of verses displayed on the screen
    var verseHeight = temp_lyrics.clientHeight / verseCount;

    // Calculate the translateY value to scroll from the bottom to the middle
    var translateY = -(verseIndex + verseFraction) * verseHeight + (temp_lyrics.clientHeight / 2);

    temp_lyrics.style.transform = `translateY(${translateY}px)`;
  }
    
      
          /* Calculate the translateY value to scroll from the bottom to the middle
          var translateY = -(verseIndex + verseFraction) * verseHeight + (temp_lyrics.clientHeight / 2);
      
          temp_lyrics.style.transform = `translateY(${translateY}px)`;
        }*/
      
        // Function to start the auto-scrolling loop
        function startAutoScrolling() {
          currentVerse = Math.floor(wavesurfer.getCurrentTime() / 40); // Set current verse based on the audio's current time
          updateLyricsScroll(wavesurfer.getCurrentTime()); // Update the initial scrolling position
          wavesurfer.on('audioprocess', function(currentTime) {
            updateLyricsScroll(currentTime);
          });
        }
      
        // Function to stop the auto-scrolling loop
        function stopAutoScrolling() {
          wavesurfer.un('audioprocess');
        }
      
        // Start the lyrics auto-scrolling when the audio starts playing
        wavesurfer.on('play', function() {
          startAutoScrolling();
        });
      
        // Stop the lyrics auto-scrolling when the audio is paused or stops
        wavesurfer.on('pause', function() {
          stopAutoScrolling();
        });
        wavesurfer.on('finish', function() {
          stopAutoScrolling();
        });
      
        // Optional: Reset lyrics position to the first verse when audio is stopped
        wavesurfer.on('stop', function() {
          temp_lyrics.style.transform = `translateY(-${verseHeight}px)`; // Reset to the initial position
        });
      });
      
      

      
      
      
      
      
/* lyrics auto scroller ends here */


