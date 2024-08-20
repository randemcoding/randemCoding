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
});

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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas.width);
}

// Optional: Adjust canvas size when the window is resized
window.addEventListener('resize', setCanvasSize);

// Initialize the interval speed and acceleration
let intervalSpeed = 1000; // Initial interval speed (milliseconds)
let acceleration = 10; // Acceleration rate

// Function to draw random lines
function drawLines() {
    const startXArray = JSON.parse(localStorage.getItem('start-x-save'));
    const startYArray = JSON.parse(localStorage.getItem('start-y-save'));
    const endXArray = JSON.parse(localStorage.getItem('end-x-save'));
    const endYArray = JSON.parse(localStorage.getItem('end-y-save'));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < startXArray.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = getRandomColor();
        ctx.lineWidth = getRandomLineWidth();

        ctx.moveTo(startXArray[i], startYArray[i]);
        ctx.lineTo(endXArray[i], endYArray[i]);
        ctx.stroke();
    }
}

function getLines() {
    const numLines = Math.floor(Math.random() * 10);
    
    let startXArray = [];
    let startYArray = [];
    let endXArray = [];
    let endYArray = [];

    for (let i = 0; i < numLines; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * 10;

        const lineLength = Math.random() * 1 + 3;

        const angle = Math.random() * 2 * Math.PI;
        const endX = startX + lineLength * Math.cos(angle);
        const endY = startY + lineLength * Math.sin(angle);

        startXArray.push(startX);
        startYArray.push(startY);
        endXArray.push(endX);
        endYArray.push(endY);
    }

    localStorage.setItem('start-x-save', JSON.stringify(startXArray));
    localStorage.setItem('start-y-save', JSON.stringify(startYArray));
    localStorage.setItem('end-x-save', JSON.stringify(endXArray));
    localStorage.setItem('end-y-save', JSON.stringify(endYArray));
}
function getUpdatedLines() {
    const numLines = Math.floor(Math.random() * 10);
    let startXArray = JSON.parse(localStorage.getItem('start-x-save'))
    let startYArray = JSON.parse(localStorage.getItem('start-y-save'))
    let endXArray = JSON.parse(localStorage.getItem('end-x-save'))
    let endYArray = JSON.parse(localStorage.getItem('end-y-save'))
    

    for (let i = 0; i < numLines; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * 10;

        const lineLength = Math.random() * 1 + 3;

        const angle = Math.random() * 2 * Math.PI;
        const endX = startX + lineLength * Math.cos(angle);
        const endY = startY + lineLength * Math.sin(angle);

        startXArray.push(startX);
        startYArray.push(startY);
        endXArray.push(endX);
        endYArray.push(endY);
    }

    localStorage.setItem('start-x-save', JSON.stringify(startXArray));
    localStorage.setItem('start-y-save', JSON.stringify(startYArray));
    localStorage.setItem('end-x-save', JSON.stringify(endXArray));
    localStorage.setItem('end-y-save', JSON.stringify(endYArray));
}
// Function to move the lines
function moveStars() {
    const startXArray = JSON.parse(localStorage.getItem('start-x-save'));
    const startYArray = JSON.parse(localStorage.getItem('start-y-save'));
    const endXArray = JSON.parse(localStorage.getItem('end-x-save'));
    const endYArray = JSON.parse(localStorage.getItem('end-y-save'));

    let newStartXArray = [];
    let newStartYArray = [];
    let newEndXArray = [];
    let newEndYArray = [];

    for (let i = 0; i < startXArray.length; i++) {
        let a = Number(startXArray[i])+.1;
        let b = Number(startYArray[i]) + 1;
        let c = Number(endXArray[i]) +.1;
        let d = Number(endYArray[i]) + 1;

        if (a <= canvas.width && c <= canvas.width && b <= canvas.height && d <= canvas.height) {
            newStartXArray.push(a);
            newEndXArray.push(c);
            newStartYArray.push(b);
            newEndYArray.push(d);
        } 
    }

    // Save the updated arrays and numLines back to localStorage
    localStorage.setItem('start-x-save', JSON.stringify(newStartXArray));
    localStorage.setItem('start-y-save', JSON.stringify(newStartYArray));
    localStorage.setItem('end-x-save', JSON.stringify(newEndXArray));
    localStorage.setItem('end-y-save', JSON.stringify(newEndYArray));
}
const colorArray = ['white', 'gray', 'gold']

// Function to get a random color
function getRandomColor() {

    return colorArray[Math.floor(Math.random() * 3)]
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

getLines();
drawLines();

// Set interval to move the lines and redraw them every 500ms
setInterval(function() {
    moveStars();
    drawLines();
}, 10);
setInterval(function() {
    getUpdatedLines();
}, 500);
// Event listener for animation iteration
const databaseURL = "https://randemcoding-509a9-default-rtdb.firebaseio.com/messages.json";
submitButton.addEventListener('click', function () {
    const name = document.getElementById('name-input');
    const question = document.getElementById('question-input');
    
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
});
