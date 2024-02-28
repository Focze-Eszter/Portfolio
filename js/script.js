
var upButton = document.getElementById("up");
var running = false;
var titles = document.querySelectorAll('.panel_title');
var animations = document.querySelectorAll('.animate');


/*show note/ hide note functions starts here*/
function show(target) {
    document.getElementById(target).style.display = 'block';
}

function hide(target) {
    document.getElementById(target).style.display = 'none';
} 

function activatePanel() {
   
    if (titles.length) {

    titles.forEach((title) => {
        title.addEventListener('click', (e) => {
        titles.forEach((title) => {
            title.classList.remove('active_tab');
            title.nextSibling.nextSibling.classList.remove('active_body'); /*panel_body class*/
        });

        e.preventDefault();
        title.classList.add('active_tab');
        title.nextSibling.nextSibling.classList.add('active_body');
        });
    });
}}
 

/*window.addEventListener("wheel", func, {passive: true}); /*reduce the time it takes to update the display after the user starts scrolling by wheel or touchpad*/
window.open('mailto:foczeeszter21@gmail.com?subject=subject&body=message');

/* scroll to top button starts here*/
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    upButton.style.display = "block";
  } else {
    upButton.style.display = "none";
  }
} 

upButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    running = true;
    while (running == true) {
        document.querySelector('.fired_rocket').style.display = 'block';
        console.log(running);
        running = false;
    }
    document.querySelector('.fired_rocket').style.display = 'none';

});

/* scroll to top button ends here*/



document.addEventListener("DOMContentLoaded", function() { 
    // this function runs when the DOM is ready, i.e. when the document has been parsed
    function expand(target) {
    console.log(target);
    document.querySelector(target).style.zIndex = "2";
}
});

/*intersection observers*/

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        if(entry.isIntersecting) observer.unobserve(entry.target) /*the animation plays only once, as soon as they are visible on the page, we are removing them from the observer, so they no longer call the function*/
    });
    }, {
    threshold: 1, /*1 - 100% of the element must be on the screen before the animation plays*/
    }
);

animations.forEach(animation => {
    observer.observe(animation);
});

const sections = document.querySelectorAll('section');
const nav = document.querySelector('nav');
const nav_list = document.querySelectorAll('.nav_list li');


    const options = {

        treshold: "1",
        rootMargin: "-200px 0px -100px 0px", /*dupa ce atinge elementul, se executa functia doar dupa cati pixeli sunt setati la marginea viewport-ului*/
    };

    const observerTwo = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {

                nav_list.forEach((link) => {

                if (e.target.id === link.dataset.nav) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        }});
    }, options);

    sections.forEach((section) => {
        observerTwo.observe(section);
    });

activatePanel();


