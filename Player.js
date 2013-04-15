(function (window) {

    function Player(canvas) {
        this.canvas = canvas
        this.movespeed = 4;
        this.x = 52;
        this.y = 51;
        this.width = 25;
        this.height = 50;

        this.sprite = new createjs.Bitmap("images/ship3.png");
        this.canvas.addChild(this.sprite);

        this.projectiles = [];

        this.previousShot = 0;
	    this.health = 100;	
        this.reloadTime = 30;

        this.midpoint = function () {
            return {
                X: this.x + this.width / 2,
                Y: this.y + this.height / 2
            };
        };
    }

    Player.prototype.shoot = function () {
        if (window.TIME_PASSED - this.previousShot > this.reloadTime || this.previousShot == 0) {
            var bulletPosition = this.midpoint();
            this.projectiles.push(new Projectile(this.canvas, bulletPosition.X, bulletPosition.Y, 5));
            this.previousShot = window.TIME_PASSED;
        }
    }

    Player.prototype.KeyActions = function () {
        if (keydown.s) {
            this.y += this.movespeed;
        }

        if (keydown.w) {
            this.y -= this.movespeed;
        }

        if (keydown.d) {
            this.x += this.movespeed;
        }

        if (keydown.a) {
            this.x -= this.movespeed;
        }
       // this.y = this.y.clamp(0, window.CANVAS_HEIGHT - this.height);
       // this.x = this.x.clamp(0, window.CANVAS_WIDTH - this.width);

        this.sprite.x = this.x;
        this.sprite.y = this.y;

        if (keydown.space) {
            this.shoot();
           // window.level.cpu[0].explode();
        }
    }

    Player.prototype.update = function () {
        this.KeyActions();
        for (var i = 0; i < this.projectiles.length; i++) {

            for (var p = 0; p < window.level.cpu.length; p++) {
                if (collides(this.projectiles[i], window.level.cpu[p])) {
                    window.level.cpu[p].explode();
                    this.projectiles[i].dispose();
                }
            }

            if (this.projectiles[i].active == true) {
                this.projectiles[i].update();
            }
            else {
                this.projectiles[i].dispose();
                this.projectiles.splice(i, 1);
            }
        }
    };

  //  Player.prototype.draw = function () {
  //     this.sprite.draw(this.canvas, this.x, this.y);
  //      for (var i = 0; i < this.projectiles.length; i++) {
  //          this.projectiles[i].draw();
  //      }
  //  };

window.Player = Player;

}(window));
