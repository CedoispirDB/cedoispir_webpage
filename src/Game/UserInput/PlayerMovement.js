class PlayerMovement {
    constructor(game, player, canvas, canvasPosX, gameDisplay) {
        this.game = game;
        this.player = player;
        this.canvas = canvas;
        this.canvasPosX = canvasPosX;
        this.gameDisplay = gameDisplay;
    }

    handleTouchMovement(e) {
        if (e.touches) {
            if (this.game.running && !this.game.dead && !this.game.pause) {
                this.player.setPosX(e.touches[0].clientX);
                this.player.setPosY(e.touches[0].clientY);
            } else if (this.game.waiting && this.game.dead) {
                if (e.touches[0].clientY >= this.canvas.height - this.player.getHeight() - 10) {
                    this.game.dead = false;
                    this.game.running = true;
                    this.game.waiting = false;
                    this.gameDisplay.hoverOver();
                }
            } else if (this.game.waiting && this.game.pause) {
                let x = e.touches[0].clientX;
                let y = e.touches[0].clientY;
                // console.log(x - this.canvasPosX, this.player.getPosX() )                    console.log("here 1");

                // console.log("here 0");

                if (x > this.player.getPosX() && x < this.player.getPosX() + this.player.getWidth() &&
                    y > this.player.getPosY() && y < this.player.getPosY() + this.player.getHeight()) {
                    this.game.waiting = false;
                    this.game.pause = false;
                    this.gameDisplay.handleContinue();

                }
            }

            e.preventDefault();
        }



    }

    handleMouseMovement(e) {
        if (this.game.running && !this.game.dead && !this.game.pause) {
            let offSet = this.canvasPosX;
            if (this.gameDisplay.fullScreen) {
                offSet = 0;
            }

           
           
            this.player.setPosX(e.clientX - offSet)
            this.player.setPosY(e.clientY)








        } else if (this.game.waiting && this.game.dead) {
            if (e.clientY >= this.canvas.height - this.player.getHeight() - 10) {
                this.game.dead = false;
                this.game.running = true;
                this.game.waiting = false;
                this.gameDisplay.hoverOver();

            }

        } else if (this.game.waiting && this.game.pause) {
            let x = e.clientX - this.canvasPosX;
            let y = e.clientY;
            // console.log(x - this.canvasPosX, this.player.getPosX() )                    console.log("here 1");

            // console.log("here 0");

            if (x > this.player.getPosX() && x < this.player.getPosX() + this.player.getWidth() &&
                y > this.player.getPosY() && y < this.player.getPosY() + this.player.getHeight()) {
                this.game.waiting = false;
                this.game.pause = false;
                this.gameDisplay.handleContinue();

            }
        }
        // if (cursor.x - 20 < canvasPosX || cursor.x + 20 > canvasPosX + canvas.width ||
        //     cursor.y - 20 <= 0 || cursor.y + 20 > canvas.height) {
        //      if (gameStarted) {
        //           pause = true;
        //       } 
        // }
        // }
    }

    setEvents() {
        window.addEventListener("touchmove", (e) => this.handleTouchMovement(e), { passive: false });
        window.addEventListener("mousemove", (e) => this.handleMouseMovement(e));
        // addEventListener("keydown", (e) => {
        //     console.log(e.key)
        //     if(e.key + "" === "ArrowUp") {
        //         console.log("here")
        //         this.player.setVelY(-5);
        //     }
        // })
    }
}

export default PlayerMovement;