var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, 'agj3game', { preload: preload, create: create, update: update });

WebFontConfig = {
    active: function() { game.time.events.add(Phaser.Timer.SECOND, changeFont, this); },
    google: {
      families: [FONT]
    }
};

function create() {
    initGame();
    initBonuses();
    addPaddle();
    addBall();
    createIngameMenu();
    loadLevels();
    loadNextLevel();
    inputEvents();
    initMenu();
}
