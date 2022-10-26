import GameDisplay from "../UI/GameDisplay.js"
import CanvasHandler from "../UI/CanvasHandler.js"
import Background from "../Scenario/Background.js";
import PlayerMovement from "../UserInput/PlayerMovement.js";
import Player from "../Player/Player.js";
import Handler from "../Manager/Handler.js";
import Spanwer from "../Manager/Spawner.js";

import Car from "../Scenario/Car.js";
import BasicZombie from "../Enemies/BasicZombie.js";
import CreateFrames from "../Render/CreateFrames.js";
import HealthPotion from "../Items/HealthPotion.js";
import Coin from "../Items/Coin.js";
import Cat from "../Pet/Cat.js";

class Game {

    static pause;
    static running;
    static dead;
    static maxheight;
    static waiting;
    static started;

    constructor() {
        this.os = this.getMobileOperatingSystem();

        this.maxheight = window.screen.height;

        this.canvasHandler = new CanvasHandler();
        this.canvas = this.canvasHandler.getCanvas();
        this.context = this.canvasHandler.getContext();
        this.canvasPosX = this.canvasHandler.getCanvasPosX();

        this.handler = new Handler();
        this.spawner = new Spanwer(this, this.handler, this.canvas, this.canvasPosX, this.context);

        this.player = new Player(this, this.canvas.width / 2, this.canvas.height - 42, 40, 42, this.canvas, this.canvasPosX, this.context, this.handler, 20);


        this.gameDisplay = new GameDisplay(this, this.player, this.os, this.canvas, this.context, this.canvasPosX);
        this.background = new Background(this, this.canvas, this.context);
        this.playerMovement = new PlayerMovement(this, this.player, this.canvas, this.canvasPosX, this.gameDisplay);

        this.prevTime = 0;
        this.trackScore = 1;
        this.timeSec = 0;





        this.init();
        // this.test();
    }

