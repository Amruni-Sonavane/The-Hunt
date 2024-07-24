let score = 0;
let cross = true;
let isGameOver = false;
let audio = new Audio('music.mp3');
let audiogo = new Audio('gameover.mp3');

// Function to hide the creator div
function hideCreatorDiv() {
    let creatorDiv = document.querySelector('.creator');
    if (creatorDiv) {
        creatorDiv.style.display = 'none';
    }
}

// Function to show the creator div
function showCreatorDiv() {
    let creatorDiv = document.querySelector('.creator');
    if (creatorDiv) {
        creatorDiv.style.display = 'block';
    }
}

function playMusic() {
    audio.play();
}

audio.addEventListener('ended', function() {
    setTimeout(playMusic, 1000); // Restart audio after 1 second
});

document.addEventListener('keydown', function(e) {
    if (isGameOver) return;
    console.log("key code is: ", e.keyCode);
    let deer = document.querySelector('.deer');
    let deerX = parseInt(window.getComputedStyle(deer, null).getPropertyValue('left'));
    let windowWidth = window.innerWidth;

    if (e.key === 'ArrowUp') {
        if (deer && !deer.classList.contains('animatedeer')) {
            deer.classList.add('animatedeer');
            setTimeout(() => {
                deer.classList.remove('animatedeer');
            }, 650); 
        }
    }

    if (e.keyCode === 39) {
        if (deerX + 280 < windowWidth - 140) {
            deer.style.left = (deerX + 280) + "px";
        }
    }

    if (e.keyCode === 37) {
        if (deerX - 280 >= 0) {
            deer.style.left = (deerX - 280) + "px";
        }
    }
});

window.onload = function() {
    let obstacle = document.querySelector('.obstacle');
    let scoreCont = document.getElementById('scoreCont');
    if (obstacle) {
        startObstacleAnimation(obstacle);
    }

    let gameInterval = setInterval(() => {
        let deer = document.querySelector('.deer');
        let gameOver = document.querySelector('.gameOver');
        let obstacle = document.querySelector('.obstacle');

        let deerRect = deer.getBoundingClientRect();
        let obstacleRect = obstacle.getBoundingClientRect();

        let offsetX = Math.abs(deerRect.left - obstacleRect.left);
        let offsetY = Math.abs(deerRect.top - obstacleRect.top);

        if (offsetX < 93 && offsetY < 52) {
            gameOver.style.display = 'flex';
            obstacle.style.animation = 'none';
            isGameOver = true;
            clearInterval(gameInterval);
            audiogo.play();
            audio.pause(); // Pause music when audiogo plays
        } 
        else if (offsetX < 145 && cross) {
            score += 1;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
            setTimeout(() => {
                let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                let newDur = aniDur - 0.2;
                if (newDur < 1) newDur = 1;
                obstacle.style.animationDuration = newDur + 's';
                startObstacleAnimation(obstacle);
            }, 500);
        }

    }, 100);

    function startObstacleAnimation(obstacle) {
        obstacle.classList.remove('obstacleAni');
        obstacle.style.left = '-370px';
        setTimeout(() => {
            obstacle.classList.add('obstacleAni');
        }, 10);
    }

    function updateScore(score) {
        scoreCont.innerHTML = "YOUR SCORE: " + score;
    }

    // Hide the creator div after 3 seconds
    setTimeout(hideCreatorDiv, 3000);
    
    // Start playing music
    playMusic();
};
