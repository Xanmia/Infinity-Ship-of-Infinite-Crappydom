(function (window) {

    function Animation(canvas) {
        this.stage = canvas;

}

    Animation.prototype.Explode = function (x, y) {


        // Define a spritesheet. Note that this data was exported by ZoÃ«.
        var ss = new createjs.SpriteSheet({
            "animations":
            {
                "run": [0, 10, false]//,
                //  "jump": [26, 63, "run"]
            },
            "images": ["images/ExplosionAnimationClear.png"],
            "frames":
                {
                    "height": 150,
                    "width": 150,
                    "regX": 0,
                    "regY": 0,
                    "count": 11
                }
        });

        var grant = new createjs.BitmapAnimation(ss);
        grant.x = x;
        grant.y = y;
        grant.gotoAndPlay("run");

        // Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
        this.stage.addChild(grant);
    }


    window.Animation = Animation;

}(window));