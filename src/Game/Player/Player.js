import HealthBar from "./HealthBar";

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
        this.handler = handler;
        this.health = health;

        this.playerImg = new Image();
        this.playerImg.src = require("../Resources/Player/player.png");
        this.playerHit1 = new Image();
        this.playerHit1.src = require("../Resources/Player/player-hit-1.png");
        this.playerHit2 = new Image();
        this.playerHit2.src = require("../Resources/Player/player-hit-2.png");

        this.currentImg = this.playerImg;

        this.healthBar = new HealthBar(context, canvas);



        this.theta = Math.PI * 3 / 2;
        this.lastPosX = 0;
        this.rotation = 0;

        this.intersecting = false;
        this.lastPosX = 0;
        this.lastPosY = 0;

        this.velX = 0;
        this.velY = 1;

        this.hit = false;
        this.hitTime = 0;
        this.alpha = 1;

        this.lastTime = 0;

        this.gotPotion = false;

        this.deathPosX = 0;
        this.deathPosY = 0;


    }

    setHealth(health) {

        this.health = health;

        this.healthBar.resetHelth();
        this.hit = false;

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

    getDeathX() {
        return this.deathPosX;
    }
    
    getDeathY() {
        return this.deathPosY;
    }

    render(time) {

        // this.posY += this.velY;
        // this.posX += this.velX;

        // check collision
        this.handler.getEnemies().forEach(enemy => {
            if (this.intersect(enemy.posX, enemy.posY, enemy.zombieWidth, enemy.zombieHeight)) {
                // this.game.die();
                if (!this.hit) {
                    this.healthBar.takeDamage();
                    this.health -= 2;
                    this.hit = true;
                    this.hitTime = time;
                    this.lastTime = time;
                }
            }
        });

        this.handler.getObjects().forEach(object => {

            if (object.type === "vehicle") {
                if (this.intersect(object.posX, object.posY, object.width, object.height)) {

                    // this.game.die();
                    if (!this.hit) {
                        this.healthBar.takeDamage();
                        this.health -= 2;
                        this.hit = true;
                        this.hitTime = time;
                        this.lastTime = time;
                    }
                }
            } else if (object.type === "potion") {
                if (object.intersect(this.posX + 6, this.posY + 6, this.playerWidth - 12, this.playerHeight - 12)) {
                    // console.log(object.posX, object.posY, object.width, object.height)
                    if (!this.gotPotion && this.health < 20) {
                        this.health += 2;
                        // console.log("here")
                        this.healthBar.increaseHealth();
                        this.gotPotion = true;
                            this.handler.removeObject(object.id);
                    }
                } else {
                    this.gotPotion = false;
                }
            }

        });

        if (this.health <= 0) {
            this.game.die();
            this.deathPosX = this.posX;
            this.deathPosY = this.posY;
        }

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
        // console.log(this.hit)
        if (this.hit) {
            // console.log(time, this.hitTime)
            if (Math.round(time - this.hitTime) > 1500) {
                this.hit = false;
                this.alpha = 1;
                this.currentImg = this.playerImg;
            } else {
                // console.log(time, this.lastTime, Math.round(time - this.lastTime))
                if (Math.round(time - this.lastTime) > 175) {
                    this.alpha = this.alpha < 1 ? 1 : 0.7;
                    this.lastTime = time;
                    this.currentImg = this.currentImg === this.playerHit1 ? this.playerHit2 : this.playerHit1;
                    // console.log(this.alpha)
                }
            }
        }        // console.log(this.alpha)
        this.context.globalAlpha = this.alpha;
        this.context.drawImage(this.currentImg, this.posX, this.posY, this.playerWidth, this.playerHeight);
        this.healthBar.render();

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
        this.healthBar.render();

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
            if (x >= this.posX + this.playerWidth && y < this.posY + this.playerHeight || y + height < this.posY) {
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