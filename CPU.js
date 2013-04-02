(function (window) {

    function CPU(canvas, x, y) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.sprite = new Sprite("ship4");
        this.projectiles = [];
        this.active = true;

        this.speed = 3;
        this.previousShot = 0;
        this.reloadTime = 50;

        this.midpoint = function () {
            return {
                X: this.x - this.width / 2,
                Y: this.y + this.height / 2
            };
        };
    }
    CPU.prototype.update = function () {
        this.x -= this.speed;

        if (this.x < -this.width || this.x > window.CANVAS_WIDTH + this.width) {
            this.active = false;
        }

        for (var i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].active == true) {
                this.projectiles[i].update();
            }
            else {
                this.projectiles.splice(i, 1);
            }
        }

        if (window.TIME_PASSED - this.previousShot > this.reloadTime && this.active == true) {
            var bulletPosition = this.midpoint();
            this.projectiles.push(new Projectile(canvas, bulletPosition.X, bulletPosition.Y, -5));
            this.previousShot = window.TIME_PASSED;
        }
    };

    CPU.prototype.draw = function () {
        this.sprite.draw(this.canvas, this.x, this.y);
        for (var i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].draw();
        }
    };


window.CPU = CPU;

}(window));

