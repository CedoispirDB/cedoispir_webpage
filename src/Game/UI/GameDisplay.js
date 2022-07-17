class GameDisplay {

    static isfullScreen;
    static fullScreen;

    constructor(game, player, os, canvas) {
        this.game = game;
        this.player = player;
        this.os = os;
        this.canvas = canvas;



        this.currentScore = document.getElementsByClassName("current_score")[0];

        this.totalScoreWrapper = document.getElementsByClassName("total_score_wrapper")[0];
        this.totalScoreText = document.getElementsByClassName("total_score")[0];
        this.playAgainButton = document.getElementsByClassName("play_again_button")[0];
        this.playAgainMessage = document.getElementsByClassName("play_again_message")[0];

        this.startContainer = document.getElementsByClassName("start_container")[0];
        this.startGameButton = document.getElementsByClassName("start_button")[0];

        this.wrapper = document.getElementsByClassName("wrapper")[0];

        this.pauseButton = document.getElementsByClassName("pause_button")[0];
        this.pauseMenu = document.getElementsByClassName("pause_menu")[0];
        this.icon = document.getElementsByClassName("icon")[0];
        this.continueMessage = document.getElementsByClassName("pause_continue_msg")[0];

        this.startGameButton.addEventListener("click", () => this.start());
        this.playAgainButton.addEventListener("click", () => this.playAgain());
        this.pauseButton.addEventListener("click", () => this.pause());



        this.pauseContainer = document.getElementsByClassName("pause_options_container")[0];


        this.fullScreen = false;

        let oldHeight;

        window.addEventListener("fullscreenchange", () => {

            if (this.os === "unknown") {

                if (!this.fullScreen) {
                    oldHeight = this.canvas.height;
                }
                console.log(oldHeight)
                this.canvas.width = window.screen.width;
                this.canvas.height = this.game.maxWidth;
                this.wrapper.style.height = this.canvas.height + "px"

                console.log(this.game.maxWidth)


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

                    this.canvas.height = oldHeight;
                    this.wrapper.style.width = this.canvas.width + "px";
                    this.wrapper.style.height = this.canvas.height + "px";
                }

                this.player.setPosX(this.canvas.width / 2);
                this.player.setPosY(this.canvas.height - this.player.getHeight() - 10);
            } else {
                oldHeight = this.canvas.height;
                this.canvas.height = this.game.maxWidth;
                this.currentScore.innerText = this.canvas.height;



                if (this.fullScreen) {
                    this.canvas.height = this.oldHeight;
                }



                this.canvas.width = window.screen.width;
                this.wrapper.style.height = this.canvas.height + "px";

            }

        });


        window.addEventListener("keypress", (e) => {
            let key = e.key.toLowerCase();
            if (this.game.running && !this.game.dead) {
                if (key === "p") {
                    this.pause();

                }
            }
            if (key === "f") {
                if (!this.game.running) {
                    this.toggleFullScreen();
                }

            }
        });
    }


    setScore(score) {
        this.currentScore.innerText = score;


    }


    start() {



        // TODO: handle what to do
        this.currentScore.classList.remove("hide");
        this.startContainer.classList.add("hide");
        this.pauseButton.classList.remove("hide");
        // canvas.style.cursor = "none"
        this.game.running = true;
        this.game.started = true;


    }

    playAgain() {


        this.playAgainButton.classList.toggle("hide");
        this.playAgainMessage.classList.toggle("hide");
        this.game.waiting = true;


    }

    hoverOver() {
        this.currentScore.classList.remove("hide");
        this.totalScoreWrapper.classList.add("hide");
        this.pauseButton.classList.remove("hide");
        this.playAgainButton.classList.toggle("hide");
        this.playAgainMessage.classList.toggle("hide");
        // canvas.style.cursor = "none"
    }

    handleContinue() {
        this.continueMessage.classList.toggle("hide");
    }


    loadDeathScreen() {
        this.totalScoreText.innerText = "Total score: " + this.currentScore.innerText;
        this.totalScoreWrapper.classList.remove("hide");
        this.currentScore.classList.add("hide");
        this.pauseButton.classList.add("hide");

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
        // li.addEventListener("click", () => this.pause());


    }

    toggleFullScreen() {
        if (!this.game.running) {

            if (this.isfullScreen) {
                document.exitFullscreen();
                this.isfullScreen = false;
            } else {
                if (this.openFullscreen()) {
                    this.isfullScreen = true;
                }
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