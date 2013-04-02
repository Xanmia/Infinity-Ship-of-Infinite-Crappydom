(function (window) {

    function Projectile(canvas, x, y, velocity) {
        this.canvas = canvas
        this.velocity = velocity;
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 10;
        this.sprite = new Sprite("laser");

        this.active = true;
}

    Projectile.prototype.draw = function () {
        this.sprite.draw(this.canvas, this.x, this.y);
    }

    Projectile.prototype.update = function () {
        this.x += this.velocity;

        if (this.x < -100 || this.x > window.CANVAS_WIDTH + 100) {
            this.active = false;
        }
    }

    window.Projectile = Projectile;

}(window));