(function (window) {

    function SplashScreen(canvas) {
    
        this.background1 = new createjs.Bitmap("images/title.png"); //new Sprite("background");
        this.canvas = canvas
        this.background1.x = 100;
        this.background1.y = 100;
        this.canvas.addChild(this.background1);
    }

    SplashScreen.prototype.update = function () {
        if (keydown.space) {
            window.currentGameStatus = GameStatus.PLAYING;
            this.canvas.removeChild(this.background1);
            window.level = new Level(stage);
        }
    };


    window.SplashScreen = SplashScreen;

} (window));
