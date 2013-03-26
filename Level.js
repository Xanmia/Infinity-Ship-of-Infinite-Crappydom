(function (window) {

    function Level(canvas) {
        this.player = new Player(canvas);
        this.background1 = new Sprite("background");
        this.cpu = [];
        this.canvas = canvas

        this.X = 500;
        this.Y = 150;
        this.color = "#FF0000";
        this.timepassed = 0;
        this.previousSpawn = 0;
        this.spawnTime = 90;
    }

    Level.prototype.update = function () {
        this.timepassed += 1;
        this.player.update();
        for (var i = 0; i < this.cpu.length; i++) {
            this.cpu[i].update();
        }

        if (this.timepassed - this.previousSpawn > this.spawnTime) {
            this.cpu.push(new CPU(canvas, window.CANVAS_WIDTH, Math.floor((Math.random() * window.CANVAS_HEIGHT) + 1)));
            this.previousSpawn = this.timepassed;
        }
             
    };

    Level.prototype.draw = function () {
        this.background1.draw(this.canvas, 0, 0);
        this.player.draw();
        for (var i = 0; i < this.cpu.length; i++) {
            this.cpu[i].draw();
        }
    };


    window.Level = Level;

} (window));
