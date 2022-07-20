class Cat {

    constructor(context, canvas, posX, posY, width, height,
        canvasPosX, handler) {

        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.canvasPosX = canvasPosX;
        this.context = context;
        this.handler = handler;

        this.catImg = new Image();
        this.catImg.src = require("../Resources/Player/CAT.png");
      


    }



    setVelX(velX) {
        this.velX = velX;
    }

    setVelY(velY) {
        this.velY = velY;
    }


    setPosX(posX) {
        this.posX = posX - this.width / 2;
    }

    setPosY(posY) {
        this.posY = posY - this.height / 2;
    
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    render() {

        
        this.context.drawImage(this.catImg, this.posX, this.posY, this.width, this.height);

  

    }

    renderDisplay() {
        this.context.drawImage(this.catImg, this.posX, this.posY, this.width, this.height);

    }


    intersect(x, y, width, height) {

        if (((this.posX >= x && this.posX <= x + width) || (this.posX + this.playerWidth <= x + width && this.posX + this.playerWidth >= x)) &&
            ((this.posY >= y && this.posY <= y + height) || (this.posY + this.playerHeight <= y + height && this.posY + this.playerHeight >= y))) {
            return true;
        }

        return false;
    }


}

export default Cat;