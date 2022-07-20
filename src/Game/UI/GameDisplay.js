import { savePlayerData } from "../../ApiHandler";

class GameDisplay {

    static isfullScreen;
    static fullScreen;

    constructor(game, player, os, canvas, context, canvasPosX) {
        this.game = game;
        this.player = player;
        this.os = os;
        this.canvas = canvas;
        this.context = context;
        this.canvasPosX = canvasPosX;

        this.savedData = false;

        document.getElementsByClassName("save_score_button")[0].addEventListener("click", () => {
            // console.log(document.getElementsByClassName("save_username_input")[0].value);
            if (!this.savedData) {
                this.callApi();
            }
        });

        this.saveScoreContainer = document.getElementsByClassName("save_score_container")[0];

        this.currentScore = document.getElementsByClassName("current_score")[0];

        this.totalScoreWrapper = document.getElementsByClassName("total_score_wrapper")[0];
        this.totalScoreText = document.getElementsByClassName("total_score")[0];

        this.startContainer = document.getElementsByClassName("start_container")[0];
        this.startGameButton = document.getElementsByClassName("start_button")[0];

        this.wrapper = document.getElementsByClassName("wrapper")[0];

        this.pauseButton = document.getElementsByClassName("pause_button")[0];
        this.pauseMenu = document.getElementsByClassName("pause_menu")[0];
        this.icon = document.getElementsByClassName("icon")[0];
        this.continueMessage = document.getElementsByClassName("pause_continue_msg")[0];

        this.startGameButton.addEventListener("click", () => this.start());
        this.pauseButton.addEventListener("click", () => this.pause());



        this.pauseContainer = document.getElementsByClassName("pause_options_container")[0];


        this.fullScreen = false;
        this.oldHeight = 0;

        if (this.os !== "unknown") {
            window.addEventListener("fullscreenchange", () => this.handleFullScreen());
        } else if (this.os === "unknown") {
            window.addEventListener("resize", () => this.handleResize());
        }
        window.addEventListener("keypress", (e) => this.handleKeyPressed(e));
        window.addEventListener('scroll', () => this.handleScroll());
    }

    async callApi() {
        let score = this.totalScoreText.innerText;

        savePlayerData(document.getElementsByClassName("save_username_input")[0].value, score.substring(score.indexOf(":") + 2))
            .then((res) => {
                this.saveScoreContainer.children[2].classList.remove("hide")
                if (res.data.response === "Error") {
                    console.log(this.saveScoreContainer.children[0]);
                    this.saveScoreContainer.children[2].innerText = "Name already in use"
                } else {
                    this.saveScoreContainer.children[2].innerText = "Score saved"
                    this.savedData = true;
                }
            });

    }

    handleKeyPressed(e) {
        let key = e.key.toLowerCase();
        if (this.game.running && !this.game.dead) {
            if (key === "p") {
                this.pause();

            }
        }
        // if (key === "f") {
        //     // if (!this.game.running) {
        //     this.toggleFullScreen();
        //     // }

        // }
    }

    handleResize() {
        if (!this.fullScreen) {
            if (!this.game.started) {
                this.loadDisplayImage()
            }
            this.canvas.width = window.innerWidth / 2
            this.canvas.height = window.innerHeight;
            this.canvasPosX = window.innerWidth * 0.25;
            this.wrapper.style.width = this.canvas.width + "px";
            this.wrapper.style.height = this.canvas.height + "px";
        }
    }

    handleFullScreen() {


        if (this.os === "unknown") {

            if (!this.fullScreen) {
                this.oldHeight = this.canvas.height;
            }
            this.canvas.width = window.screen.width;
            this.canvas.height = this.game.maxWidth;
            this.wrapper.style.height = this.canvas.height + "px"



            this.fullScreen = !this.fullScreen;

            if (this.fullScreen !== this.isfullScreen) {
                // used esc to leave
                this.isfullScreen = this.fullScreen
            }

            if (!this.fullScreen) {
                if (window.innerWidth > 813) {
                    this.canvas.width = window.innerWidth / 2;
                } else {
                    this.canvas.width = window.innerWidth;
                }

                this.canvas.height = this.oldHeight;
                this.wrapper.style.width = this.canvas.width + "px";
                this.wrapper.style.height = this.canvas.height + "px";
            }

            this.player.setPosX(this.canvas.width / 2);
            this.player.setPosY(this.canvas.height - this.player.getHeight() - 10);
        } else {
            this.oldHeight = this.canvas.height;
            this.canvas.height = this.game.maxWidth;



            if (this.fullScreen) {
                this.canvas.height = this.oldHeight;
            }



            this.canvas.width = window.screen.width;
            this.wrapper.style.height = this.canvas.height + "px";

        }

    }


