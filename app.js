let ballX = 50;
let ballY = 50;
let paddle1Y = 250;
let paddle2Y = 250;
let ballSpeedX = 10;
let ballSpeedY = 4;
const paddleHeight = 100;
let player1Score = 0
let player2Score = 0

//Gets canvas tag from HTML
const canvas = document.querySelector('.gameCanvas');
const canvasContext = canvas.getContext('2d')

function selectedGameLength() {
    return document.querySelector('.length').value
}

//Gets movement of mouse to move paddle
function calculateMousePosition(event) {
    let rect = canvas.getBoundingClientRect()
    let root = document.documentElement
    let mouseX = event.clientX - rect.left - root.scrollLeft
    let mouseY = event.clientY - rect.top - root.scrollTop
    return {
        x: mouseX,
        y: mouseY
    }
}

//function for when game ends and you click on continue
function handleMouseClick(event) {
    startGame()
}

let showWinScreen = true
//Starts game
function startGame() {

    if (showWinScreen) {
        player1Score = 0
        player2Score = 0
        showWinScreen = false
    }
}

let framesPerSecond = 30;
setInterval(function () {
    moveEverything()
    drawEverything()
}, 1000 / framesPerSecond);

//Gets mouse click to restart game after it finishes
canvas.addEventListener('mousedown', handleMouseClick)

//Tracks mouse movement to move paddle
canvas.addEventListener('mousemove', function (event) {
    let mousePosition = calculateMousePosition(event)
    paddle1Y = mousePosition.y - (paddleHeight / 2)
})

//Resets ball to middle when player scores
function ballReset() {
    if (player1Score >= selectedGameLength() || player2Score >= selectedGameLength()) {
        showWinScreen = true
    }

    ballSpeedX = -ballSpeedX
    ballX = 800 / 2
    ballX = 600 / 2
}

function computerMovement() {
    let paddle2YCenter = paddle2Y + (paddleHeight / 2)
    if (paddle2YCenter < ballY - 35) {
        paddle2Y += 6
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y -= 6
    }
}

function moveEverything() {
    if (showWinScreen) {
        return
    }
    computerMovement()

    ballX = ballX + ballSpeedX
    ballY = ballY + ballSpeedY
    //get canvas.width
    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX

            let deltaY = ballY - (paddle1Y + paddleHeight / 2)
            ballSpeedY = deltaY * 0.35
        } else {
            player2Score += 1
            ballReset()
        }
    }
    if (ballX > 800) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX

            let deltaY = ballY - (paddle2Y + paddleHeight / 2)
            ballSpeedY = deltaY * 0.35
        } else {
            player1Score += 1 //must be before ballReset()
            ballReset()
        }
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY
    }
    if (ballY > 600) {
        ballSpeedY = -ballSpeedY
    }
}

function drawNet() {
    for (let i = 0; i < 800; i += 40) {
        colorRectangle(800 / 2 - 1, i, 2, 20, 'grey')
    }
}

let startScreen = true

function drawEverything() {
    //Blanks out the screen with black
    colorRectangle(0, 0, 800, 600, 'black')

    if (startScreen) {
        canvasContext.fillStyle = "#DA1FFF"
        canvasContext.font = "50px Ariel"
        canvasContext.fillText("Welcome to Tennis Game!", 150, 200)
        canvasContext.fillStyle = "#63FEFF"
        canvasContext.fillText("Click to Start!", 270, 500)
        canvas.addEventListener('click', () => {
            startScreen = false
        })
    }

    if (showWinScreen) {
        canvasContext.font = "50px Ariel"
        if (player1Score >= selectedGameLength()) {
            canvasContext.fillStyle = "#DA1FFF"
            canvasContext.fillText("YOU WON!", 280, 200)
            canvasContext.fillStyle = "#63FEFF"
            canvasContext.fillText("Click to continue!", 220, 500)
        } else if (player2Score >= selectedGameLength()) {
            canvasContext.fillStyle = "#DA1FFF"
            canvasContext.fillText("YOU FUCKING SUCK!", 160, 200)
            canvasContext.fillStyle = "#63FEFF"
            canvasContext.fillText("Click to continue!", 220, 500)
        }

        return
    }

    drawNet()

    const paddleThickness = 10
    //This is left player paddle
    colorRectangle(0, paddle1Y, paddleThickness, paddleHeight, 'blue')
    //This is right computer paddle
    colorRectangle(790, paddle2Y, paddleThickness, paddleHeight, 'red')
    //Draws the ball
    colorCircle(ballX, ballY, 10, 'Lime')

    canvasContext.fillText(player1Score, 100, 100)
    canvasContext.fillText(player2Score, 800 - 100, 100)
}

function colorCircle(centerX, centerY, radius, circleColor) {
    canvasContext.fillStyle = circleColor;
    canvasContext.beginPath()
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true)
    canvasContext.fill()
}

function colorRectangle(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(leftX, topY, width, height)
}