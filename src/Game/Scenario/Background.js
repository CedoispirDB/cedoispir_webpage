class Background {
    constructor(game, canvas, context) {
        this.game = game;

        this.canvas = canvas;
        this.context = context;

        this.img = new Image();
        this.img.src = require("../Resources/road.png");

        this.posX = 0;
        this.posY = 0;

        this.vel = 3;
    }

    render() {

        if (!this.game.pause) {
            this.posY += this.vel;

            if (this.posY > this.canvas.height) {
                this.posY = 0;
            }
        }

        this.context.drawImage(this.img, this.posX, this.posY - this.canvas.height, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.img, this.posX, this.posY, this.canvas.width, this.canvas.height);
    }

    renderDisplay() {
        this.context.drawImage(this.img, this.posX, this.posY - this.canvas.height, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.img, this.posX, this.posY, this.canvas.width, this.canvas.height);
    }
}

export default Background;