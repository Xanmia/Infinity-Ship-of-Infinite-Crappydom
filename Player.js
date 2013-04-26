(function (window) {

    function Player(canvas) {
        this.canvas = canvas
        this.movespeed = 6;
        this.x = 52;
        this.y = 51;
        this.width = 60;
        this.height = 74;
        this.enabled = true;

        this.animation;

        this.projectiles = [];

        this.previousShot = 0;
	    this.health = 100;	
	    this.reloadTime = 30;


	    this.ss = new createjs.SpriteSheet({
	        "animations":
            {
                "normal": [0, 0, true],
                "up": [1, 1, true],
                "down": [2, 2, true]
            },
	        "images": [playershipimg],
	        "frames":
                {
                    "height": 74,
                    "width": 60,
                    "regX": 0,
                    "regY": 0,
                    "count": 3
                }
	    });

	    this.sprite = new createjs.BitmapAnimation(this.ss);
	    this.sprite.x = this.x;
	    this.sprite.y = this.y;
	    this.sprite.gotoAndPlay("normal");

	    this.canvas.addChild(this.sprite);



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
            this.projectiles.push(new Projectile(this.canvas, bulletPosition.X, bulletPosition.Y, 20));
            this.previousShot = window.TIME_PASSED;
        }
    }

    Player.prototype.hit = function () {
        this.health -= 20;
    }

    Player.prototype.explode = function () {
        this.animation = new Animation(this.canvas);
        this.animation.Explode(this.x - 50, this.y - 50);  ///-50 because the alignment is f'ed up for some reason
        this.canvas.removeChild(this.sprite);
    };

    Player.prototype.KeyActions = function () {
        if (keydown.s) {
            this.y += this.movespeed;
            this.sprite.gotoAndPlay("down");
            this.height = 44;
        }

        if (keydown.w) {
            this.y -= this.movespeed;
            this.sprite.gotoAndPlay("up");
            this.height = 44;
        }

        if (keydown.d) {
            this.x += this.movespeed;
            this.sprite.gotoAndPlay("normal");
            this.height = 74;
        }

        if (keydown.a) {
            this.x -= this.movespeed;
            this.sprite.gotoAndPlay("normal");
            this.height = 74;
        }
        this.y = this.y.clamp(0, window.CANVAS_HEIGHT - this.height);
        this.x = this.x.clamp(0, window.CANVAS_WIDTH - this.width);

        this.sprite.x = this.x;
        this.sprite.y = this.y;

        if (keydown.space) {
            this.shoot();
        }
    }

    Player.prototype.update = function () {
        if (this.health < 0 && this.enabled == true) {
            this.explode();
            this.enabled = false;
        }

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

        for (var p = 0; p < window.level.cpu.length; p++) {

            if (collides(this, window.level.cpu[p])) {
                this.hit();
                window.level.cpu[p].explode();
            }
        }
    };

window.Player = Player;

}(window));