/* The music player starts here*/ 

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
  
  // Play button
  document.querySelector('.play').addEventListener('click', function() {
    wavesurfer.play();
  });
  
  // Forward button
  document.querySelector('.forwards').addEventListener('click', function() {
    wavesurfer.skip(5);
  });
  
  // Backward button
  document.querySelector('.backwards').addEventListener('click', function() {
    wavesurfer.skip(-5);
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

  /* The music player starts here*/ 

  
  /* Display lyrics starts here */ 
  
    let lastDisplayedLine = null;

    document.addEventListener('DOMContentLoaded', function () {
        const audioPlayer = wavesurfer;
        const lyricsContainer = document.getElementById('lyrics');
        let isSeeking = false;

        // Parse LRC content into an array of objects { time, text }
        function parseLRC(data) {
            const lines = data.split('\n');

            const regex = /\[(\d{2}):(\d{2}\.\d{2})\](.*)/;

            return lines.map(line => {
                const match = regex.exec(line);
                if (match) {
                    const minutes = parseInt(match[1], 10);
                    const seconds = parseFloat(match[2]);
                    const time = minutes * 60 + seconds;
                    const text = match[3].trim();
                    return { time, text };
                }
                return null;
            }).filter(Boolean);
        }        


        // Display lyrics based on the current time of the audio
        function displayLyrics(lyrics) {
            const currentTime = wavesurfer.currentTime;
        
            // Find the lyric line where the current time is within a reasonable range
            const currentLine = findClosestLyric(lyrics, currentTime, 0.5); // Adjust the time range as needed
        
            // Check if the current line is different from the previously displayed lyric
            if (currentLine && (!lastDisplayedLine || currentLine !== lastDisplayedLine)) {
                lyricsContainer.textContent = currentLine.text;
                lastDisplayedLine = currentLine;
            }
        }

        // Find the closest lyric within a time range
        function findClosestLyric(lyrics, currentTime, timeRange) {
            let closestLine = null;
            let closestTimeDifference = Infinity;

            for (const line of lyrics) {
                const timeDifference = Math.abs(line.time - currentTime);

                if (timeDifference < timeRange && timeDifference < closestTimeDifference) {
                    closestLine = line;
                    closestTimeDifference = timeDifference;
                }
            }

            return closestLine;
        }


        // Load and parse the .lrc file
        fetch('assets/media/song.lrc')
        .then(response => response.text())
        .then(data => {
        const lyrics = parseLRC(data);

        // Define lyricsContainer
        const lyricsContainer = document.getElementById('lyrics');

        // Function to update the current verse based on the current time
        function updateLyricsScroll(currentTime) {
            const currentLine = findClosestLyric(lyrics, currentTime, 0.5);
            if (currentLine) {
            // Update the displayed lyric only if it's found
            lyricsContainer.textContent = currentLine.text;
            }
        }

        // Start the lyrics auto-scrolling when the audio starts playing
        wavesurfer.on('play', function() {
            // Update lyrics when audio starts playing
            updateLyricsScroll(wavesurfer.getCurrentTime());
        });

        // Event listener for time updates
        wavesurfer.on('timeupdate', function () {
            // Display lyrics based on the current time
            updateLyricsScroll(wavesurfer.getCurrentTime());
        });
    });
      /* Display lyrics ends here */ 
});


//NASA Mars Weather API

// Function to fetch rover photos

const fetchRoverPhotos = (rover, sol, camera, page) => {
    var apiKey = config.NASA_API_KEY;
    var apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&page=${page}&api_key=${apiKey}`;
    
    const fetchPhotos = () => {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok || response.status === 404) {
                    throw new Error('Photos not found');
                }
                return response.json();
            })
            .then(data => {
                const photos = data.photos;
                if (photos.length === 0) {
                    throw new Error('No photos found');
                    fetchPhotos();
                } else {
                    document.querySelector('#random_mars_img').setAttribute('src', photos[0].img_src); // Show image on page
                }
            })
            .catch(error => {
                console.error(error);
                // Retry fetching photos
                fetchPhotos();
            });
    };
    
    fetchPhotos();
};

// Add event listener to nasa_folder_icon
document.getElementById('nasa_folder_icon').addEventListener('click', () => {
    // Display window
    document.querySelector('.nasa_pic_window').style.display='block';
    // Random number generator function for generating different photos
    const random_number = generateRandomNumber();
    // Fetch photos from Curiosity rover, sol 1000, with the Front Hazard Avoidance Camera (FHAZ)
    fetchRoverPhotos('curiosity', random_number, 'fhaz', 1);
});

// Random number generator function for generating different photos
function generateRandomNumber() {
    const min = 50;
    const max = 1000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

/* parallax effect starts here */

    var sky = document.querySelector('.cyber_bg_img_back');
    var relief = document.querySelector('.cyber_bg_img_front');
    var me = document.querySelector('.me');
    
    window.addEventListener('scroll', function() {
        var value = this.window.scrollY;
        sky.style.top = -50 + value + 'px';
        relief.style.bottom = -50 - value * (-0.1) + 'px'; 
        me.style.bottom = -70 - (value) * (-0.08) + 'px'; 
    });

/* parallax effect ends here */

/* show about me window */

document.querySelector('.main_text h3 span').onclick=function(){
    document.querySelector('.about_me_window').style.display='block';
  };

/* about me window code ends here*/

/* hide about me window*/

document.getElementById('about_me_close_window').onclick=function(){
    document.querySelector('.about_me_window').style.display='none';
  };

/* hide music player and lyrics ends here*/

/* hide mars pic here*/
document.getElementById('mars_close_window').onclick=function(){
    document.querySelector('.nasa_pic_window').style.display='none';
  };
/* hide mars pic ends here*/


/* show music player and lyrics starts here*/

document.getElementById('music_folder_icon').onclick=function(){
    document.querySelector('.music_player').style.display='block';
    document.querySelector('.lyrics_window').style.display='block';
  };

/* show music player and lyrics ends here*/

/* hide music player and lyrics starts here*/

document.querySelector('.music_close_window').onclick=function(){
    document.querySelector('.music_player').style.display='none';
    document.querySelector('.lyrics_window').style.display='none';
  };

/* hide music player and lyrics ends here*/

/* show vituvian window starts here*/

document.getElementById('paint_folder_icon').onclick=function(){
    document.querySelector('.vituvian_window').style.display='block';
  };

/* show vituvian window ends here*/

/* hide vituvian window starts here*/

document.getElementById('vituvian_close_window').onclick=function(){
    document.querySelector('.vituvian_window').style.display='none';
  };

/* hide vituvian window ends here*/
