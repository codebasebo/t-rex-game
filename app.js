
document.addEventListener('DOMContentLoaded', function () {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    let gravity = 0.9;
    let isJumping = false;
    let position = 0;
    let isGameOver = false; // Track game state

    function startGame() {
        // Update the message or start the game logic
        document.getElementById("alert").textContent = "Game Started!";
        console.log("Game started!");
    }

    function control(e) {
        if (e.code === "Space") {
            if (!isJumping) {
                jump();
            }
        }
    }

    function jump() {

        isJumping = true;
        let count = 0;
        let timerId = setInterval(function () {
            if (count === 15) {
                clearInterval(timerId);
                let downTimerId = setInterval(function () {
                    if (count === 0) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
                    position -= 5;
                    count--;
                    position *= gravity;
                    dino.style.bottom = position + 'px';
                }, 20);
            }
            position += 30
            count++
            position = position * gravity
            dino.style.bottom = position + 'px'
        }, 20);
    }

    function generateObstacles() {
        if (!isGameOver) {
            let randomTime = Math.random() * 4000;
            let obstaclePosition = 1000;
            const obstacle = document.createElement('div');
            obstacle.classList.add('obstacle');
            grid.appendChild(obstacle);
            obstacle.style.left = obstaclePosition + 'px';

            let timerId = setInterval(function () {
                if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                    clearInterval(timerId);
                    gameOver();
                }
                obstaclePosition -= 10;
                obstacle.style.left = obstaclePosition + 'px';

                if (obstaclePosition < -60) {
                    grid.removeChild(obstacle);
                }
            }, 20);

            if (!isGameOver) {
                setTimeout(generateObstacles, randomTime);
            }
        }
    }

    function gameOver() {
        isGameOver = true;
        document.getElementById("alert").textContent = "Game Over!";

        // Remove only obstacles, preserve dino
        const obstacles = document.querySelectorAll('.obstacle');
        obstacles.forEach(obstacle => obstacle.remove());

        setTimeout(resetGame, 2000);
    }

    function createDino() {
        const dino = document.createElement('div');
        dino.classList.add('dino');
        grid.appendChild(dino);
        return dino;
    }

    function resetGame() {
        isGameOver = false;
        isJumping = false;
        position = 0;
        score = 0;

        // Ensure dino exists
        let dino = document.querySelector('.dino');
        if (!dino) {
            dino = createDino();
        }
        dino.style.bottom = '0px';

        document.getElementById("alert").textContent = "Press Space to Start";
        document.getElementById("alert").style.display = "block";

        // Wait for space to restart
        const startHandler = (e) => {
            if (e.code === "Space") {
                generateObstacles();
                document.getElementById("alert").style.display = "none";
                document.removeEventListener('keydown', startHandler);
            }
        };
        document.addEventListener('keydown', startHandler);
    }

    generateObstacles();

    // Add event listener for starting the game
    document.addEventListener("keydown", function (event) {
        if (event.code === 'Space') {
            startGame();
        }
    });

    // Add event listener for controlling the dino
    document.addEventListener('keydown', control);
});