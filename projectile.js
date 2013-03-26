(function (window) {


    function Projectile(canvas, x, y, velocity) {
        this.canvas = canvas
        this.velocity = velocity
        this.color = "#00A";
        this.x = x;
        this.y = y;
        this.sprite = new Sprite("laser");
        this.timepass = 0;
}

    Projectile.prototype.draw = function () {
        this.sprite.draw(this.canvas, this.x, this.y);
    }

    Projectile.prototype.update = function () {
        this.x += this.velocity;
        this.timepass += 1;
    }

    window.Projectile = Projectile;

}(window));