class MatrixEffect{
    constructor(){
        this.matrixCanvas = document.createElement("canvas")
        this.matrixCanvas.setAttribute("style", "position: fixed;")
        gradioApp().querySelector("div[class*=container]:not([class^=modal])").insertAdjacentElement('afterbegin', this.matrixCanvas)
    }

    async initialize(){
        while(!gradioApp().querySelector('canvas')){
            await delay(300)
        }
        // Initialising the canvas
        this.ctx = this.matrixCanvas.getContext('2d');

        // Setting the width and height of the canvas
        this.matrixCanvas.width = window.innerWidth;
        this.matrixCanvas.height = window.innerHeight;

        // Setting up the letters
        this.letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
        this.letters = this.letters.split('');

        // Setting up the columns
        this.fontSize = 10,
        this.columns = this.matrixCanvas.width / this.fontSize;

        // Setting up the drops
        this.drops = [];
        for (var i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }
        this.running = true;

        //timer
        this.then = Date.now();
        this.fps = 20;
        this.fpsInterval = 1000/this.fps;
        

    // Setting up the draw function
        this.draw = () => {
            this.now = Date.now();
            this.elapsed = this.now - this.then;
            if (this.elapsed > this.fpsInterval){
                this.then = this.now - (this.elapsed % this.fpsInterval);

                this.ctx.fillStyle = 'rgba(0, 0, 0, .1)';
                this.ctx.fillRect(0, 0, this.matrixCanvas.width, this.matrixCanvas.height);
                for (var i = 0; i < this.drops.length; i++) {
                    text = this.letters[Math.floor(Math.random() * this.letters.length)];
                    this.ctx.fillStyle = '#0f0';
                    this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
                    this.drops[i]++;
                    if (this.drops[i] * this.fontSize > this.matrixCanvas.height && Math.random() > .95) {
                        this.drops[i] = 0;
                    }
                }
            }
            if (this.running){
                    requestAnimationFrame(this.draw)
            }
        }
    }

    destroy(){
        this.running = false;
        //clearInterval(this.Interval)
        this.matrixCanvas.remove()
    }
}

let matrixEffect;

async function registerMatrixToHandler(){
    await delay(1000);
    while(qkcssFXMap == undefined){
        await delay(500)
    }
    qkcssFXMap["matrixfx"] = [launchMatrixEffect, matrixEffect];
}

async function launchMatrixEffect(){
    await delay(1000)
    while (!gradioApp().querySelector("div[class*=container]:not([class^=modal])")){
        await delay(300);
    }
    // Loop the animation
    matrixEffect = new MatrixEffect()
    //Shortciruited it
    qkcssFXMap["matrixfx"][1] = matrixEffect
    await delay(500)
    matrixEffect.initialize()
    matrixEffect.Interval = matrixEffect.draw();
    //matrixEffect.Interval = setInterval(matrixEffect.draw, 33);
}

function delay(ms){return new Promise(resolve => setTimeout(resolve, ms))}
//document.addEventListener("DOMContentLoaded", async function() {await launchMatrixEffect()})
document.addEventListener("DOMContentLoaded", async function() {await registerMatrixToHandler()})

