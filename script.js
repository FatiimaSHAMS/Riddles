// Fetching the riddle and answer from the API
function fetchRiddle() {
  closePanel();
  // Delay fetching by a little more than 0.3s (300ms)
  setTimeout(() => {
      fetch('https://riddles-api.vercel.app/random')
          .then(response => response.json())
          .then(data => {
              if (data.answer.length < 200 && data.riddle.length < 200) {
                document.getElementById('riddlePlaceholder').textContent = data.riddle;
                document.getElementById('answerPlaceholder').textContent = data.answer;
              } else {
                fetchRiddle();
              }
          })
          .catch(error => {
              console.error('Error fetching the riddle:', error);
          });
  }, 350);
}

// Calling the fetchRiddle function on page load to populate the placeholders
document.addEventListener('DOMContentLoaded', fetchRiddle);

// Code for toggling the panels open and closed
const leftPanel = document.querySelector('.left-panel');
const rightPanel = document.querySelector('.right-panel');

function togglePanel() {
  if(leftPanel.style.left==='-50%') {
    leftPanel.style.left='0';
    rightPanel.style.right='0';
  } else {
    leftPanel.style.left='-50%';
    rightPanel.style.right='-50%';
  }
}

function closePanel() {
  leftPanel.style.left='0';
  rightPanel.style.right='0';
}

// Function to check if page is scrolled and adjust the logo size
function checkScroll() {
    const navbar=document.getElementById("navbar");
    const logo=document.getElementById ("logo");
    let scrollPosition= window.scrollY;

    //Add/remove 'scrolled' class based on scroll position
    if(scrollPosition > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    //Calculate new font size based on scroll position
    let newSize= 3 - (scrollPosition * 0.03);// Decrease by 0.03 rem for every 1px scrolled 
 
    // Clamping the font size between 1.5rem and 3rem
    newSize = Math.max(1.5, newSize);
    newSize = Math.min(3,newSize);

    logo.style.fontSize = newSize + "rem";
}

// Event Listener for scroll event 
window.addEventListener('scroll', checkScroll);