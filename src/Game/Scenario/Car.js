class Car {
    constructor(context, canvas, handler, width, height, posX, posY, vel, imgPath, id, type) {
        this.context = context;
        this.canvas = canvas;
        this.handler = handler;
        this.width = width;
        this.height = height
        this.posX = posX;
        this.posY = posY;
        this.id = id;
        this.type = type;

        this.carImg = new Image();
        this.carImg.src = imgPath;

        this.vel = vel;

    }

    render() {
        this.posY += this.vel;

        if (this.posY > this.canvas.height) {
            this.handler.removeObject(this.id);
        }

        this.context.drawImage(this.carImg, this.posX, this.posY, this.width, this.height);
    }

    renderDisplay() {
        this.context.drawImage(this.carImg, this.posX, this.posY, this.width, this.height);
    }
}

export default Car;