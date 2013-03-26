(function (window) {

    function CPU(canvas, x, y) {
        this.canvas = canvas;
        this.color = "#00A";
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.sprite = new Sprite("ship4");
        this.speed = 3;
        this.projectiles = [];

        this.timepassed = 0;
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
        this.timepassed += 1;
        this.x -= this.speed;
        for (var i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].update();
        }
        if (this.timepassed - this.previousShot > this.reloadTime) {
            var bulletPosition = this.midpoint();
            this.projectiles.push(new Projectile(canvas, bulletPosition.X, bulletPosition.Y, -5));
            this.previousShot = this.timepassed;
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

