(function (window) {

    function Projectile(canvas, x, y, velocity) {
        this.canvas = canvas
        this.velocity = velocity;
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 10;

        this.sprite = new createjs.Bitmap(projectileimg);
        this.sprite.x = x;
        this.sprite.y = y;
        this.canvas.addChild(this.sprite);

        this.active = true;
}

    Projectile.prototype.dispose = function () {
        this.active = false;
        this.canvas.removeChild(this.sprite);
    }

    Projectile.prototype.update = function () {
        this.x += this.velocity;
        this.sprite.x = this.x;


        if (this.x < -20 || this.x > window.CANVAS_WIDTH) {
            this.dispose();
        }
        
    }

    window.Projectile = Projectile;

}(window));