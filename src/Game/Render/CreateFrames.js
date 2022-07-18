class CreateFrames {
    constructor(context, spritePath, canvas) {

        this.context = context;
        this.sprite = new Image();
        this.sprite.src = spritePath;
        this.sprite.onload = () => {
            context.drawImage(this.sprite, 0,0, 30, 31, 0, 0, 40, 42);

        }
        

        this.frames = [];

        this.canvas = canvas;
    }

    createFrames() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                this.frames.push(this.context.getImageData(i * 128, j * 128, 40, 42));
            }
        }
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }

    renderFrames() {
        // console.log(this.frames)
        for (var i = 0; i < this.frames.length; i++) {
            // this.context.putImageData(this.frames[i], 45 * i, 0);
        }

        let imageData = this.context.getImageData(0, 127, 40, 42);
        this.context.putImageData(imageData, 0, 0, 0, 500, 40 ,42)
    }
}



export default CreateFrames;