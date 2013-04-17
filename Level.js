(function (window) {

    function Level(canvas) {
    
        this.background1 = new createjs.Bitmap("images/background.png"); //new Sprite("background");
        this.cpu = [];
        this.canvas = canvas
        this.canvas.addChild(this.background1);

        this.player = new Player(canvas);
        this.previousSpawn = 0;
        this.spawnTime = 50;
    }

    Level.prototype.update = function () {
        this.player.update();
        for (var i = 0; i < this.cpu.length; i++) {
            if (this.cpu[i].active == true) {
                this.cpu[i].update();
            }
            else {
                this.cpu.splice(i, 1);
                
            }
        }

        this.addCPU();
             
    };

    Level.prototype.addCPU = function () {
        if (window.TIME_PASSED - this.previousSpawn > this.spawnTime) {
            this.cpu.push(new CPU(this.canvas, window.CANVAS_WIDTH, Math.floor((Math.random() * window.CANVAS_HEIGHT) + 1), Math.floor((Math.random() * 5) + 3)));
            this.previousSpawn = window.TIME_PASSED;
        }
    };

    window.Level = Level;

} (window));
