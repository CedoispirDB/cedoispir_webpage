class HealthPotion {
    constructor(context, posX, posY, width, height, type, id) {
        this.context = context;

        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height
        this.type = type;
        this.id = id;

        this.vel = 3;

        this.image = new Image();
        this.image.src = require("../Resources/Items/health_potion.png")
    }

    render() {

        this.posY += this.vel;

        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);

    }

    renderDisplay() {
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }

    intersect(x, y, width, height) {
        if (((this.posX >= x && this.posX <= x + width) || (this.posX + this.width <= x + width && this.posX + this.width >= x)) &&
        ((this.posY >= y && this.posY <= y + height) || (this.posY + this.height <= y + height && this.posY + this.height >= y))) {
        return true;
    }

    return false;
    }
}

export default HealthPotion;