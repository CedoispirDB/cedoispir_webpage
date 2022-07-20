import BasicZombie from "../Enemies/BasicZombie.js";
import HealthPotion from "../Items/HealthPotion.js";
import Car from "../Scenario/Car.js";

class Spanwer {
    constructor(game, handler, canvas, canvasPosX, context) {
        this.game = game;
        this.handler = handler;
        this.canvas = canvas;
        this.canvasPosX = canvasPosX;
        this.context = context;
        this.objectId = 0;
        this.enemyId = 0;
        this.carPositions = []

        this.prevTime = 0;

        this.waitVehicle = false;

        this.vehicleOptions = [require("../Resources/Vehicles/black-yellow-car.png"), require("../Resources/Vehicles/black-blue-car.png"), require("../Resources/Vehicles/black-red-car.png")]
        this.zombieImgPath = require("../Resources/Enemies/basic-zombie-sprite.png");;
    }

    createWave(time) {
        if (this.prevTime !== time) {
            if (time % 6 === 0) {
                if (this.waitVehicle) {
                    this.waitVehicle = false;
                    this.createRandomEnemies(4);
                } else if (!this.waitVehicle) {
                    this.createObjects(4);
                    this.creatEnemies(4);
                    this.waitVehicle = true;

                }
            } else if (time % 3 === 0) {
                this.createRandomEnemies(4);

            } else if (time % 10 === 0) {
                console.log("r")
                this.createPotions(1);
            }
            this.prevTime = time;
        }

    }

    createPotions(amount) {
        for (var i = 0; i < amount; i++) 
        {
            this.handler.addObject(new HealthPotion(this.context, (Math.random() * (this.canvas.width - 10)) + 5, -19, 14, 19, "potion", this.objectId));
            this.objectId++;
        }

    }

    createRandomEnemies(amount) {

        for (var i = 0; i < amount; i++) {

            this.handler.addEnemy(new BasicZombie(this.game, this.context, this.canvas, this.handler, 40, 42, (Math.random() * (this.canvas.width - 40 - 10) + 10), -42, (Math.random() * 2) + 3, (Math.random() * 2) + 2, this.enemyId, Math.round((Math.random() * 2)) + 2, this.zombieImgPath));
            this.enemyId++;
        }

    }

    creatEnemies(amount) {
        let enemySize = 40;

        let k = 0;
        let max, min;
        let oldMax, oldMin;
        for (var i = 0; i < amount; i++) {
            // this.handler.addEnemy(new BasicZombie(this, this.canvas.width / 2, 0, 40, 42, 0, 3,this.canvas, this.canvasPosX, this.context, "../Resources/zombie.png", this.handler, this.enemyId, 0));
            if (k >= this.carPositions.length) {
                if (this.canvas.width - (max + 52) > enemySize) {
                    max = this.canvas.width
                } else {
                    max = oldMax;
                }
            } else {
                max = this.carPositions[k][0];
            }
            if (k - 1 < this.carPositions.length) {
                if (k === 0) {
                    min = 0;
                } else {
                    min = this.carPositions[k - 1][1];
                }
            }
            // console.log("max: " + max, "min: " + min);
            k++;

            if (max - min < enemySize) {
                max = oldMax;
                min = oldMin;
            }


            let x = (Math.random() * (max - enemySize - min)) + min;

            // let x = (Math.random() * (this.canvas.width - enemySize - (this.carPositions[1][0] + enemySize))) + this.carPositions[1][0] + enemySize;

            // console.log(x);

            this.handler.addEnemy(new BasicZombie(this.game, this.context, this.canvas, this.handler, 40, 42, x, -42, (Math.random() * 2) + 3, (Math.random() * 2) + 2, this.enemyId, Math.round((Math.random() * 2)) + 2, this.zombieImgPath));
            this.enemyId++;

            oldMax = max;
            oldMin = min;

        }

        this.carPositions = [];
    }

    createObjects(amount) {
        let carWidth = 52;
        let xi = (Math.random() * this.canvas.width / 4)
        let xf = (Math.random() * (this.canvas.width - this.canvas.width / 2)) + this.canvas.width / 2;
        // console.log(amount)

        for (var j = 0; j < amount / 2; j++) {
            let dx = xf - xi;
            let middle = xi + dx / 2;

            let x = (Math.random() * (middle - carWidth - xi)) + xi;

            this.carPositions.push([x, x + carWidth])

            // require(this.vehicleOptions[Math.floor(Math.random() * this.vehicleOptions.length)])
            this.handler.addObject(new Car(this.context, this.canvas, this.handler, carWidth, 124, x, -124 * 2, (Math.random() * 2) + 4, this.vehicleOptions[Math.floor(Math.random() * this.vehicleOptions.length)], this.objectId, "vehicle"));
            this.objectId++;



            xi = x + carWidth * 3;
            xf = x + carWidth * 4;


            if (xf >= this.canvas.width) {
                // console.log("leaving")
                break;
            }
        }
        // console.log(this.carPositions);
    }
}

export default Spanwer;