
//NASA Mars Weather API

//https://api.nasa.gov/insight_weather/?api_key=tfIFb6lDTBjtcDZD2cKJtmjbh8vyv8Gy4lIGFZgf&feedtype=json&ver=1.0


// Function to fetch rover photos
const fetchRoverPhotos = (rover, sol, camera, page) => {
    const apiKey = 'tfIFb6lDTBjtcDZD2cKJtmjbh8vyv8Gy4lIGFZgf'; 
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&page=${page}&api_key=${apiKey}`;
    
    fetch(apiUrl)
    .then(response => {
    // Check if the response status is 404
    if (!response.ok || response.status === 404) {
    console.log("length of 0 block 1");
    return fetch(apiUrl);
    }
    return response.json();
    })
    .then(data => {
    // Access and process the photo data
    const photos = data.photos;
    console.log(photos);
    /*console.log(photos[0].img_src);*/
    if (photos.length == 0) {
    console.log("length of 0 block");
    
    }
    else if (photos !== null && photos.length > 0) {
    document.querySelector('#random_mars_img').setAttribute('src', photos[0].img_src); 	//show image on page 
    
    } else {
    document.querySelector('#random_mars_img').setAttribute('src', photos[1].img_src); 	//show image on page 
    console.log("second img");
    }
    })
    .catch(error => {
    console.error(error);
    });
    };
    
    //song_lyrics
    const fetchLyrics = async () => {
    const url = 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=705707';
    const options = {
    method: 'GET',
    headers: {
    'X-RapidAPI-Key': '2b243ad26amsh3ba09f3f48a2657p19fed6jsn3e80b66385d2',
    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
};
    
    try {
    const response = await fetch(url, options);
    const result = await response.text();	
    const data = JSON.parse(result);
    const lyricsHtml = data.lyrics.lyrics.body.html;
    // Put the lyrics in the HTML file
    const lyrics = document.getElementById('lyrics');
    lyrics.innerHTML = lyricsHtml;
    
    } catch (error) {
    console.error(error);
    }
};
    
    //Random number generator function for generating different photos
    function generateRandomNumber() {
    const min = 50;
    const max = 1000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
    }
    
    // Example usage
    const random_number = generateRandomNumber();
    
    // Example usage: Fetch photos from Curiosity rover, sol 1000, with the Front Hazard Avoidance Camera (FHAZ)
    fetchRoverPhotos('curiosity', random_number, 'fhaz', 1);
    
    // You can choose to have an element with the class "window-top" inside of your draggable window that will act as the "handle" for the window or it will attach to the element itself
   
    /*
    function makeDraggable (elmnt) {
        // Make an element draggable (or if it has a .window-top class, drag based on the .window-top element)
        let currentPosX = 0, currentPosY = 0, previousPosX = 0, previousPosY = 0;
    
            // If there is a window-top classed element, attach to that element instead of full window
        if (elmnt.querySelector('.window-top')) {
            // If present, the window-top element is where you move the parent element from
            elmnt.querySelector('.window-top').onmousedown = dragMouseDown;
        } 
        else {
            // Otherwise, move the element itself
            elmnt.onmousedown = dragMouseDown;
        }
    
        function dragMouseDown (e) {
            // Prevent any default action on this element (you can remove if you need this element to perform its default action)
            e.preventDefault();
            // Get the mouse cursor position and set the initial previous positions to begin
            previousPosX = e.clientX;
            previousPosY = e.clientY;
            // When the mouse is let go, call the closing event
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves
            document.onmousemove = elementDrag;
        }
    
        function elementDrag (e) {
            // Prevent any default action on this element (you can remove if you need this element to perform its default action)
            e.preventDefault();
            // Calculate the new cursor position by using the previous x and y positions of the mouse
            currentPosX = previousPosX - e.clientX;
            currentPosY = previousPosY - e.clientY;
            // Replace the previous positions with the new x and y positions of the mouse
            previousPosX = e.clientX;
            previousPosY = e.clientY;
            // Set the element's new position
            elmnt.style.top = (elmnt.offsetTop - currentPosY) + 'px';
            elmnt.style.left = (elmnt.offsetLeft - currentPosX) + 'px';
        }
    
        function closeDragElement () {
            // Stop moving when mouse button is released and release events
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    
    // Make myWindow and myWindow2 draggable in different ways...
    
    // myWindow will only be able to be moved via the top bar (.window-top element). The main element does nothing on mouse down.
    makeDraggable(document.querySelector('#myWindow'));
    
    // myWindow2 will be able to moved by grabbing the entire element
    makeDraggable(document.querySelector('#myWindow2'));
    
    //And this is just for fun
    for (const closeElement of document.querySelectorAll('.round.red')) {
        closeElement.addEventListener('click', function () {
            
        });
    }*/
    
    fetchLyrics();

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

/* show music player and lyrics starts here*/

document.getElementById('music_folder_icon').onclick=function(){
    document.querySelector('.music_player').style.display='block';
    document.querySelector('.lyrics_window').style.display='block';
  };

/* show music player and lyrics ends here*/

/* hide music player and lyrics starts here*/

document.getElementById('close_window').onclick=function(){
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





