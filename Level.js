(function (window) {

    function Level(canvas, level_number) {
    
        this.background1 = new createjs.Bitmap(backgroundimg);
        this.cpu = [];
        this.canvas = canvas
        this.canvas.addChild(this.background1);
        this.totalCPU = level_number * 3;

        this.player = new Player(canvas);

        for (var i = 0; i < this.totalCPU; i++) {
            this.cpu.push(new CPU(this.canvas, (window.CANVAS_WIDTH + (Math.random() * (CANVAS_WIDTH*(level_number-1)))), Math.floor((Math.random() * window.CANVAS_HEIGHT) + 1), Math.floor((Math.random() * 6) + 3)));
        }

        this.enemiestxt = new createjs.Text("Crap left: " + this.totalCPU, "16px Arial", "#ebebeb");
        this.enemiestxt.textAlign = "left";
        this.enemiestxt.x = 0;
        this.enemiestxt.y = 2;
        this.canvas.addChild(this.enemiestxt);

        this.leveltxt = new createjs.Text("Level of Crappiness: " + level_number, "16px Arial", "#ebebeb");
        this.leveltxt.x = CANVAS_WIDTH - 180;
        this.leveltxt.y = 2;
        this.canvas.addChild(this.leveltxt);
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

        this.enemiestxt.text = "Crap left: " + this.cpu.length;

        if (this.player.enabled == false) {
            loseScreen();
        }
        else if (this.cpu.length == 0) {
            NextLevelScreen();
        }

    };

    window.Level = Level;

} (window));
