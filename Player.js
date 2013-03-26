(function (window) {

    function Player(canvas) {
        this.canvas = canvas
        this.movespeed = 2;
        this.X = 52;
        this.Y = 51;
        this.width = 25;
        this.height = 50;
        this.color = "#000000";
        this.sprite = new Sprite("ship3");
        this.projectiles = [];

        this.timepassed = 0;
        this.previousShot = 0;

	this.health = 100;	
        this.reloadTime = 30;

        this.midpoint = function () {
            return {
                X: this.X + this.width / 2,
                Y: this.Y + this.height / 2
            };
        };
    }

    Player.prototype.shoot = function () {
        if (this.timepassed - this.previousShot > this.reloadTime || this.previousShot == 0) {
            var bulletPosition = this.midpoint();
            this.projectiles.push(new Projectile(canvas, bulletPosition.X, bulletPosition.Y, 5));
            this.previousShot = this.timepassed;
        }
       
    }

    Player.prototype.KeyActions = function () {
        if (keydown.s) {
            this.Y += this.movespeed;
        }

        if (keydown.w) {
            this.Y -= this.movespeed;
        }

        if (keydown.d) {
            this.X += this.movespeed;
        }

        if (keydown.a) {
            this.X -= this.movespeed;
        }
        this.Y = this.Y.clamp(0, window.CANVAS_HEIGHT - this.height);
        this.X = this.X.clamp(0, window.CANVAS_WIDTH - this.width);

        if (keydown.space) {
            this.shoot();
        }
    }



    Player.prototype.update = function () {
        this.timepassed += 1;
        this.KeyActions();
        for (var i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].update();
        }
    };

    Player.prototype.draw = function () {
        this.sprite.draw(this.canvas, this.X, this.Y);
        for (var i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].draw();
        }
    };

window.Player = Player;

}(window));