    handleScroll() {
        if (window.scrollY !== 0) {
            this.startContainer.classList.add("hide");
        } else {
            this.startContainer.classList.remove("hide");
        }
    }

    loadDisplayImage() {
        this.displayImg = new Image();
        this.displayImg.src = require("../Resources/zombie_game_display.png");
        this.displayImg.onload = () => {
            this.context.drawImage(this.displayImg, 0, 0, this.canvas.width, this.canvas.height)
        }

    }


    setupMainPage() {

        if (this.game.started) {

            this.game.reset();

            this.currentScore.classList.add("hide");
            this.pauseButton.classList.add("hide");
            this.pauseButton.classList.toggle("paused")
            this.pauseMenu.classList.toggle("hide");
            this.game.pause = false;
            document.body.style.overflow = "auto"



        }


        if (this.isfullScreen) {
            this.toggleFullScreen();
        }

        this.loadDisplayImage();
        this.startContainer.classList.remove("hide");




    }


    setScore(score) {
        this.currentScore.innerText = score;


    }


    start() {


        // TODO: handle what to do
        this.currentScore.classList.remove("hide");
        this.pauseButton.classList.remove("hide");
        this.startContainer.classList.add("hide");
        // canvas.style.cursor = "none"
        this.game.running = true;
        this.game.started = true;
        document.body.style.overflow = "hidden"



    }



    hoverOver() {
        this.currentScore.classList.remove("hide");
        this.totalScoreWrapper.classList.add("hide");
        this.saveScoreContainer.children[2].classList.add("hide")
        this.saveScoreContainer.children[1].value = "";
        this.pauseButton.classList.remove("hide");
        this.savedData = false;
        this.player.setHealth(20);

        // canvas.style.cursor = "none"
    }

    handleContinue() {
        this.continueMessage.classList.toggle("hide");
    }


    loadDeathScreen() {
        this.totalScoreText.innerText = "Total score: " + this.currentScore.innerText;
        this.totalScoreWrapper.classList.remove("hide");
        this.currentScore.classList.add("hide");
        // this.pauseButton.classList.add("hide");
        this.game.waiting = true;

    }

    pause() {
        this.pauseButton.classList.toggle("paused")
        this.pauseMenu.classList.toggle("hide");
        if (!this.game.pause) {
            this.game.pause = !this.game.pause;
        } else {
            this.game.waiting = true;
            this.handleContinue();
        }
    }


    createPauseMenu() {
        let li = document.createElement("li");
        li.classList.add("pause_option");
        let p = document.createElement("p");
        p.innerHTML = "Resume";
        li.appendChild(p)
        this.pauseContainer.appendChild(li);
        li.addEventListener("click", () => this.pause());

        if (this.os === "Android" || this.os === "unknown") {
            li = document.createElement("li");
            li.classList.add("pause_option");
            p = document.createElement("p");
            p.innerHTML = "Full Screen";
            li.appendChild(p)
            this.pauseContainer.appendChild(li);
            li.addEventListener("click", () => this.toggleFullScreen());

        }

        li = document.createElement("li");
        li.classList.add("pause_option");
        p = document.createElement("p");
        p.innerHTML = "Exit";
        li.appendChild(p)
        this.pauseContainer.appendChild(li);
        li.addEventListener("click", () => this.setupMainPage());


    }

    toggleFullScreen() {

        if (this.isfullScreen) {
            document.exitFullscreen();
            this.isfullScreen = false;
        } else {
            if (this.openFullscreen()) {
                this.isfullScreen = true;
            }
        }

    }


    openFullscreen() {
        if (this.os !== "Android" && this.os != "unknown") {
            return false;
        }


        if (this.wrapper.requestFullscreen) {
            this.wrapper.requestFullscreen();
        } else if (this.wrapper.webkitRequestFullscreen) { /* Safari */
            this.wrapper.webkitRequestFullscreen();
        } else if (this.wrapper.msRequestFullscreen) { /* IE11 */
            this.wrapper.msRequestFullscreen();
        }
        return true;
    }


}

export default GameDisplay;