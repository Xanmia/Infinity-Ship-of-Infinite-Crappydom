(function (window) {


    function Projectile(canvas, x, y, velocity) {
        this.canvas = canvas
        this.velocity = velocity
        this.color = "#00A";
        this.x = x;
        this.y = y;
        this.sprite = new Sprite("laser");
        this.timepass = 0;

        this.active = true;
}

    Projectile.prototype.draw = function () {
        this.sprite.draw(this.canvas, this.x, this.y);
    }

    Projectile.prototype.update = function () {
        this.x += this.velocity;
        this.timepass += 1;

        if (this.x < -100 || this.x > window.CANVAS_WIDTH + 100) {
            this.active = false;
        }
    }

    window.Projectile = Projectile;

}(window));