    test() {
        // this.handler.addObject(new Car(this.context, this.canvas, this.handler, 60, 124, this.canvas.width / 2, 124 * 4, "../Resources/car.png", 0))
        // this.handler.addObject(new Car(this.context, this.canvas, this.handler, 60, 124, this.canvas.width / 2, 124 * 2, "../Resources/car.png", 1))
        // this.handler.addObject(new Car(this.context, this.canvas, this.handler, 60, 124, this.canvas.width / 2, 0, "../Resources/car.png", 2))

        // working 

        // range: 0 to canvas.width - car.width
        // steps of car.width

        // let carWidth = 52;
        // let car1 = 0;
        // let car2 = this.canvas.width / 2 - carWidth / 2;
        // let car3 = this.canvas.width - carWidth

        // let xf = this.canvas.width / 2;
        // let xi = 0


        // for (var i = 0; i < 4; i++) {

        //     let dx = xf - xi;
        //     let middle = xi + dx / 2;

        //     console.log(middle, xi)
        //     let x = (Math.random() * (middle - xi)) + xi;

        //     console.log(x)

        //     this.handler.addObject(new Car(this.context, this.canvas, this.handler, 52, 124, x, 124 * 0, "../Resources/car.png", i))

        //     xi = x + carWidth * 3;
        //     xf = x + carWidth * 5;

        //     if (xf >= this.canvas.width) {
        //         break;
        //     }
        // }

        // this.handler.addObject(new Car(this.context, this.canvas, this.handler, 52, 124, 52 + ((car2 - 52) / 2) - 52 / 2, 124 * 0, "../Resources/car.png", 6))
        // this.handler.addObject(new Car(this.context, this.canvas, this.handler, 52, 124, ((car2 + 52) + (car3 - (car2 + 52)) / 2) - 52 / 2, 124 * 0, "../Resources/car.png", 5))

        // this.handler.addObject(new Car(this.context, this.canvas, this.handler, 52, 124, 0, 124 * 0, 3,"../Resources/car.png", 0))
        // this.handler.addObject(new Car(this.context, this.canvas, this.handler, 52, 124, this.canvas.width / 2,this.canvas.height / 2 - 124, 0,"../Resources/car.png", 1))


        // this.handler.addObject(new Car(this.context, this.canvas, this.handler, 52, 124, this.canvas.width / 2 - 52 * 2, this.canvas.height / 2 - 124, 1, "../Resources/car.png", 2))
        // this.handler.addObject(new Car(this.context, this.canvas, this.handler, 52, 124, this.canvas.width - 124, this.canvas.height / 2 - 124, 1, "../Resources/car.png", 2))
        // this.handler.addObject(new Car(this.context, this.canvas, this.handler, 52, 124, this.canvas.width / 2, this.canvas.height - 124, 0, "../Resources/car.png", 2))
        // this.handler.addObject(new Car(this.context, this.canvas, this.handler, 52, 124, this.canvas.width / 2, 124 * 2, 0, require("../Resources/black-red-car.png"), 2))

        this.handler.addEnemy(new BasicZombie(this, this.context, this.canvas, this.handler, 40, 42, this.canvas.width / 2, 450, 0, 0, this.enemyId, 0, require("../Resources/Enemies/zombie.png")));
        this.handler.addObject(new HealthPotion(this.context, this.canvas.width / 2, this.canvas.height / 2, 14, 19, "potion"))
        this.cat = new Cat(this.context, this.canvas, this.canvas.width / 2, this.canvas.height / 2 - 100, 37, 39, this.canvasPosX, this.handler);
    
        // this.handler.addEnemy(new BasicZombie(this, this.context, this.canvas, this.handler, 40, 42, 40, 169 ,5, 0, this.enemyId, 0, require("../Resources/zombie.png")));
        // this.handler.addEnemy(new BasicZombie(this, this.context, this.canvas, this.handler, 40, 42, this.canvas.width / 2 - 52 /2, this.canvas.height / 2 + 124, 0, -4, this.enemyId, 0, "../Resources/zombie.png"));
        // this.handler.addEnemy(new BasicZombie(this, this.context, this.canvas, this.handler, 40, 42, this.canvas.width / 2, this.canvas.height / 2, 0, 0, this.enemyId, 0, require("../Resources/zombie.png")));


        // this.handler.addObject(new Car(this.context, this.canvas, this.handler, 60, 124, this.canvas.width / 2, -124 * 2, "../Resources/car.png", 3))
        // this.handler.addObject(new Car(this.context, this.canvas, this.handler, 60, 124, this.canvas.width / 2, -124 * 4, "../Resources/car.png", 4))
        // this.handler.addObject(new Car(this.context, this.canvas, this.handler, 60, 124, this.canvas.width / 2, -124 * 6, "../Resources/car.png", 5))



        // addEventListener("click", () => this.handler.removeObject(1));
        // let buttons = document.querySelectorAll("button");
        // buttons[2].addEventListener("click", () => this.handler.removeEnemy(0));
        // buttons[3].addEventListener("click", () => this.handler.removeEnemy(1));
        // buttons[4].addEventListener("click", () => this.handler.removeEnemy(2));
    }

    init() {
        this.running = false;
        this.pause = false;
        this.dead = false;
        this.waiting = false;
        this.started = false;
        this.canvasHandler.showDisplayImage();
        this.gameDisplay.createPauseMenu();
        this.playerMovement.setEvents();
        this.gameDisplay.setupMainPage();


    }

    reset() {
        this.running = false;
        this.pause = false;
        this.dead = false;
        this.waiting = false;
        this.started = false;
        this.player.setPosX(this.canvas.width / 2);
        this.player.setPosY(this.canvas.height - 42);
        this.player.setHealth(20);
        this.handler.clear();
        this.trackScore = 1;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);


    }



    die() {
        this.handler.clear();
        this.gameDisplay.loadDeathScreen();
        this.running = false;
        this.dead = true;
        this.trackScore = 0;
        this.gameDisplay.setScore(0)
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background.render();
        this.player.setPosX(this.canvas.width / 2);
        this.player.setPosY(this.canvas.height - 10);
    }

    render(time) {

        if (this.started) {
            // console.log(this.handler.objects)
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.globalAlpha = 1;


            if (!this.pause && !this.dead) {
                // console.log(time);
                this.timeSec = Math.round(time / 1000);

                this.trackScore += 1 / 25;

                this.spawner.createWave(this.timeSec);

                this.gameDisplay.setScore(Math.floor(this.trackScore));

                this.background.render();

                this.handler.render(this.timeSec, time);


                this.player.render(time);


            } else {
                this.background.renderDisplay();
                this.handler.renderDisplay();
                this.player.renderDisplay()

            }

            // console.log("rendering");


            // }
        }

    }

    run(time) {

        this.render(time)
        requestAnimationFrame((time) => { this.run(time) })
    }

    getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        return "unknown";
    }




}

export default Game;

// window.onload = () => {
//     new Game().run();
// }