const mainContainer = document.getElementById('main-container');
const exitButton = document.getElementById('exit-button');
const popUp = document.getElementById('pop-up');
const submitButton = document.getElementById('submit-button');
const nameInput = document.getElementById('name-input');
const questionInput = document.getElementById('question-input');
const messagesButton = document.getElementById('messages-button');
const projectsButton = document.getElementById('projects-button');
projectsButton.addEventListener('click', function(){
    alert('Projects link coming soon...');
})

messagesButton.addEventListener('click', function () {
    popUp.style.zIndex = 4;
});

exitButton.addEventListener('click', function () {
    popUp.style.zIndex = -4;
});

submitButton.addEventListener('click', function () {
    // Your submit button logic goes here
});

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Set initial canvas size
setCanvasSize();

// Function to set canvas size based on window size
function setCanvasSize() {
    canvas.width = window.innerWidth ;
    canvas.width = `${canvas.width}` + '0'  // Concatenate without the +
    canvas.height = window.innerHeight;
    console.log(canvas.width)
}

// Optional: Adjust canvas size when the window is resized
window.addEventListener('resize', setCanvasSize);


// Initialize the interval speed and acceleration
let intervalSpeed = 1000; // Initial interval speed (milliseconds)
let acceleration = 10; // Acceleration rate

// Function to draw random lines
function drawRandomLines() {
    const numLines = Math.floor(Math.random() * 500);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        const startX = Math.random() * canvas.width + 200;
        const startY = Math.random() * canvas.height + 200;

        const lineLength = Math.random() * 1 + 3;

        const angle = Math.random() * 2 * Math.PI;
        const endX = startX + lineLength * Math.cos(angle);
        const endY = startY + lineLength * Math.sin(angle);

        ctx.strokeStyle = getRandomColor();
        ctx.lineWidth = getRandomLineWidth();

        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
}

// Function to get a random color
function getRandomColor() {
    return 'white';
}

// Function to get a random line width
function getRandomLineWidth() {
    return Math.floor(Math.random() * 5) + 1;
}

// Function to update the speed
function updateSpeed() {
    if (intervalSpeed < 1000) {
        acceleration = 1000; // Lower acceleration when approaching higher speed
    }

    intervalSpeed += acceleration;
}

// Event listener for animation iteration
document.getElementById('background-container').addEventListener('animationiteration', function (event) {
    // Check if the animation is the 'slideAnimation'
    if (event.animationName === 'slideAnimation') {
        // Call the drawRandomLines function
        drawRandomLines();
    }
});
const databaseURL = "https://randemcoding-509a9-default-rtdb.firebaseio.com/messages.json"
submitButton.addEventListener('click', function () {
    const name = document.getElementById('name-input')
    const question = document.getElementById('question-input');
    // Assuming you have userData defined somewhere in your code
    const userData = {
        name: name.value,
        message: question.value
    };
  
    fetch(databaseURL, {
      method: 'PATCH',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(responseData => {
        console.log('Data posted successfully:', responseData);
        location.reload();
        alert('Your message was sent we will get back to you as soon as possible!');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
    // Add a click event listener to the reload button
    
  });