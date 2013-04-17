(function (window) {

    function CPU(canvas, x, y, speed) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;

        this.sprite = new createjs.Bitmap("images/ship4.png");
        this.sprite.x = x;
        this.sprite.y = y;
        this.canvas.addChild(this.sprite);

        this.projectiles = [];

        this.animation;// = new Animations(canvas);

        this.active = true;
        this.shipactive = true;

        this.speed = speed;
        this.previousShot = 0;
        this.reloadTime = 50;

        this.midpoint = function () {
            return {
                X: this.x - this.width / 2,
                Y: this.y + this.height / 2
            };
        };
    }

    CPU.prototype.explode = function () {
        this.shipactive = false;
        this.animation = new Animation(this.canvas);
        this.animation.Explode(this.x-50, this.y-50);  ///-50 because the alignment is f'ed up for some reason
        this.canvas.removeChild(this.sprite);
        this.y = -1000;
       // this.y = -window.CANVAS_WIDTH  //put off screen to go to die naturally
    };

    CPU.prototype.update = function () {
        this.x -= this.speed;

        this.sprite.x = this.x;

        if (this.x < -this.width || this.x > window.CANVAS_WIDTH + this.width) {
            this.active = false;
            this.canvas.removeChild(this.sprite);
        }

        for (var i = 0; i < this.projectiles.length; i++) {
            if (collides(this.projectiles[i], window.level.player)) {
                window.level.player.hit();
                this.projectiles[i].dispose();
            }

            if (this.projectiles[i].active == true) {
                this.projectiles[i].update();
            }
            else {
                this.projectiles[i].dispose();
                this.projectiles.splice(i, 1);
                
            }
        }

        if (window.TIME_PASSED - this.previousShot > this.reloadTime && this.shipactive == true) {
            var bulletPosition = this.midpoint();
            this.projectiles.push(new Projectile(this.canvas, bulletPosition.X, bulletPosition.Y, -20));
            this.previousShot = window.TIME_PASSED;
        }
    };


window.CPU = CPU;

}(window));

