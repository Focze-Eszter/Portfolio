
var upButton = document.getElementById("up");
var running = false;
var surprise_gif1 = document.getElementById('surprise_cover');
var surprise_gif2 = document.getElementById('surprise_cover2');
var timer_countdown = document.querySelector('.timer');
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
}

}


    

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


/*reveal easteregg function*/

/*var delay = function (elem1, elem2, callback1, callback2) {
    var timeout = null;
   
    elem1.onmouseover = function() {
        // Set timeout to be a timer which will invoke callback after 1s
        let timeout = setTimeout(callback1, 1000);
        /*console.log(timeout);
        var timeleft = 8;
        var timer = setInterval(function(){
          if(timeleft <= 0) {
            clearInterval(timer);
            timer_countdown.innerHTML = "Boom";
          } else {
            timer_countdown.innerHTML = timeleft + " seconds remaining";
          }
          timeleft -= 1;
        }, 1000);   */

   /* };

    elem2.onmouseover = function() {
        // Set timeout to be a timer which will invoke callback after 1s
        let timeout2 = setTimeout(callback2, 0);
    };

    elem1.onmouseout = function() {
        // Clear any timers set to timeout
        clearTimeout(timeout);
    }

    elem2.onmouseout = function() {
        // Clear any timers set to timeout
        clearTimeout(timeout);
    }

};*/


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
}, 
{
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
    }
    });
}, options);

sections.forEach((section) => {
    observerTwo.observe(section);
});


/*delay(surprise_gif1, surprise_gif2, function() {
    surprise_gif1.style.display = 'none';}, function() {
    surprise_gif2.style.display = 'none';});*/

activatePanel();





















