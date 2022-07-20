class HealthBar {
    constructor(context, canvas) {

        this.context = context;
        this.canvas = canvas;

        this.heartImg = new Image();
        this.heartImg.src = require("../Resources/Player/heart.png");
        this.halfHeartImg = new Image();
        this.halfHeartImg.src = require("../Resources/Player/half-heart.png");
        this.deadHeartImg = new Image();
        this.deadHeartImg.src = require("../Resources/Player/dead-heart.png");


        this.damageCount = 0;
        this.currentImg1 = this.heartImg;
        this.currentImg2 = this.heartImg;
        this.currentImg3 = this.heartImg;
        this.currentImg4 = this.heartImg;
        this.currentImg5 = this.heartImg;


    }

    resetHelth() {
        this.currentImg1 = this.heartImg;
        this.currentImg2 = this.heartImg;
        this.currentImg3 = this.heartImg;
        this.currentImg4 = this.heartImg;
        this.currentImg5 = this.heartImg;
        this.damageCount = 0;
    }

    takeDamage() {
        this.damageCount++;
        switch (this.damageCount) {
            case 1:
                this.currentImg1 = this.halfHeartImg;
                break;
            case 2:
                this.currentImg1 = this.deadHeartImg;
                break;
            case 3:
                this.currentImg2 = this.halfHeartImg;
                break;
            case 4:
                this.currentImg2 = this.deadHeartImg;
                break;
            case 5:
                this.currentImg3 = this.halfHeartImg;
                break;
            case 6:
                this.currentImg3 = this.deadHeartImg;
                break;
            case 7:
                this.currentImg4 = this.halfHeartImg;
                break;
            case 8:
                this.currentImg4 = this.deadHeartImg;
                break;
            case 9:
                this.currentImg5 = this.halfHeartImg;
                break;
            case 10:
                this.currentImg5 = this.deadHeartImg;
                break;
        }
    }

    increaseHealth() {
        switch (this.damageCount) {
            case 1:
                this.currentImg1 = this.heartImg;
                break;
            case 2:
                this.currentImg1 = this.halfHeartImg;
                break;
            case 3:
                this.currentImg2 = this.heartImg;
                break;
            case 4:
                this.currentImg2 = this.halfHeartImg;
                break;
            case 5:
                this.currentImg3 = this.heartImg;
                break;
            case 6:
                this.currentImg3 = this.halfHeartImg;
                break;
            case 7:
                this.currentImg4 = this.heartImg;
                break;
            case 8:
                this.currentImg4 = this.halfHeartImg;
                break;
            case 9:
                this.currentImg5 = this.heartImg;
                break;
            case 10:
                this.currentImg5 = this.halfHeartImg;
                break;
        }
        this.damageCount--;
    }






    render() {
        //first heart 1-2
        this.context.drawImage(this.currentImg1, this.canvas.width - 30, 10, 25, 27)
        //second heart 3-4
        this.context.drawImage(this.currentImg2, this.canvas.width - 30 * 2, 10, 25, 27)
        //third heart 5-6
        this.context.drawImage(this.currentImg3, this.canvas.width - 30 * 3, 10, 25, 27)
        //fourth heart 7-8
        this.context.drawImage(this.currentImg4, this.canvas.width - 30 * 4, 10, 25, 27)
        //fifth heart 9-10
        this.context.drawImage(this.currentImg5, this.canvas.width - 30 * 5, 10, 25, 27)

    }
}

export default HealthBar;