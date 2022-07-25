class CanvasHandler {
    constructor(gameDisplay) {
        this.gameDisplay = gameDisplay;

        this.wrapper = document.getElementsByClassName("wrapper")[0];


        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.height = window.innerHeight;
        this.canvasPosX = window.innerWidth * 0.25;
        this.canvas.width = window.innerWidth / 2;

        if (window.innerWidth <= 545) {
            this.canvas.width = window.innerWidth;
            this.canvasPosX = 0;
        }

        this.context.imageSmoothingEnabled = false;

        this.wrapper.style.width = this.canvas.width + "px";
        this.wrapper.style.height = this.canvas.height + "px";

        this.catImg = new Image();
        this.catImg.src = "../Resources/cat.jpg"
    }

    showDisplayImage() {

        this.catImg.onload = () => {
            // this.context.drawImage(this.catImg, 0, 0, this.canvas.width, this.canvas.height);
        }
    }


    setEvents() {
    

        // addEventListener("resize", () => this.resize());

     

      
    }

    // resize() {
        
    //     if (this.gameDisplay.isfullScreen) {
    //         this.gameDisplay.isfullScreen = false;
    //         return;
    //     }
    //     if (innerWidth > 813) {
    //         this.canvas.width = innerWidth / 2;
    //     } else {
    //         this.canvas.width = innerWidth;
    //     }
    //     this.wrapper.style.width = this.canvas.width + "px";
    //     this.wrapper.style.height = this.canvas.height + "px";
    //     // this.context.drawImage(this.catImg, 0, 0, this.canvas.width, this.canvas.height);


    // }


    getContext() {
        return this.context;
    }

    getCanvas() {
        return this.canvas;
    }

    getCanvasPosX() {
        return this.canvasPosX;
    }

}

export default CanvasHandler;