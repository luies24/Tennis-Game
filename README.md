# README

# Tennis Game App

> Allows users to play a game of tennis with the cumputer.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Contact](#contact)


## General info

Tennis Game allows players to play a simple game of pong against the computer and give the player
the ability to set how many points have to be scored during each match. 

## Technologies

- HTML - version 5
- CSS - version 3 
- Vanilla JavaScript 

## Setup

To run this project, install it locally by cloning the GitHub repository and 
typing the following command in your terminal:

$ lite-server

## Code Examples

JavaScript 

```
function drawEverything() {
    //Creates black box on the screen
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

```

## Features

- Lets player control game length by choosing how many points need to be scored.
- Lets player control when the game starts.
- User controls paddle with mouse.
- When game ends, player gets to control when the match resets.

## Status

Project is: finished with option to expand functionality and DRY out code.


## Contact

Created byv[Luis Garcia](https://www.linkedin.com/in/luis-garcia-83178b1b4/)
Feel free to contact us to talk music or talk code!!! 