class Player {

    constructor(game, posX, posY, playerWidth, playerHeight, canvas,
        canvasPosX, context, handler, health) {

        this.game = game;
        this.posX = posX;
        this.posY = posY;
        this.playerWidth = playerWidth;
        this.playerHeight = playerHeight;
        this.canvas = canvas;
        this.canvasPosX = canvasPosX;
        this.context = context;

        this.playerImg = new Image();
        this.playerImg.src = require("../Resources/player.png");
        this.handler = handler;
        this.health = health;

        console.log(this.playerImg)


        this.theta = Math.PI * 3 / 2;
        this.lastPosX = 0;
        this.rotation = 0;

        this.intersecting = false;
        this.lastPosX = 0;
        this.lastPosY = 0;

        this.velX = 0;
        this.velY = 1;
    }

    setVelX(velX) {
        this.velX = velX;
    }

    setVelY(velY) {
        this.velY = velY;
    }


    setPosX(posX) {
        this.posX = posX - this.playerWidth / 2;
    }

    setPosY(posY) {
        this.posY = posY - this.playerHeight / 2;
        // if (this.os !== "unknown") {
        //     // 125 for no full screen
        //     // 175 full screen
        //     this.t = this.space;


        //     // console.log(this.theta)
        //     this.theta += this.rotation;

        //     // 0 right
        //     // pi / 2 down
        //     // pi * 2 left
        //     // 3pi / 2 up

        //     // if (this.theta >= Math.PI * 2) {
        //     //     this.theta = 0;
        //     // }

        //     // console.log(this.theta)
        //     // this.posX = x + Math.cos(this.theta) * this.t;
        //     this.posY = this.posY + Math.sin(this.theta) * this.t;

        // }
    }

    getWidth() {
        return this.playerWidth;
    }

    getHeight() {
        return this.playerHeight;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    render() {


        // this.posY += this.velY;
        // this.posX += this.velX;

        // check collision
        this.handler.getEnemies().forEach(enemy => {
            if (this.intersect(enemy.posX, enemy.posY, enemy.width, enemy.height)) {
                // this.game.die();
            }
        });

        this.handler.getObjects().forEach(object => {
            // if (this.collide(object.posX, object.posY, object.width, object.height)) {
                // console.log("collide")
            // }
        })

        // player movement


        if (this.posX <= 0) {
            // leave screen left
            this.posX = 0;
        } else if (this.posX + this.playerWidth >= this.canvas.width) {
            // leave screen right
            this.posX = this.canvas.width - this.playerWidth;
        }

        if (this.posY <= 0) {
            this.posY = 0;
        } else if (this.posY + this.playerHeight >= this.canvas.height) {
            this.posY = this.canvas.height - this.playerHeight;
        }


        // console.log(this.posX, this.posY)
        this.context.drawImage(this.playerImg, this.posX, this.posY, this.playerWidth, this.playerHeight);

        // if (!this.intersecting) {
        //     this.context.drawImage(this.playerImg, this.posX, this.posY, this.playerWidth, this.playerHeight);
        //     this.lastPosX = this.posX;
        //     this.lastPosY = this.posY;
        // } else {
        //     this.context.drawImage(this.playerImg, this.lastPosX, this.lastPosY, this.playerWidth, this.playerHeight);
        //     // console.log(this.posX, this.lastPosX)
        //     if (this.posX > this.lastPosX - this.playerWidth / 2 && this.posX < this.lastPosX + this.playerWidth / 2 &&
        //         this.posY > this.lastPosY - this.playerHeight / 2 && this.posY < this.lastPosY + this.playerHeight / 2) {
        //         this.intersecting = false;
        //     }
        // }

    }

    renderDisplay() {
        this.context.drawImage(this.playerImg, this.posX, this.posY, this.playerWidth, this.playerHeight);
    }


    intersect(x, y, width, height) {

        if (((this.posX >= x && this.posX <= x + width) || (this.posX + this.playerWidth <= x + width && this.posX + this.playerWidth >= x)) &&
            ((this.posY >= y && this.posY <= y + height) || (this.posY + this.playerHeight <= y + height && this.posY + this.playerHeight >= y))) {
            return true;
        }

        return false;
    }

    collide(x, y, width, height) {
        if (this.intersect(x, y, width, height)) {
        
            console.log(y + height, this.posY)
            if (x >= this.posX + this.playerWidth&& y < this.posY + this.playerHeight || y + height < this.posY) {
                console.log("from the right");
            } else if (x + width <= this.posX) {
                console.log("from the left");
            } else if (y >= this.posY + this.playerHeight) {
                console.log("from the top");
            } else if (y + height <= this.posY) {
                console.log("from the bottom");
            }
        }
    }

}

export default Player;