import BasicZombie from "../Enemies/BasicZombie.js";
import Player from "../Player/Player.js"
import Background from "../Scenario/Background.js"
import Handler from "../Manager/Handler.js"
import Spanwer from "../Manager/Spawner.js"

// canvas varibales
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.height = innerHeight;
let canvasPosX = innerWidth * 0.25;
canvas.width = innerWidth / 2;

if (innerWidth < 813) {
    canvas.width = innerWidth;
    canvasPosX = 0;

}

context.imageSmoothingEnabled = false;

// context.fillStyle = "rgba(255,0,0,0.05)";
// context.fillRect(0, 0, canvas.width, canvas.height);

// background variables
let backPosY1 = 0;
let backPosY2 = 0;
const roadImg = new Image();
roadImg.src = "../Resources/road.png";
const background1 = new Background(roadImg);
const background2 = new Background(roadImg);

const catImg = new Image();
catImg.src = "../Resources/cat.jpg"
catImg.onload = () => {
    context.drawImage(catImg, 0, 0, canvas.width, canvas.height);
}

// animation time variables
let lastTime;
let delta;
let timeSec;
let prevTime = 0;
let scoreCount;

// game variables
const gameSpeed = 20;
const speedMultiplier = 0.1;
let gameStarted = false;
let gameOver = false;
let pause = false;
let finalScore = 0;
let totalScore = 0;
let animation;


let prevTract = 0;
let trackScore = 1;

// score elemtents 
const currentScoreEl = document.getElementsByClassName("current_score")[0];
const totalScoreWrapper = document.getElementsByClassName("total_score_wrapper")[0];
const totalScoreText = document.getElementsByClassName("total_score")[0];
const startButton = document.getElementsByClassName("start_button")[0];
const startContainer = document.getElementsByClassName("start_container")[0];
const playAgainBtn = document.getElementsByClassName("play_again_button")[0];

// initiate variables
let handler;
let player;
let spanwer;

const cursor = {
    x: null,
    y: null,
};

canvas.addEventListener("touchmove", e => {

    if (e.touches) {
        let touchPosY = e.touches[0].screenY;
        let mult = 3;

        cursor.x = e.touches[0].clientX;
        cursor.y = e.touches[0].clientY;
        player.setPosX(cursor.x)
        player.setPosY(cursor.y)
        e.preventDefault();
    }

}, { passive: false })

function handle() {
addEventListener("resize", e => {
    if (innerWidth > 813) {
        canvas.width = innerWidth / 2;
    }
});
}

handle();


// start button
startButton.addEventListener("click", e => {
    if (!gameStarted) {
        let fullScreen = openFullscreen();
        cursor.x = e.clientX;
        cursor.y = e.clientY;
        init(fullScreen);
        start();
        startContainer.classList.add("hide");
        // canvas.style.cursor = "none"

    }
});

// play again button
playAgainBtn.addEventListener("click", e => {
    if (gameOver) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
        gameOver = false;
        console.log(gameOver)
        player.setPosX(canvas.width / 2 - 20);
        player.setPosY(canvas.height - 40);
        currentScoreEl.classList.remove("hide");
        totalScoreWrapper.classList.add("hide");
        canvas.style.cursor = "none"
        run();
    }
});

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}




addEventListener("mousemove", e => {
    if (gameStarted) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
        player.setPosX(cursor.x)
        player.setPosY(cursor.y)
        if (cursor.x - 20 < canvasPosX || cursor.x + 20 > canvasPosX + canvas.width ||
            cursor.y - 20 <= 0 || cursor.y + 20 > canvas.height) {
            // if (gameStarted) {
            //     pause = true;
            // } 
        }
    }

});



function init(fullScreen) {
    let w = 40;
    let h = 42;
    // if(innerWidth > 813) {
    //     w = 40;
    // }

    let space = 125;
    if (fullScreen) {
        space = 175;
    }

    // initiating variables
    handler = new Handler();
    spanwer = new Spanwer(handler, canvas, canvasPosX, context);
    player = new Player(canvas.width / 2, canvas.height /2 , w, h, canvas.width, canvas.height, canvasPosX, context, "../Resources/player.png", handler, 10, end, space, getMobileOperatingSystem());
    // handler.addEnemy(new BasicZombie(canvas.width / 2, canvas.height / 2, w, h, 0, 0, canvas.width, canvas.height, canvasPosX, context, "../Resources/zombie.png", handler, 9));

}


function start() {
    gameStarted = true;
    currentScoreEl.classList.remove("hide");
    // canvas.style.cursor = "none"
    run();
}

function end() {
    handler.clear();
    gameOver = true;
    currentScoreEl.classList.add("hide");
    totalScoreWrapper.classList.remove("hide");
    totalScoreText.innerText = "Total score: " + Math.round(trackScore);
    canvas.style.cursor = "default"
    trackScore = 0;

}

function run() {
    render();
}

// handle backgrouund movement
function backgroundMovement() {
    backPosY1 = backPosY1 + gameSpeed;
    backPosY2 = backPosY2 + gameSpeed;

    if (backPosY1 * speedMultiplier >= canvas.height) {
        backPosY1 = -canvas.height * 10;
    }

    if (-(canvas.height) + backPosY2 * speedMultiplier >= canvas.height) {

        backPosY2 = 0;
    }

    background1.render(context, backPosY1 * speedMultiplier, canvas.width, canvas.height);
    background2.render(context, -(canvas.height) + backPosY2 * speedMultiplier, canvas.width, canvas.height);
}

// render objects on screen
function render(time) {


    context.clearRect(0, 0, canvas.width, canvas.height);

    if (lastTime !== null) {
        delta = time - lastTime;
    }
    lastTime = time;

    timeSec = Math.round(time / 1000);

    trackScore += 1 / 100;
    currentScoreEl.innerText = Math.round(trackScore);

    if (prevTime !== timeSec) {
        if (timeSec % 5 === 0) {
            // spanwer.createWave(Math.round(canvas.width / 100));
        }
        prevTime = timeSec;
    }





    // render background
    backgroundMovement();

    // render enemies and objects
    handler.render(timeSec);

    // render player
    // player.render(cursor.x, cursor.y);
    player.render(null,  null);

    // render current score
    // renderScore(timeSec);


    if (!gameOver && !pause) {
        animation = requestAnimationFrame(render);
    }


}
