class BasicZombie {

    constructor(game, context, canvas, handler, width, height, posX, posY, velX, velY, id, changeTime, imgPath) {
        this.game = game;
        this.posX = posX;
        this.posY = posY;
        this.zombieWidth = width;
        this.zombieHeight = height;
        this.canvas = canvas
        this.context = context;
        this.zombieImg = new Image();
        this.zombieImg.src = imgPath;
        this.handler = handler;
        this.id = id;
        this.changeTime = changeTime;

        this.velX = velX;
        this.velY = velY;
        this.count = 0;
        this.turn = true;

        // console.log(id)
        this.temp = this.posY;

        this.sprite = new Image();
        this.sprite.src = require("../Resources/basic-zombie-sprite.png");

        this.frame = 1;

        this.lastTime = 0;
        this.can = true;

        this.x = 0;
        this.y = 0;

    }


    getVelY() {
        return this.velY;
    }

    render(time, timeMs) {
        if (!this.game.pause) {
            this.posY += this.velY;
            this.posX += this.velX;

            // check collision
            this.handler.getObjects().forEach(object => {
                this.collide(object.posX, object.posY, object.width, object.height, object.vel);
            });


            if (this.posX + 40 > this.canvas.width) {
                this.velX *= - 1;
                this.turn = false;
            }

            if (this.posX <= 0) {
                this.velX *= - 1;
                this.turn = false;
            }

            if (this.posY > this.canvas.height || this.posY < - this.zombieHeight) {
                this.handler.removeEnemy(this.id);
            }


            // // console.log(this.changeTime)
            if (time % this.changeTime === 0) {
                if (this.turn) {
                    this.velX *= - 1;
                }
                this.turn = false;
            } else {

                this.turn = true;
            }

        }

        if (Math.round(timeMs - this.lastTime) > 200) {
            if (this.velX > 0) {
                switch (this.frame) {
                    case 1:
                        this.x = 0;
                        this.y = 0;
                        break;
                    case 2:
                        this.x = 33;
                        this.y = 0;
                        break;
                    case 3:
                        this.x = 66;
                        this.y = 0;
                        break;
                }
            } else if (this.velX < 0) {
                switch (this.frame) {
                    case 1:
                        this.x = 0;
                        this.y = 32;
                        break;
                    case 2:
                        this.x = 33;
                        this.y = 32;
                        break;
                    case 3:
                        this.x = 65;
                        this.y = 32;
                        break;
                }
            }

            this.frame++;
            if (this.frame > 3) {
                this.frame = 1;
            }
            this.lastTime = timeMs;

        }

        if (this.can) {
            if (!isNaN(time)) {
                this.lastTime = timeMs;
                this.can = false;
            }
        }

        this.context.drawImage(this.sprite, this.x, this.y, 30, 31, this.posX, this.posY, this.zombieWidth, this.zombieHeight);



        // } else {

        //     this.context.drawImage(this.zombieImg, this.posX, this.posY, this.zombieWidth, this.zombieHeight);
        // }

        // this.context.font = '50px serif';
        // this.context.fillText(this.id, this.posX, this.posY);
    }

    intersect(x, y, width, height) {

        if (((this.posX >= x && this.posX <= x + width) || (this.posX + this.zombieWidth <= x + width && this.posX + this.zombieWidth >= x)) &&
            ((this.posY >= y && this.posY <= y + height) || (this.posY + this.zombieHeight <= y + height && this.posY + this.zombieHeight >= y))) {
            // console.log("intersecting at " + this.posX)
            return true;
        }

        return false;
    }


    collide(x, y, width, height, vel) {
        // console.log( vel);
        if (this.intersect(x - 5, y - 5, width + 10, height + 10)) {
            // console.log(this.posX >= x);
            // if (x > this.posX && (y < this.posY  || y + height < this.posY)) {
            //     console.log("from the right");
            //     this.velX *= -1;
            // } else if (x + width <= this.posX) {
            //     console.log("from the left");
            //     this.velX *= -1;
            // } else if (y >= this.posY && (this.posX >= x || this.posX + this.zombieWidth < x)) {
            //     console.log("from the top");
            //     this.velY *= -1;
            // } else  if (y + height <= this.posY) {
            //     console.log("from the bottom");
            //     if(this.velY < 0) {
            //         this.velY *= -1;
            //     }
            // }

            if (this.posY < y && this.posX + this.zombieWidth > x && this.posX < x + width) {
                // console.log("Top");
                this.posY -= vel + 2;
                this.velY = this.velY < 0 ? this.velY - 1 : this.velY + 1;
                this.velY *= -1;
            } else if (this.posX < x && this.posY + this.zombieHeight > y && this.posY < y + height) {
                // console.log("Right");
                this.posX -= 1;
                this.velX *= -1;
            } else if (this.posY + this.zombieHeight > y + height && this.posX + width > x && this.posX < x + width) {
                // console.log("Bottom");
                this.posY += vel + 2;
                this.velY = this.velY < 0 ? this.velY - 1 : this.velY + 1;
                this.velY *= -1;
            } else if (this.posX + this.zombieWidth > x + width && this.posY + this.zombieHeight > y && this.posY < y + height) {
                // console.log("Left")
                this.posX += 1;
                this.velX *= -1;
            }
        }
    }

    renderDisplay() {
        this.context.drawImage(this.zombieImg, this.posX, this.posY, this.zombieWidth, this.zombieHeight);
    }

}

export default BasicZombie;